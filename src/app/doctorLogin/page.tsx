"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { toast, Toaster } from "sonner";
import { api } from "~/trpc/react";

export default function AdminLogin() {
  const router = useRouter();
  const { data } = api.doctor.Login.useQuery();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if credentials match
    if (username === data?.username && password === data?.password) {
      toast.success("Login successful!");
      router.push("/admin/doctor");
    } else {
      toast.error("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Doctor Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the Doctor portal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <CardFooter className="mt-4">
              <Button type="submit" className="w-full">
                Login
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
      <Toaster position="top-center" />
    </div>
  );
}
