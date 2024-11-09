"use client";

import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";

const chartConfig = {
  Appointment: {
    label: "Appointment",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const monthOrder = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface DataPoint {
  createdAt: string;
}

export function LineGraph({ data }: { data?: any }) {
  if (!data || data.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Line Chart</CardTitle>
          <CardDescription>No data available</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-[300px] items-center justify-center text-muted-foreground">
            No data to display
          </div>
        </CardContent>
      </Card>
    );
  }

  const countByMonth = data.reduce(
    (acc: any, item: any) => {
      try {
        const date = new Date(item.createdAt);
        const month = date.toLocaleString("default", { month: "long" });
        acc[month] = (acc[month] || 0) + 1;
      } catch (error) {
        console.error("Error processing date:", item.createdAt, error);
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  const formattedData = monthOrder.map((month) => ({
    month,
    Appointment: countByMonth[month] || 0,
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Line Chart</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-[90%]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={formattedData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="Appointment"
                stroke="var(--color-Appointment)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
