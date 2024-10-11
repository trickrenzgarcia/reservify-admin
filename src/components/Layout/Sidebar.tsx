'use client'

import { navList } from '@/lib/constant';
import { cn } from "@/lib/utils";
import { signOut } from 'next-auth/react';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import React from "react";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="p-4 hidden md:block w-64 bg-[#E1E1E1] min-h-full">
      <ul className="flex flex-col gap-2">
        {navList.map((nav, index) => (
          <Link href={nav.href} key={index}>
            <li
              className={cn(
                "p-2 rounded-lg text-center font-bold py-3",
                index % 2 === 0 ? "bg-[#ECECEC]" : "bg-[#F3F3F3]",
                pathname === nav.href && "bg-[#558134] hover:bg-[#66993e] text-white border-2 border-primary"
              )}
            >
              {nav.title}
            </li>
          </Link>
        ))}
        <Link href="/" onClick={async () => {
          await signOut({ redirectTo: '/login' });
        }}>
          <li className="p-2 rounded-lg text-center font-bold py-3 bg-[#ECECEC]">
            SIGN OUT
          </li>
        </Link>
      </ul>
    </div>
  );
}
