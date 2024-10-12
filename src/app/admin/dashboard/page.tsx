"use client";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";

const page = () => {
  const router = useRouter();
  const { data } = api.admin.getDashboardData.useQuery();
  return (
    <div className="h-screen w-full flex-col items-center justify-center gap-10 p-10">
      <Label className="mb-20 text-3xl font-bold">DASHBOARD</Label>
      <div className="grid min-w-max grid-cols-2 gap-4">
        <Card
          className="flex h-[300px] w-[500px] cursor-pointer flex-col items-center justify-center"
          onClick={() => router.push("/admin/patientRecord")}
        >
          <CardHeader> Total Users</CardHeader>

          <CardDescription>
            a list of all patients register in System
          </CardDescription>
          <CardContent>
            <Label className="text-3xl">{data?.totalPatient}</Label>
          </CardContent>
        </Card>
        <Card
          className="flex h-[300px] w-[500px] cursor-pointer flex-col items-center justify-center"
          onClick={() => router.push("/admin/doctorRecord")}
        >
          <CardHeader> Total Doctors</CardHeader>

          <CardDescription>
            a list of all doctors register in System
          </CardDescription>
          <CardContent>
            <Label className="text-3xl">{data?.totalDoctor}</Label>
          </CardContent>
        </Card>
        <Card
          className="flex h-[300px] w-[500px] cursor-pointer flex-col items-center justify-center"
          onClick={() => router.push("/admin/appoinment")}
        >
          <CardHeader> Total Appointment</CardHeader>

          <CardDescription>a list of all appointments Today</CardDescription>
          <CardContent>
            <Label className="text-3xl">{data?.totalAppointmentForToday}</Label>
          </CardContent>
        </Card>
        <Card
          className="flex h-[300px] w-[500px] cursor-pointer flex-col items-center justify-center"
          onClick={() => router.push("/admin/walk-in")}
        >
          <CardHeader> Total Walk-ins</CardHeader>

          <CardDescription>a list of all walkins appointment</CardDescription>
          <CardContent>
            <Label className="text-3xl">{data?.totalWalkin}</Label>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
