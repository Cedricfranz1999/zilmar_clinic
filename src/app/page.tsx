/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import OnBoarding from "./patient/(_patientComponents)/Onboarding";
import { useUser } from "@clerk/nextjs";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { user } = useUser();
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);

  const { data } = api.patient.getPatientLogin.useQuery(
    { userId: user?.id ?? "" },
    { enabled: !!user?.id },
  );

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    } else if (data?.contactNumber && data?.address) {
      router.push("/patient");
    }
  }, [data, router, user]);

  return (
    <>
      {showContent ? (
        <div className="flex h-screen w-full items-center justify-center p-10">
          <OnBoarding />
        </div>
      ) : (
        <div className="flex w-full items-center justify-center py-72">
          {" "}
          <p>Loading....</p>
        </div>
      )}
    </>
  );
};

export default Page;
