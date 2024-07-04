import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";
import Category from "@/lib/models/Category";

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

//POST DATA PRODUCT
export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();

    const { title, description, category, media, tags, brand, colors, price } =
      await req.json();

    if (!title || !description || !media || !price || !brand) {
      return new NextResponse("Not enough data to create a product", {
        status: 400,
      });
    }

    const newProduct = await Product.create({
      title,
      description,
      media,
      category,
      tags,
      brand,
      colors,
      price,
    });

    await newProduct.save();

    const cat = await Category.findById(category);
    if (cat) {
      cat.products.push(newProduct._id);
      await cat.save();
    }

    return NextResponse.json(newProduct, { status: 200 });
  } catch (err) {
    console.log("[products_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

//GET DATA PRODUCT
export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const products = await Product.find()
      .sort({ createdAt: "desc" })
      .populate({ path: "category", model: Category });

    return NextResponse.json(products, {
      status: 200,
      headers: getCorsHeaders(req.headers.get("origin") || ""),
    });
  } catch (err) {
    console.log("[products_GET]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
