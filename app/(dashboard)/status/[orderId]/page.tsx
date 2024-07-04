"use client";
import OrderForm from "@/components/orders/OrderForm";
import React, { useEffect, useState } from "react";

const ChangeStatus = ({ params }: { params: { orderId: string } }) => {
  const [orderDetails, setOrderDetails] = useState<OrderColumnType | null>(
    null
  );

  const getOrderDetails = async () => {
    try {
      const res = await fetch(`/api/orders/${params.orderId}`, {
        method: "GET",
      });
      const data = await res.json();
      setOrderDetails(data);
    } catch (err) {
      console.log("[orderId_GET]", err);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  console.log(orderDetails);

  return <OrderForm initialData={orderDetails} />;
};

export default ChangeStatus;
