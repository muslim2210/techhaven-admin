"use client";
import { z } from "zod";
import { useEffect, useState } from "react";
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
import MultiText from "../custom ui/MultiText";
import MultiSelect from "../custom ui/MultiSelect";
import Loader from "../custom ui/Loader";
import SelectCategory from "../custom ui/SelectCategory";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultiSelectCategory from "../custom ui/MultiSelectCategory";

const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3).max(1000).trim(),
  media: z.array(z.string()),
  // category: z.array(z.string()),
  category: z.string().min(2).max(100),
  tags: z.array(z.string()),
  brand: z.string().min(2).max(100),
  colors: z.array(z.string()),
  price: z.coerce.number().min(0.1),
});

interface ProductFormProps {
  initialData?: ProductType | null; //Must have "?" to make it optional
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<CategoryType[]>([]);
  const [save, setSave] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const router = useRouter();

  const getCategory = async () => {
    try {
      const res = await fetch("/api/category", {
        method: "GET",
      });
      const data = await res.json();
      setCategory(data);
    } catch (err) {
      console.log("[collections_GET]", err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

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
      ? {
          ...initialData,
          category: Array.isArray(initialData.category)
            ? initialData.category?.map((item) => item._id).join(", ")
            : "",
        }
      : {
          title: "",
          description: "",
          media: [],
          // category: [],
          category: "",
          tags: [],
          brand: "",
          colors: [],
          price: 0.1,
        },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setSave(true);
      const url = initialData
        ? `/api/products/${initialData._id}`
        : "/api/products";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setSave(false);
        toast.success(`Product ${initialData ? "Updated" : "Created"}!`);
        window.location.href = "/products";
        router.push("/products");
      }
    } catch (err) {
      setSave(false);
      console.log("[products_POST]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  console.log(initialData);

  return (
    <div className="py-12 px-5 md:px-20">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-2xl font-semibold text-primaryBlack">
            Edit Product
          </p>
          <Delete id={initialData._id} item="product" />
        </div>
      ) : (
        <p className="text-2xl font-semibold text-primaryBlack">
          Create Product
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
              name="media"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onChange={(url) => field.onChange([...field.value, url])}
                      onRemove={(url) =>
                        field.onChange(
                          [...field.value].filter((image) => image !== url)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      {initialData ? (
                        <div className="bg-white py-2 px-5 max-w-[300px] rounded-md">
                          <p className="text-primaryBlack capitalize">
                            {category?.[0]?.title}
                          </p>
                        </div>
                      ) : (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="w-[280px]">
                            <SelectValue placeholder="Select a Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Category</SelectLabel>
                              {category?.map((item) => (
                                <SelectItem key={item._id} value={item._id}>
                                  {item.title}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="colors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Colors</FormLabel>
                    <FormControl>
                      <MultiText
                        placeholder="Insert Colors.."
                        value={field.value}
                        onChange={(color) =>
                          field.onChange([...field.value, color])
                        }
                        onRemove={(colorToRemove) =>
                          field.onChange(
                            [...field.value].filter(
                              (color) => color !== colorToRemove
                            )
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Variant</FormLabel>
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
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (Rp)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Insert Price.."
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
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <MultiText
                        placeholder="Insert tags.."
                        value={field.value}
                        onChange={(tag) =>
                          field.onChange([...field.value, tag])
                        }
                        onRemove={(tagToRemove) =>
                          field.onChange(
                            [...field.value].filter(
                              (tag) => tag !== tagToRemove
                            )
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-10">
              <Button
                type="button"
                onClick={() => router.push("/products")}
                className="bg-slate-200 hover:bg-slate-200/80 text-primaryBlack"
              >
                Discard
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/80 text-white"
              >
                {save ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProductForm;
