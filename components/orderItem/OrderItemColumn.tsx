"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<OrderItemType>[] = [
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => {
      return (
        <Link
          href={`/products/${row.original.product._id}`}
          className="hover:text-red-1"
        >
          {row.original.product.title}
        </Link>
      );
    },
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "brand",
    header: "Variant",
    cell: ({ row }) => (
      <p className="text-primaryBlack capitalize">
        {row.original.product.brand}
      </p>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
];
