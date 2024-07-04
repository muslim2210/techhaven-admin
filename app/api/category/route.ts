import Category from "@/lib/models/Category";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
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

//POST CATEGORY DATA
export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();

    const { title, description, image } = await req.json();

    const existingCategory = await Category.findOne({ title });

    if (existingCategory) {
      return new NextResponse("Category already exists", {
        status: 401,
      });
    }

    if (!title || !image) {
      return new NextResponse("Missing required fields", {
        status: 401,
      });
    }

    const newCategory = await Category.create({
      title,
      description,
      image,
    });

    await newCategory.save();
    return NextResponse.json(newCategory, {
      status: 200,
    });
  } catch (err) {
    console.log("[category_POST]", err);
    return new NextResponse("Something went wrong! Please try again.", {
      status: 500,
    });
  }
};

//GET DATA CATEGORY
export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const category = await Category.find().sort({ createdAt: "desc" });

    return NextResponse.json(category, {
      status: 200,
      headers: getCorsHeaders(req.headers.get("origin") || ""),
    });
  } catch (err) {
    console.log("[category_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
