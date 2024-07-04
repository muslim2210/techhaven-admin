import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

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

// GET DETAIL ORDER
export const GET = async (
  req: NextRequest,
  { params }: { params: { orderId: String } }
) => {
  try {
    await connectToDB();

    const order = await Order.findById(params.orderId);

    if (!order) {
      return new NextResponse(JSON.stringify({ message: "Order Not Found" }), {
        status: 404,
      });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (err) {
    console.log("[orderId_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

//UPDATE PRODUCT DETAIL DATA
export const POST = async (
  req: NextRequest,
  { params }: { params: { orderId: string } }
) => {
  try {
    await connectToDB();

    const orderDetails = await Order.findById(params.orderId);

    if (!orderDetails) {
      return new NextResponse(JSON.stringify({ message: "Order Not Found" }), {
        status: 404,
      });
    }

    const { statusOrder } = await req.json();

    if (!statusOrder) {
      return new NextResponse("Not enough data to create a new product", {
        status: 400,
      });
    }

    // Update product
    const updatedStatusOrder = await Order.findByIdAndUpdate(
      orderDetails._id,
      {
        statusOrder,
      },
      { new: true }
    );

    await updatedStatusOrder.save();

    return NextResponse.json(updatedStatusOrder, { status: 200 });
  } catch (err) {
    console.log("[orderId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
