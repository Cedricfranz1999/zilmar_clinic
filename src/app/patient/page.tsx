'use client'

import React from 'react'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { formSchema } from './formSchema'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { z } from 'zod'
import OnBoarding from './(_patientComponents)/Onboarding'





const Page = () => {


  return (
  
   <>
   <OnBoarding/>
   </>
  )
}

export default Page