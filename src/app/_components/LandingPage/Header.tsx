"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";

const Header = () => {
  const router = useRouter();
  const path = usePathname();

  const navItems = [
    { label: "HOME", path: "/zilmar" },
    {
      label: "ABOUT",
      path: `${path === "zilmar" ? "#about" : "/zilmar#about"} `,
    },
    {
      label: "FEATURES",
      path: `${path === "zilmar" ? "#features" : "/zilmar#features"} `,
    },
    {
      label: "CONTACT US",
      path: `${path === "zilmar" ? "#contact" : "/zilmar#contact"} `,
    },
  ];

  return (
    <Card className="fixed flex w-full justify-center gap-20 shadow-sm drop-shadow-sm">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <img src="logo.png" width={60} className="rounded-full" />
          <Label className="text-4xl font-bold text-[#D11C3E]">ZILMAR</Label>
        </div>
        <Label className="text-xs font-light text-[#107FBC]">
          Powerful medical software within your area
        </Label>
      </div>
      <div className="flex items-center justify-center gap-10">
        {navItems.map((item) => (
          <Label
            key={item.label}
            className="cursor-pointer rounded-lg px-4 py-2 font-semibold transition-colors duration-200 hover:bg-blue-600 hover:text-white"
            onClick={() => router.push(item.path)}
          >
            {item.label}
          </Label>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <button
          className="rounded-full bg-[#DA1B2E] px-4 py-2 text-xs text-white hover:brightness-125"
          onClick={() => router.push("/sign-up")}
        >
          REGISTER
        </button>
        <button
          className="rounded-full bg-[#007FBC] px-4 py-2 text-xs text-white hover:brightness-125"
          onClick={() => router.push("/sign-in")}
        >
          LOGIN
        </button>
      </div>
    </Card>
  );
};

export default Header;
