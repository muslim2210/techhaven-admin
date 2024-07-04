"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { columns } from "@/components/products/ProductColumn";

const Products = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      });
      const data = await res.json();
      setProducts(data);
      setLoading(false);
      console.log("[products_GET]", data);
    } catch (err) {
      console.log("[products_GET]", err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="py-12 px-5 md:px-20">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primaryBlack">Products</h1>
        <Button
          className="md:hidden bg-primary text-white"
          onClick={() => router.push("/products/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create
        </Button>
        <Button
          className="hidden md:flex bg-primary text-white"
          onClick={() => router.push("/products/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Products
        </Button>
      </div>
      <Separator className="bg-primaryBlack mt-4 mb-7" />
      {loading ? (
        <Loader />
      ) : (
        <DataTable columns={columns} data={products} searchKey="title" />
      )}
    </div>
  );
};

export default Products;
