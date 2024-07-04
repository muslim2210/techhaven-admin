"use client";
import { useEffect, useState } from "react";
import Loader from "@/components/custom ui/Loader";
import CategoryForm from "@/components/category/CategoryForm";

const CategoryDetails = ({ params }: { params: { categoryId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [categoryDetails, setCategoryDetails] = useState<CategoryType | null>(
    null
  );

  const getCategoryDetails = async () => {
    try {
      const res = await fetch(`/api/category/${params.categoryId}`, {
        method: "GET",
      });
      const data = await res.json();
      setCategoryDetails(data);
      setLoading(false);
    } catch (err) {
      console.log("[category_GET]", err);
    }
  };

  useEffect(() => {
    getCategoryDetails();
  }, []);

  return loading ? <Loader /> : <CategoryForm initialData={categoryDetails} />;
};
export const dynamic = "force-dynamic";

export default CategoryDetails;
