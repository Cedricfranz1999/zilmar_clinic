import { BookCheck } from "lucide-react";
import React from "react";
import Intro from "../_components/LandingPage/Intro";
import Features from "../_components/LandingPage/Features";
import Header from "../_components/LandingPage/Header";

const page = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-start pb-10 pt-0">
        <Header/>
        <Intro />
        <Features />
      </div>
    </>
  );
};

export default page;
