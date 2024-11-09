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
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { LineGraph } from "./components/lineGraph";

const page = () => {
  const [date, setDate] = React.useState<DateRange | undefined>();
  const router = useRouter();
  const { data } = api.admin.getDashboardData.useQuery({ date: date });

  return (
    <div className="h-screen w-full flex-col items-center justify-center gap-10 p-10">
      <div>
        <Label className="mb-20 text-3xl font-bold">DASHBOARD</Label>
      </div>
      <p className="text-sm">
        Filter date by range date:{" "}
        <span
          className={`cursor-pointer text-sm font-semibold text-blue-500 hover:text-blue-600 ${!date ? "hidden" : ""} `}
          onClick={() => setDate(undefined)}
        >
          {" "}
          Reset Filter
        </span>
      </p>
      <div className={cn("grid gap-2 py-2 pb-10")}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
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
            <Label className="text-3xl">{data?.totalAppointmentForRange}</Label>{" "}
            {/* Updated */}
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
      {date ? (
        <p className="py-10 text-xl font-bold">
          Total Appointment From{" "}
          {date?.from ? format(date.from, "MM/dd/yyyy") : ""} to{" "}
          {date?.to ? format(date.to, "MM/dd/yyyy") : ""}
        </p>
      ) : (
        <p className="py-10 text-xl font-bold">Total Appointment</p>
      )}

      <LineGraph data={data?.totalAppointmentForRangeChart} />
    </div>
  );
};

export default page;
