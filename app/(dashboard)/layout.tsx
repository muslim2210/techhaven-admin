import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ToasterProvider } from "@/lib/ToasterProvider";
import { ClerkProvider } from "@clerk/nextjs";
import SideBarOpsiParent from "@/components/layout/SideBarOpsiParent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Next js 14 ecommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToasterProvider />
          <div className="flex">
            <SideBarOpsiParent />
            <div className="flex-1 bg-secondary">{children}</div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
