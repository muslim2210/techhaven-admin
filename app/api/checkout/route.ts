import { NextRequest, NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";

// Config CORS
// ========================================================
/**
 *
 * @param origin
 * @returns
 */

const getCorsHeaders = (origin: string) => {
  // Default options
  const headers = {
    "Access-Control-Allow-Methods": `${process.env.ALLOWED_METHODS}`,
    "Access-Control-Allow-Headers": `${process.env.ALLOWED_HEADERS}`,
    "Access-Control-Allow-Origin": `${process.env.DOMAIN_URL}`,
  };

  // If no allowed origin is set to default server origin
  if (!process.env.ALLOWED_ORIGIN || !origin) return headers;

  // If allowed origin is set, check if origin is in allowed origins
  const allowedOrigins = process.env.ALLOWED_ORIGIN.split(",");

  // Validate server origin
  if (allowedOrigins.includes("*")) {
    headers["Access-Control-Allow-Origin"] = "*";
  } else if (allowedOrigins.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  // Return result
  return headers;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const { cartItems, customer } = await req.json();

    if (!cartItems || !customer) {
      return new NextResponse("Not enough data to checkout", { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      shipping_address_collection: { allowed_countries: ["ID", "SG", "MY"] },
      shipping_options: [
        { shipping_rate: "shr_1PVoHNFGVhcmi9vbGkRAt54D" },
        { shipping_rate: "shr_1PVoGBFGVhcmi9vbtwF3XI11" },
        { shipping_rate: "shr_1PVvqFFGVhcmi9vbYfkfciS0" },
      ],
      line_items: cartItems.map((cartItem: any) => ({
        price_data: {
          currency: "idr",
          product_data: {
            name: cartItem.item.title,
            metadata: {
              productId: cartItem.item._id,
              ...(cartItem.color && { color: cartItem.color }),
            },
          },
          unit_amount: cartItem.item.price * 100,
        },
        quantity: cartItem.quantity,
      })),
      client_reference_id: customer.clerkId,
      success_url: `${process.env.ECOMMERCE_STORE_URL}/payment_success`,
      cancel_url: `${process.env.ECOMMERCE_STORE_URL}/cart`,
    });

    return NextResponse.json(session, {
      headers: getCorsHeaders(req.headers.get("origin") || ""),
    });
  } catch (err) {
    console.log("[checkout_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export const dynamic = "force-dynamic";
