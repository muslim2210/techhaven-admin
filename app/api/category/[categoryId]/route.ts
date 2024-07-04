import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
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

//GET CATEGORY DETAIL DATA
export const GET = async (
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) => {
  try {
    await connectToDB();

    const category = await Category.findById(params.categoryId).populate({
      path: "products",
      model: Product,
    });

    if (!category) {
      return new NextResponse(
        JSON.stringify({ message: "Category not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(category, {
      status: 200,
      headers: getCorsHeaders(req.headers.get("origin") || ""),
    });
  } catch (err) {
    console.log("[collectionId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

//UPDATE CATEGORY DETAIL DATA
export const POST = async (
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) => {
  try {
    await connectToDB();

    let category = await Category.findById(params.categoryId);

    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    const { title, description, image } = await req.json();

    if (!title || !image) {
      return new NextResponse("Title and image are required", { status: 400 });
    }

    category = await Category.findByIdAndUpdate(
      params.categoryId,
      { title, description, image },
      { new: true }
    );

    await category.save();

    return NextResponse.json(category, {
      status: 200,
      headers: getCorsHeaders(req.headers.get("origin") || ""),
    });
  } catch (err) {
    console.log("[categoryId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

//DELETE COLLECTION DATA
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) => {
  try {
    await connectToDB();

    await Category.findByIdAndDelete(params.categoryId);

    await Product.updateMany(
      { category: params.categoryId },
      { $pull: { category: params.categoryId } }
    );

    return new NextResponse("Category is deleted", { status: 200 });
  } catch (err) {
    console.log("[categoryId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
