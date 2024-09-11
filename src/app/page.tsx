/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import OnBoarding from "./patient/(_patientComponents)/Onboarding";
import { useUser } from "@clerk/nextjs";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const user = useUser();
  const router = useRouter();

  // const { data: checkoutItems, refetch: refetchCheckout } =
  //   api.client_checkouts.getAllCheckoutItems.useQuery();

  const { data } = api.patient.getPatientLogin.useQuery(
    { userId: user?.user?.id ?? "" },
    { enabled: !!user?.user?.id },
  );

  useEffect(() => {
    if (data?.contactNumber && data?.address) {
      router.push("/patient");
    }
  }, [data?.contactNumber, data?.address]);

  console.log("OWWSHIE", data);

  return (
    <div className="flex h-screen w-full items-center justify-center p-10">
      <OnBoarding />
    </div>
  );
};

export default Page;
