"use client";
import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { columns } from "@/components/orders/OrderColumn";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const res = await fetch("/api/orders", {
        method: "GET",
      });
      const data = await res.json();
      setOrders(data);
      setLoading(false);
      console.log("[products_GET]", data);
    } catch (err) {
      setLoading(false);
      console.log("[products_GET]", err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  console.log(orders);

  return (
    <div className="py-12 px-5 md:px-20">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primaryBlack">List Orders</h1>
      </div>
      <Separator className="bg-primaryBlack mt-4 mb-7" />
      {loading ? (
        <Loader />
      ) : (
        <DataTable columns={columns} data={orders} searchKey="customer" />
      )}
    </div>
  );
};

export default Orders;
