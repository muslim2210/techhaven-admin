import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { createContext, useContext, useState } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const SidebarContext = createContext({});

export default function Sidebar({ children }: any) {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <>
      <aside className="h-screen left-0 top-0 sticky">
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <Image
              src="/logo-black.svg"
              alt="logo"
              width={500}
              height={200}
              priority
              className={`overflow-hidden transition-all ${
                expanded ? "w-36" : "w-0"
              }`}
            />

            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3 mt-20">{children}</ul>
          </SidebarContext.Provider>

          <div className="border-t flex p-3">
            <UserButton />
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              } `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">Manage Account</h4>
                <span className="text-xs text-gray-600">Admin</span>
              </div>
              <MoreVertical size={20} />
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

export function SidebarItem({ icon, text, href, pathname }: any) {
  const { expanded }: any = useContext(SidebarContext);
  return (
    <Link
      href={href}
      className={`relative flex items-center py-2 px-3 my-4 font-medium rounded-md cursor-pointer transition-colors group ${pathname}`}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>

      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-blue-100 text-blue-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </Link>
  );
}
