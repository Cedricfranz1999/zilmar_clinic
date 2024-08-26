'use client'

import React from 'react'
import { Card, CardContent, CardHeader } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from 'next/image'
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { z } from 'zod'
import { formSchema } from '../formSchema'
import { SelectGender } from '~/app/_components/SelectGender'
import { CalendarComponent } from '~/app/_components/Calendar'





const OnBoarding = () => {
    const form = useForm({
    resolver: zodResolver(formSchema),
  });


   const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    
  
  };


  return (
    <div className=' w-full  h-screen flex items-start  justify-center p-16'>

        
        
       <Card className='  h-[700px]  flex-col gap-10 flex items-center justify-center border-4  border-blue-300 bg-white px-20  rounded-sm'>

        <Label className=' text-[#1C88C6] font-semibold leading-4 w-72 text-3xl'>
         <span className=' text-[#D61F42]'> Simple</span> clinic management system designed for doctors
        </Label>
        <Image   alt='image'  height={400} width={400} src='/doctorLogo.png'/>

        </Card>
        <Card className='  h-[700px] px-10 bg-red-400  rounded-sm'>
           <CardHeader>
           <Label className='  text-white   tracking-widest font-semibold'> Please Filled up other confirmation to proceed </Label>
           </CardHeader>
           <CardContent className=' flex flex-col gap-8'>
            
            <Form {...form}>
       

           <FormField
              control={form.control}
              name="customer"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                     <div className=' flex flex-col gap-2 items-start'>
                         <Label className=' text-white'>Height in (ft.)</Label>
                        <Input  {...field} placeholder=' ( optional only )'></Input>
                     </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
         

              <div className=' flex flex-col gap-2 items-start'>
                <Label  className=' text-white'>Weight in (kg.)</Label>
                  <Input  placeholder=' ( optional only )'></Input>
            </div>

               <div className=' flex flex-col gap-2 items-start'>
                <Label  className=' text-white'>Select a gender</Label>
                <SelectGender/>

            </div>
                <div className=' flex flex-col gap-2 items-start'>
                <Label  className=' text-white'>Select Birthdate</Label>
                <CalendarComponent/>
            </div>
            
              <div className=' flex flex-col gap-2 items-start'>
                <Label  className=' text-white'>Contact No.</Label>
                <Input  placeholder=' ( optional only )'></Input>
            </div>
            

             <div className=' flex flex-col gap-2 items-start'>
                <Label  className=' text-white'>Address</Label>
                <Input ></Input>
            </div>
            
        

             <Button onClick={()=>onsubmit} className='   bg-blue-800 text-white hover:bg-blue-700  font-bold'>SAVE INFORMATION</Button>
            
            </Form>
           </CardContent>
        </Card>
       
    </div>
  )
}

export default OnBoarding