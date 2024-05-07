"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AppHeader = () => {
  return (
    <header className="flex justify-between  items-center text-white py-6 border-b-2 border-zinc-300/40   ">
      <Logo />
      <Navbar />
    </header>
  );
};

export default AppHeader;

const Logo = () => {
  return (
    <Link href="/" className="text-2xl font-bold">
      🐇
    </Link>
  );
};

const routes = [
  {
    label: "Dashboard",
    path: "/app/dashboard",
  },
  {
    label: "Account",
    path: "/app/account",
  },
];
const Navbar = () => {
  const activePathname = usePathname();
  return (
    <nav>
      <ul className="flex gap-5 items-center">
        {routes.map(({ label, path }) => (
          <li
            key={path}
            className={cn(
              " px-4 py-2 rounded-md text-white/70 hover:text-white active:text-white transition",
              {
                "bg-white/10 text-white": activePathname === path,
              }
            )}
          >
            <Link href={path}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
