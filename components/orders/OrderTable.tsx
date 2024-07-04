"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FormatRupiah } from "@arismun/format-rupiah";
import { Button } from "../ui/button";

const OrderTable = () => {
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
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Customer
            </th>
            <th scope="col" className="px-6 py-3">
              Products
            </th>
            <th scope="col" className="px-6 py-3">
              Total (Rp.)
            </th>
            <th scope="col" className="px-6 py-3">
              Status Order
            </th>
            <th scope="col" className="px-6 py-3">
              Order Date
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order: OrderColumnType) => (
            <tr
              key={order._id}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {order.customer}
              </th>
              <td className="px-6 py-4">{order.products}</td>
              <td className="px-6 py-4">
                <FormatRupiah value={order.totalAmount} />
              </td>
              <td className="px-6 py-4">{order.statusOrder}</td>
              <td className="px-6 py-4">{order.createdAt}</td>
              <td className="px-6 py-4">
                <Link
                  href={`/status/${order._id}`}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  <Button>Change Status</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
