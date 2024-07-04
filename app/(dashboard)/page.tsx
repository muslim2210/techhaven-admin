import SalesChart from "@/components/custom ui/SalesChart";
import OrderTable from "@/components/orders/OrderTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  getSalesPerMonth,
  getTotalCustomers,
  getTotalProducts,
  getTotalSales,
} from "@/lib/actions/actions";
import { FormatRupiah } from "@arismun/format-rupiah";
import { CircleDollarSign, ShoppingBag, UserRound } from "lucide-react";
import { FaClipboardList, FaRegListAlt } from "react-icons/fa";

export default async function Home() {
  const totalRevenue = await getTotalSales().then((data) => data.totalRevenue);
  const totalOrders = await getTotalSales().then((data) => data.totalOrders);
  const totalCustomers = await getTotalCustomers();
  const totalProducts = await getTotalProducts();

  return (
    <div className="px-3 md:px-8 py-10">
      <p className="text-xl md:text-3xl font-bold">Dashboard</p>
      <Separator className="bg-grey-1 my-5" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-10">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Revenue</CardTitle>
            <CircleDollarSign className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-base-bold md:text-heading3-bold">
              <FormatRupiah value={totalRevenue} />
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Orders</CardTitle>
            <ShoppingBag className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-heading3-bold">{totalOrders}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Customers</CardTitle>
            <UserRound className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-heading3-bold">{totalCustomers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>List of Products</CardTitle>
            <FaRegListAlt className="max-sm:hidden w-6 h-6" />
          </CardHeader>
          <CardContent>
            <p className="text-heading3-bold">{totalProducts}</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle>List Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <OrderTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
