"use client";
import Link from "next/link";
import {
  Bell,
  CircleUser,
  Footprints,
  Home,
  KeyboardMusic,
  LayoutDashboard,
  LineChart,
  Menu,
  MessageCircle,
  Package,
  Package2,
  Search,
  ShoppingCart,
  SquareArrowDown,
  Stethoscope,
  User,
  Users,
  Users2,
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

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Label } from "~/components/ui/label";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <div className="hidden border-r bg-muted md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Label className="text-xl font-bold text-teal-700">
            ZILMAR CLINIC
          </Label>
        </div>
        <div className="mt-6 flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/admin/dashboard"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive("/admin/dashboard")
                  ? "bg-teal-700 text-white"
                  : "text-muted-foreground"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/appoinment"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive("/admin/appoinment")
                  ? "bg-teal-700 text-white"
                  : "text-muted-foreground"
              }`}
            >
              <SquareArrowDown className="h-4 w-4" />
              Appointment
            </Link>
            <Link
              href="/admin/patientRecord"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive("/admin/patientRecord")
                  ? "bg-teal-700 text-white"
                  : "text-muted-foreground"
              }`}
            >
              <Users className="h-4 w-4" />
              User
            </Link>
            <Link
              href="/admin/doctorRecord"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive("/admin/doctorRecord")
                  ? "bg-teal-700 text-white"
                  : "text-muted-foreground"
              }`}
            >
              <Stethoscope className="h-4 w-4" />
              Doctor
            </Link>

            <Link
              href="/admin/walk-in"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive("/admin/walk-in")
                  ? "bg-teal-700 text-white"
                  : "text-muted-foreground"
              }`}
            >
              <Footprints className="h-4 w-4" />
              Walk-in
            </Link>
            <Link
              href="/admin/users-feedback"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive("/admin/users-feedback")
                  ? "bg-teal-700 text-white"
                  : "text-muted-foreground"
              }`}
            >
              <MessageCircle className="h-4 w-4" />
              Users Feedback
            </Link>
          </nav>
        </div>
        <div className="mt-auto py-10"></div>
      </div>
    </div>
  );
};

export default Sidebar;
