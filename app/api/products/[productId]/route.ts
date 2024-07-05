import Category from "@/lib/models/Category";
import Product from "@/lib/models/Product";
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

//GET PRODUCT DETAIL DATA
export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectToDB();

    const product = await Product.findById(params.productId).populate({
      path: "category",
      model: Category,
    });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }
    return new NextResponse(JSON.stringify(product), {
      status: 200,
      headers: getCorsHeaders(req.headers.get("origin") || ""),
    });
  } catch (err) {
    console.log("[productId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

//UPDATE PRODUCT DETAIL DATA
export const POST = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectToDB();

    const product = await Product.findById(params.productId);

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    const { title, description, media, tags, brand, colors, price } =
      await req.json();

    if (!title || !description || !media || !price || !brand || !colors) {
      return new NextResponse("Not enough data to create a new product", {
        status: 400,
      });
    }

    // const addedCollections = category.filter(
    //   (categoryId: string) => !product.category.includes(categoryId)
    // );
    // included in new data, but not included in the previous data

    // const removedCollections = product.category.filter(
    //   (categoryId: string) => !category.includes(categoryId)
    // );
    // // included in previous data, but not included in the new data

    // // Update category
    // await Promise.all([
    //   // Update added category with this product
    //   ...addedCollections.map((categoryId: string) =>
    //     Category.findByIdAndUpdate(categoryId, {
    //       $push: { products: product._id },
    //     })
    //   ),

    //   // Update removed category without this product
    //   ...removedCollections.map((categoryId: string) =>
    //     Category.findByIdAndUpdate(categoryId, {
    //       $pull: { products: product._id },
    //     })
    //   ),
    // ]);

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      {
        title,
        description,
        media,
        brand,
        tags,
        colors,
        price,
      },
      { new: true }
    );

    await updatedProduct.save();

    // const add = await Category.findByIdAndUpdate(category);
    // if (add) {
    //   add.products.push(updatedProduct._id);
    //   await add.save();
    // }

    // const remove = await Category.findByIdAndDelete(category);
    // if (remove) {
    //   remove.products.pull(updatedProduct._id);
    //   await remove.save();
    // }

    return NextResponse.json(updatedProduct, {
      status: 200,
      headers: getCorsHeaders(req.headers.get("origin") || ""),
    });
  } catch (err) {
    console.log("[productId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

//DELETE PRODUCT DATA
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectToDB();

    const product = await Product.findById(params.productId);

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    await Product.findByIdAndDelete(product._id);

    // Update collections
    await Promise.all(
      product.category.map((categoryId: string) =>
        Category.findByIdAndUpdate(categoryId, {
          $pull: { products: product._id },
        })
      )
    );

    return new NextResponse(JSON.stringify({ message: "Product deleted" }), {
      status: 200,
      headers: getCorsHeaders(req.headers.get("origin") || ""),
    });
  } catch (err) {
    console.log("[productId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
