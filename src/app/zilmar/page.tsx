import { BookCheck } from "lucide-react";
import React from "react";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import Header from "../_components/Header";
import Intro from "../_components/LandingPage/Intro";
import Features from "../_components/LandingPage/Features";

const page = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-start pb-10 pt-2">
        <Header />
        <Intro />
        <Features />
      </div>
    </>
  );
};

export default page;
