"use client";
import Link from "next/link";
import {
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { Label } from "~/components/ui/label";

const Header = () => {
  const { user } = useUser();

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="/patient"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Zilmar Clinic</span>
            </Link>
            <Link
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Appointment
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full justify-end">
        <div className="mb-2 flex flex-col">
          <SignedIn>
            <div>
              <div className="flex w-full flex-shrink-0 items-center justify-between gap-2 p-2">
                <div className="ml-2 flex items-center justify-center space-x-2">
                  <div>
                    <UserButton afterSignOutUrl="/sign-in" />
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <Label className="text-center text-neutral-400">
                      {user?.firstName} <br /> {user?.lastName}
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </SignedIn>
          <div className="px-4"></div>
        </div>
      </div>
      <div></div>
    </header>
  );
};

export default Header;
