"use client";
import { z } from "zod";
import React, { useState } from "react";
import { Separator } from "../ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../custom ui/ImageUpload";
import { useParams, useRouter } from "next/navigation";
import Delete from "../custom ui/Delete";

const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(5).max(1000).trim(),
  image: z.string().min(3).max(100),
});

interface CollectionFormProps {
  initialData?: CategoryType | null; //Must have "?" to make it optional
}

const CategoryForm: React.FC<CollectionFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          title: "",
          description: "",
          image: "",
        },
  });

  console.log(initialData);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const url = initialData
        ? `/api/category/${initialData._id}`
        : "/api/category";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success(`Category ${initialData ? "Updated" : "Created"}!`);
        window.location.href = "/category";
        router.push("/category");
      }
    } catch (err) {
      console.log("[category_POST]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="py-12 px-5 md:px-20">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="font-semibold text-2xl text-primaryBlack">
            Edit Category
          </p>
          <Delete id={initialData._id} item="category" />
        </div>
      ) : (
        <p className="font-semibold text-2xl text-primaryBlack">
          Create Category
        </p>
      )}
      <Separator className="bg-primaryBlack mt-4 mb-7" />
      <div className="max-w-[600px] lg:max-w-[900px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insert title.."
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Insert Description.."
                      {...field}
                      rows={5}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-10">
              <Button
                type="button"
                onClick={() => router.push("/category")}
                className="bg-slate-200 hover:bg-slate-200/80 text-primaryBlack"
              >
                Discard
              </Button>
              <Button type="submit" className="bg-primary text-white">
                {loading ? "Loading..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CategoryForm;
