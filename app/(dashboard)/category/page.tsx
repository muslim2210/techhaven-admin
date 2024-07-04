"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { columns } from "@/components/category/CategoryColumns";

const Category = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);

  const getCategory = async () => {
    try {
      const res = await fetch("/api/category", {
        method: "GET",
      });
      const data = await res.json();
      setCategory(data);
      setLoading(false);
    } catch (err) {
      console.log("[category_GET]", err);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="py-12 px-5 md:px-20">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primaryBlack">Category</h1>
        <Button
          className="md:hidden bg-primary text-white"
          onClick={() => router.push("/category/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create
        </Button>
        <Button
          className="hidden md:flex bg-primary text-white"
          onClick={() => router.push("/category/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Category
        </Button>
      </div>
      <Separator className="bg-primaryBlack mt-4 mb-7" />
      {loading ? (
        <Loader />
      ) : (
        <DataTable columns={columns} data={category} searchKey="title" />
      )}
    </div>
  );
};

export default Category;
