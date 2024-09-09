"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";

const Header = () => {
  const router = useRouter();

  return (
    <Card className="fixed flex w-full justify-center gap-20 shadow-sm drop-shadow-sm">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <img src="logo.png" width={60} className="rounded-full" />
          <Label className="text-4xl font-bold text-[#D11C3E]">KLINIKA</Label>
        </div>
        <Label className="text-xs font-light text-[#107FBC]">
          Powerful medical software within your area
        </Label>
      </div>
      <div className="flex items-center justify-center gap-10">
        <Label className="cursor-pointer rounded-full bg-[#007FBC] px-4 py-2 font-semibold text-white">
          HOME
        </Label>
        <Label className="cursor-pointer font-semibold">ABOUT</Label>
        <Label className="cursor-pointer font-semibold">FEATURES</Label>
        <Label className="cursor-pointer font-semibold">CONTACT US</Label>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="rounded-full bg-[#DA1B2E] px-4 py-2 text-xs text-white"
          onClick={() => router.push("/sign-up")}
        >
          REGISTER
        </button>
        <button
          className="rounded-full bg-[#007FBC] px-4 py-2 text-xs text-white"
          onClick={() => router.push("/sign-in")}
        >
          LOGIN
        </button>
      </div>
    </Card>
  );
};

export default Header;
