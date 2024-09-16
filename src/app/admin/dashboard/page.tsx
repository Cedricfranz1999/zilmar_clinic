import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";

const page = () => {
  return (
    <div className="h-screen w-full flex-col items-center justify-center gap-10 p-10">
      <Label className="mb-20 text-3xl font-bold">DASHBOARD</Label>
      <div className="grid min-w-max grid-cols-2 gap-4">
        <Card className="flex h-[300px] w-[500px] cursor-pointer flex-col items-center justify-center">
          <CardHeader> Total patient</CardHeader>

          <CardDescription>
            a list of all patients register in System
          </CardDescription>
          <CardContent>
            <Label className="text-3xl">20</Label>
          </CardContent>
        </Card>
        <Card className="flex h-[300px] w-[500px] cursor-pointer flex-col items-center justify-center">
          <CardHeader> Total Doctors</CardHeader>

          <CardDescription>
            a list of all doctors register in System
          </CardDescription>
          <CardContent>
            <Label className="text-3xl">20</Label>
          </CardContent>
        </Card>
        <Card className="flex h-[300px] w-[500px] cursor-pointer flex-col items-center justify-center">
          <CardHeader> Total Appointment</CardHeader>

          <CardDescription>a list of all appointments Today</CardDescription>
          <CardContent>
            <Label className="text-3xl">20</Label>
          </CardContent>
        </Card>
        <Card className="flex h-[300px] w-[500px] cursor-pointer flex-col items-center justify-center">
          <CardHeader> Total Walk-ins</CardHeader>

          <CardDescription>a list of all walkins appointment</CardDescription>
          <CardContent>
            <Label className="text-3xl">20</Label>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
