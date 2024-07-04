"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FilePenLine } from "lucide-react";
import Link from "next/link";
import Delete from "../custom ui/Delete";
import { Button } from "../ui/button";

export const columns: ColumnDef<CategoryType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/category/${row.original._id}`}
        className="hover:text-red-1 capitalize"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => <p>{row.original.products.length}</p>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-4 items-center">
        <Link href={`/category/${row.original._id}`}>
          <Button className="bg-yellow-400 hover:bg-yellow-400/80">
            <FilePenLine className="h-4 w-4 text-white" />
          </Button>
        </Link>
        <Delete item="category" id={row.original._id} />
      </div>
    ),
  },
];
