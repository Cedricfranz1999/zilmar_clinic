"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Bell,
  Home,
  LineChart,
  MessageCircle,
  Package,
  Package2,
  ShoppingCart,
  Star,
  Users,
  Loader2,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Textarea } from "~/components/ui/textarea";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import { useUser } from "@clerk/nextjs";

const Sidebar = () => {
  const user = useUser();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState<string | undefined>(undefined);
  const {
    data: feedbackData,
    isLoading,
    refetch,
    error,
  } = api.feedback.GetFeedback.useQuery();
  const AddFeedBack = api.feedback.AddFeedback.useMutation({
    onSuccess: async () => {
      await refetch();
      toast({
        title: "Success",
        description: "Feedback submitted successfully.",
        duration: 1000,
      });
    },
  });

  const handleSubmit = async () => {
    if (!feedback) {
      toast({
        title: "Error",
        description: "Please provide feedback before submitting.",
        duration: 3000,
        variant: "destructive",
      });
      return;
    }

    await AddFeedBack.mutateAsync({
      content: feedback,
      rating: Number(rating),
      userId: String(user.user?.id),
    });

    setIsDialogOpen(false);
    setFeedback("");
    setRating(undefined);
  };

  return (
    <div className="hidden border-r bg-muted md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Zilmar Clinic System</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Home className="h-4 w-4" />
              Appointments
            </Link>
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <AlertDialogTrigger asChild>
                <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-muted-foreground transition-all hover:text-primary">
                  <MessageCircle className="h-4 w-4" />
                  Feedback to administrator
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Provide Feedback</AlertDialogTitle>
                  <AlertDialogDescription>
                    Your feedback helps us improve our services. Please share
                    your thoughts below.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="feedback">Your feedback</Label>
                    <Textarea
                      id="feedback"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Type your feedback here."
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Rating (Optional)</Label>
                    <RadioGroup value={rating} onValueChange={setRating}>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <div
                          key={value}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={value.toString()}
                            id={`rating-${value}`}
                          />
                          <Label
                            htmlFor={`rating-${value}`}
                            className="flex items-center"
                          >
                            {Array(value)
                              .fill(0)
                              .map((_, index) => (
                                <Star
                                  key={index}
                                  className="h-4 w-4 fill-current text-yellow-400"
                                />
                              ))}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button
                    onClick={handleSubmit}
                    disabled={AddFeedBack.isPending}
                    className="mt-2"
                  >
                    {AddFeedBack.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <p className="">Submit Feedback</p>
                    )}
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
