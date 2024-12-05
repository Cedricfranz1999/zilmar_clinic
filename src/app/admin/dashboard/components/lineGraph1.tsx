"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

interface DataPoint {
  appointmentDescription: string;
  createdAt: string;
}

export function LineGraph({
  data,
}: {
  data?: { appointmentDescription: string | null; createdAt: Date }[];
}) {
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

  // Clean and transform the data
  const validData: DataPoint[] = data
    .filter((item) => item.appointmentDescription) // Filter out null descriptions
    .map((item) => ({
      appointmentDescription: item.appointmentDescription || "Unknown", // Replace null with a placeholder
      createdAt: item.createdAt.toISOString(), // Convert Date to string
    }));

  // Group data by appointment description and count occurrences
  const groupedData = validData.reduce((acc: Record<string, number>, item) => {
    const description = item.appointmentDescription.toLowerCase().trim();
    acc[description] = (acc[description] || 0) + 1;
    return acc;
  }, {});

  // Prepare chart data
  const chartData = Object.entries(groupedData).map(([description, count]) => ({
    description: description.charAt(0).toUpperCase() + description.slice(1), // Capitalize
    count,
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Line Chart</CardTitle>
        <CardDescription>Sickness metrics </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="description"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
