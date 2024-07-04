"use client";

import SidebarOpsi, { SidebarItem } from "@/components/layout/SideBarOpsi";
import SideBarOpsi from "@/components/layout/SideBarOpsi";
import Image from "next/image";
import { usePathname } from "next/navigation";
const SideBarOpsiParent = () => {
  const pathname = usePathname();
  return (
    <div className="flex">
      <SidebarOpsi>
        <SidebarItem
          icon={
            <Image
              src="/assets/dashboard.png"
              alt="dashboard"
              width={25}
              height={20}
            />
          }
          href="/"
          text="Dashboard"
          pathname={`${
            pathname === "/"
              ? "bg-gradient-to-tr from-blue-200 to-blue-100 text-primary"
              : "hover:bg-blue-50 text-gray-600"
          }`}
        />

        <SidebarItem
          icon={
            <Image
              src="/assets/menu.png"
              alt="category"
              width={25}
              height={25}
            />
          }
          href="/category"
          text="Category"
          pathname={`${
            pathname === "/category"
              ? "bg-gradient-to-tr from-blue-200 to-blue-100 text-primary"
              : "hover:bg-blue-50 text-gray-600"
          }`}
        />
        <SidebarItem
          icon={
            <Image src="/assets/box.png" alt="box" width={25} height={25} />
          }
          href="/products"
          text="Products"
          pathname={`${
            pathname === "/products"
              ? "bg-gradient-to-tr from-blue-200 to-blue-100 text-primary"
              : "hover:bg-blue-50 text-gray-600"
          }`}
        />
        <SidebarItem
          icon={
            <Image
              src="/assets/customer.png"
              alt="customer"
              width={25}
              height={25}
            />
          }
          href="/customers"
          text="Customers"
          pathname={`${
            pathname === "/customers"
              ? "bg-gradient-to-tr from-blue-200 to-blue-100 text-primary"
              : "hover:bg-blue-50 text-gray-600"
          }`}
        />

        <SidebarItem
          icon={
            <Image
              src="/assets/shopping-bag.png"
              alt="customer"
              width={25}
              height={25}
            />
          }
          href="/orders"
          text="Orders"
          pathname={`${
            pathname === "/orders"
              ? "bg-gradient-to-tr from-blue-200 to-blue-100 text-primary"
              : "hover:bg-blue-50 text-gray-600"
          }`}
        />
        <hr className="my-5" />
      </SidebarOpsi>
    </div>
  );
};

export default SideBarOpsiParent;
