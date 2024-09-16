/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import OnBoarding from "./patient/(_patientComponents)/Onboarding";
import { useUser } from "@clerk/nextjs";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { user } = useUser();
  const router = useRouter();

  const { data } = api.patient.getPatientLogin.useQuery(
    { userId: user?.id ?? "" },
    { enabled: !!user?.id },
  );

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    } else if (data?.contactNumber && data?.address) {
      router.push("/patient");
    }
  }, [data, router, user]);

  return (
    <div className="flex h-screen w-full items-center justify-center p-10">
      <OnBoarding />
    </div>
  );
};

export default Page;
