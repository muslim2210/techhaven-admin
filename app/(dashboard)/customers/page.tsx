import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/customers/CustomerColumns";
import { Separator } from "@/components/ui/separator";
import Customer from "@/lib/models/Customer";
import { connectToDB } from "@/lib/mongoDB";
import React from "react";

const Customers = async () => {
  await connectToDB();

  const customers = await Customer.find().sort({ createdAt: "desc" });

  return (
    <div className="px-3 md:px-10 py-5">
      <p className="text-xl md:text-2xl font-semibold text-primaryBlack text-center">
        Customers
      </p>
      <Separator className="bg-grey-1 my-5" />
      <DataTable columns={columns} data={customers} searchKey="name" />
    </div>
  );
};
export const dynamic = "force-dynamic";

export default Customers;
