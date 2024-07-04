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
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  statusOrder: z.string().min(3).max(100),
});

interface OrderFormProps {
  initialData?: OrderColumnType | null; //Must have "?" to make it optional
}

const OrderForm: React.FC<OrderFormProps> = ({ initialData }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          statusOrder: "",
        },
  });

  console.log(initialData);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = initialData
        ? `/api/orders/${initialData._id}`
        : "/api/orders";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        toast.success(`Status Order ${initialData ? "Updated" : "Created"}!`);
        window.location.href = "/";
        router.push("/");
      }
    } catch (err) {
      console.log("[order_POST]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="py-12 px-5 md:px-20">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="font-semibold text-2xl text-primaryBlack">
            Edit Status Order
          </p>
          {/* <Delete id={initialData._id} item="category" /> */}
        </div>
      ) : (
        <p className="font-semibold text-2xl text-primaryBlack">
          Create Status Order
        </p>
      )}
      <Separator className="bg-primaryBlack mt-4 mb-7" />
      <div className="max-w-[600px] lg:max-w-[900px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="statusOrder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status Order</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Select a Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status Order</SelectLabel>
                          <SelectItem value="PROCESS">PROCESS</SelectItem>
                          <SelectItem value="DELIVERY">DELIVERY</SelectItem>
                          <SelectItem value="COMPLETE">COMPLETE</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-start gap-10">
              <Button
                type="button"
                onClick={() => router.push("/")}
                className="bg-slate-200 hover:bg-slate-200/80 text-primaryBlack"
              >
                Discard
              </Button>
              <Button type="submit" className="bg-primary text-white">
                {initialData ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default OrderForm;
