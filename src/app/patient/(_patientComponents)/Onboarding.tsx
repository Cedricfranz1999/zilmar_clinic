"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { z } from "zod";
import { formSchema } from "../formSchema";
import { SelectGender } from "~/app/_components/SelectGender";
import { CalendarComponent } from "~/app/_components/Calendar";
import { log } from "console";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

const OnBoarding = () => {
  const router = useRouter();
  const updatePatientRecords = api.patient.createPatientAllDetails.useMutation({
    onSuccess: () => {
      router.push("/patient");
    },
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await updatePatientRecords.mutateAsync({
      ...values,
    });
  };

  console.log("ERROR", form.formState.errors);

  return (
    <div className="flex h-screen w-full items-start justify-center bg-[#f6f3f3] p-16 backdrop:blur-sm">
      <Card className="flex h-[800px] flex-col items-center justify-center gap-10 rounded-sm border-2 border-blue-300 bg-white px-20">
        <Label className="w-72 text-3xl font-semibold leading-4 text-[#1C88C6]">
          <span className="text-[#D61F42]"> Zilmar</span> clinic
        </Label>
        <Image alt="image" height={400} width={400} src="/doctorLogo.png" />
      </Card>
      <Card className="h-[800px] rounded-sm bg-red-400 px-10">
        <CardHeader>
          <Label className="font-semibold tracking-widest text-white">
            {" "}
            Please Filled up other confirmation to proceed{" "}
          </Label>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Form {...form}>
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col items-start gap-2">
                      <Label className="text-white">Height in (ft.)</Label>
                      <Input
                        {...field}
                        placeholder=" ( optional only )"
                      ></Input>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col items-start gap-2">
                      <Label className="text-white">Weight in (kg.)</Label>
                      <Input
                        {...field}
                        placeholder=" ( optional only )"
                      ></Input>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col items-start gap-2">
                      <Label className="text-white">Select a gender</Label>
                      <SelectGender field={field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col items-start gap-2">
                      <Label className="text-white">Select Birthdate</Label>
                      <CalendarComponent field={field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col items-start gap-2">
                      <Label className="text-white">Contact No.</Label>
                      <Input {...field}></Input>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col items-start gap-2">
                      <Label className="text-white">Address</Label>
                      <Input {...field}></Input>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              onClick={form.handleSubmit(handleSubmit as any)}
              className="bg-blue-500 font-bold text-white hover:bg-blue-700"
            >
              SAVE INFORMATION
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnBoarding;
