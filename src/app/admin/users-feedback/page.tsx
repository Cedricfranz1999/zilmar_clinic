"use client";

import React from "react";
import { api } from "~/trpc/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Star } from "lucide-react";

export default function FeedbackTable() {
  const {
    data: feedbackData,
    isLoading,
    error,
  } = api.feedback.GetFeedback.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto py-10">
      <div className="flex w-full items-center justify-center">
        <p className="pb-20 pt-1 text-3xl font-semibold">Users Feedback</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Feedback</TableHead>
            <TableHead>Rating</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feedbackData?.map((feedback) => (
            <TableRow key={feedback.id}>
              <TableCell>{feedback.user.firstname}</TableCell>
              <TableCell>{feedback.user.lastname}</TableCell>
              <TableCell>{feedback.content}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {feedback.rating}
                  <Star className="ml-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
