"use client";

import { BookCheck, Mail, MapPin, Smartphone, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";

function PatientFeedback() {
  const patientFeedback = [
    {
      name: "John Doe",
      feedback:
        "Zilmar has revolutionized my healthcare experience. The ease of accessing my medical records and scheduling appointments has made managing my health so much simpler. I'm impressed with how user-friendly the system is.",
    },
    {
      name: "Jane Smith",
      feedback:
        "As a patient with multiple chronic conditions, Zilmar has been a game-changer. I can easily track my appointments, medications, and test results all in one place. The ability to communicate with my healthcare providers through the app is invaluable.",
    },
    {
      name: "Mike Johnson",
      feedback:
        "I was skeptical about using a digital health management system at first, but Zilmar has exceeded my expectations. The reminders for appointments and medications have helped me stay on top of my health. It's like having a personal health assistant in my pocket.",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-r from-[#d3ebef] via-[#efebe3] to-[#e9e9f1] py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-bold text-[#DA1B2E]">
          Patient Feedback
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {patientFeedback.map((feedback, index) => (
            <Card key={index} className="flex flex-col justify-between p-6">
              <div>
                <Label className="mb-2 block text-lg font-semibold">
                  {feedback.name}
                </Label>
                <p className="text-sm text-gray-600">{feedback.feedback}</p>
              </div>
              <div className="mt-4 flex justify-end">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const router = useRouter();
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "HOME", path: "/zilmar" },
    {
      label: "ABOUT",
      path: `${path === "zilmar" ? "#about" : "/zilmar#about"}`,
    },
    {
      label: "FEATURES",
      path: `${path === "zilmar" ? "#features" : "/zilmar#features"}`,
    },
    {
      label: "CONTACT US",
      path: `${path === "zilmar" ? "#contact" : "/zilmar#contact"}`,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-start bg-gradient-to-r from-[#d3ebef] via-[#efebe3] to-[#e9e9f1] pb-10 pt-0">
      {/* Header */}
      <Card className="fixed flex w-full flex-col items-center justify-between p-4 shadow-sm drop-shadow-sm sm:flex-row sm:justify-center sm:p-0">
        <div className="flex w-full items-center justify-between sm:w-auto">
          <div className="flex flex-col items-center gap-1 sm:flex-row">
            <img
              src="logo.png"
              width={40}
              height={40}
              className="rounded-full sm:h-[60px] sm:w-[60px]"
              alt="Zilmar Logo"
            />
            <Label className="text-2xl font-bold text-[#D11C3E] sm:text-4xl">
              ZILMAR
            </Label>
          </div>
          <button
            className="sm:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
        <Label className="text-xs font-light text-[#107FBC] sm:hidden">
          Powerful medical software within your area
        </Label>
        <div
          className={`${isMenuOpen ? "flex" : "hidden"} mt-4 w-full flex-col items-center justify-center gap-4 sm:mt-0 sm:flex sm:w-auto sm:flex-row sm:gap-10`}
        >
          {navItems.map((item) => (
            <Label
              key={item.label}
              className="cursor-pointer rounded-lg px-4 py-2 font-semibold transition-colors duration-200 hover:bg-blue-600 hover:text-white"
              onClick={() => {
                router.push(item.path);
                setIsMenuOpen(false);
              }}
            >
              {item.label}
            </Label>
          ))}
        </div>
        <div
          className={`${isMenuOpen ? "flex" : "hidden"} mt-4 items-center gap-4 sm:mt-0 sm:flex`}
        >
          <button
            className="rounded-full bg-[#DA1B2E] px-4 py-2 text-xs text-white hover:brightness-125"
            onClick={() => router.push("/sign-up")}
          >
            REGISTER
          </button>
          <button
            className="rounded-full bg-[#007FBC] px-4 py-2 text-xs text-white hover:brightness-125"
            onClick={() => router.push("/sign-in")}
          >
            LOGIN
          </button>
        </div>
      </Card>

      {/* Intro */}
      <div className="mt-40 flex w-full flex-col items-center justify-center gap-10 px-4 sm:flex-row sm:items-start sm:gap-20 sm:px-0">
        <div className="mt-10 flex flex-col gap-2 text-center sm:text-left">
          <Label className="text-3xl font-extrabold text-[#2982ab] sm:text-4xl">
            <span className="text-[#DA1B2E]">ZILMAR</span> CLINIC
          </Label>
          <Label className="text-3xl font-extrabold text-[#2982ab] sm:text-4xl">
            MANAGEMENT SYSTEM
          </Label>
          <Label className="text-3xl font-extrabold text-[#2982ab] sm:text-4xl">
            DESIGN FOR PATIENT
          </Label>
          <Label className="w-full font-light leading-6 tracking-wider text-[#0c0b0b] sm:w-[350px]">
            Forget about storage filing to keep patient records. Use{" "}
            <span className="font-bold text-[#DA1B2E]">zilmar</span> the
            efficient medical clinic management system at your fingertips.
          </Label>
          <div className="mt-5 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start">
            <div className="flex w-fit items-center justify-start gap-2 rounded-sm bg-black px-5 py-1 text-white">
              <BookCheck className="text-bkl text-blue-400" size={20} />
              <div className="flex flex-col items-center gap-1">
                <Label className="text-xs font-thin">100% </Label>
                <Label className="text-xs">RECOMMENDED</Label>
              </div>
            </div>
            <div className="flex w-fit items-center justify-start gap-2 rounded-sm bg-black px-5 py-1 text-white">
              <BookCheck className="text-orange-300" size={20} />
              <div className="flex flex-col items-center gap-1">
                <Label className="text-xs font-thin">CARE FOR </Label>
                <Label className="text-xs">PATIENTS</Label>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 sm:mt-0">
          <img
            className="max-w-full sm:max-w-min"
            src="hero.png"
            width={500}
            alt="Hero Image"
          />
        </div>
      </div>

      {/* Features */}
      <div
        className="mt-20 flex w-full flex-col items-center justify-center gap-2 px-4 sm:mt-40 sm:px-0"
        id="features"
      >
        <div className="mb-10 text-center sm:mb-20">
          <Label className="text-4xl font-bold text-[#DA1B2E] sm:text-5xl">
            Zilmar{" "}
          </Label>
          <Label className="text-4xl font-extralight sm:text-5xl">
            {" "}
            Features
          </Label>
        </div>
        <div className="flex w-full flex-col justify-center gap-10 sm:flex-row sm:gap-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {/* Feature items */}
            {[
              {
                icon: "pic1.svg",
                title: "Patient Information",
                description:
                  "Access and update your patient records in Different and Multiple Clinics",
              },
              {
                icon: "pic2.svg",
                title: "Medical Notes",
                description:
                  "Keep track of your patients latest Medical Condition anytime, anywhere.",
              },
              {
                icon: "pic3.svg",
                title: "Patient Images",
                description: "Attach multiple images for each patient.",
              },
              {
                icon: "pic4.svg",
                title: "Appointments",
                description: "Keep track of your patient appointments",
              },
              {
                icon: "pic5.svg",
                title: "Payments",
                description:
                  "Keep track of your patient Cash and Installments payments.",
              },
              {
                icon: "pic 6.svg",
                title: "Reports",
                description:
                  "Generate Income and Expenses and report in an instant.",
              },
            ].map((feature, index) => (
              <div key={index} className="flex items-start justify-start gap-4">
                <img src={feature.icon} width={30} alt={feature.title} />
                <div className="flex flex-col gap-2 sm:gap-5">
                  <Label className="text-lg font-extralight sm:text-xl">
                    {feature.title}
                  </Label>
                  <Label className="w-full text-sm font-extralight sm:w-56">
                    {feature.description}
                  </Label>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden sm:block">
            <img
              className="max-w-full sm:max-w-min"
              src="pick8.png"
              width={450}
              alt="Features Image"
            />
          </div>
        </div>
      </div>

      {/* Other Helpful Features */}
      <div
        className="mt-20 flex w-full flex-col items-center justify-center gap-2 px-4 py-10 pb-24 sm:mt-40 sm:px-0"
        style={{
          background: "#6af7ff",
          backgroundImage: `
      -webkit-linear-gradient(bottom left, rgba(106, 247, 255, 0.7) 0%, rgba(36, 137, 198, 0.7) 100%), 
      url(services-bg.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div>
          <Label className="text-center text-2xl font-thin text-white sm:text-3xl">
            Other Helpful
            <span className="font-bold"> Features</span>
          </Label>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-32 sm:grid-cols-2 md:grid-cols-3">
          {/* Other feature items */}
          {[
            {
              icon: "fea1.png",
              title: "SMS Sending",
              description:
                "Send SMS to your patients via the medical clinic app for their upcoming appointments.",
            },
            {
              icon: "fea2.png",
              title: "Data Syncing",
              description:
                "Sync patient records and access them on your desktop, laptop, or mobile phones.",
            },
            {
              icon: "fea3.png",
              title: "Patient Info in PDF File",
              description:
                "Create a copy of your patient information in PDF format.",
            },
            {
              icon: "fea4.png",
              title: "Backup and Restore",
              description:
                "Secured database because you can backup and restore your patient data from your medical clinic app.",
            },
            {
              icon: "fea5.png",
              title: "Multi User",
              description:
                "Add your secretary as a user to access your medical clinic management system.",
            },
            {
              icon: "fea6.png",
              title: "Prescription Plan",
              description:
                "Create, print, and email your medical prescriptions to your patients in an instant.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-4 sm:items-start"
            >
              <div className="flex items-center justify-center rounded-full bg-[#38AAD4] p-5">
                <img src={feature.icon} alt={feature.title} />
              </div>
              <Label className="text-center text-xl font-bold text-white sm:text-left">
                {feature.title}
              </Label>

              <Label className="w-full text-center text-sm font-light text-white sm:w-60 sm:text-left">
                {feature.description}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <div
        className="mt-20 flex w-full flex-col items-center justify-center gap-2 px-4 sm:mt-40 sm:px-0"
        id="about"
      >
        <div className="flex flex-col items-center gap-10 sm:flex-row sm:gap-28">
          <div className="hidden sm:block">
            <img src="about.svg" width={600} alt="About Zilmar" />
          </div>
          <div className="mt-10 flex flex-col gap-6 text-center sm:text-left">
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <Label className="text-3xl font-extralight sm:text-4xl">
                About
              </Label>
              <Label className="text-3xl font-extrabold text-[#DA1B2E] sm:text-4xl">
                Zilmar
              </Label>
            </div>
            <Label className="w-full text-xs font-light leading-5 text-[#100f0f] sm:w-80">
              Zilmar is an intuitive and easy to use medical clinic management
              system ideal for healthcare professionals on the move or who are
              working from different hospitals. Its equivalent book on this
              website now so you can access your medical patient record system
              anywhere you are.
            </Label>
            <Label className="w-full text-xs font-light leading-5 text-[#100f0f] sm:w-80">
              Zilmars medical clinic management system software and mobile app
              enables you to work across boundaries, from different platforms
              and locations.
            </Label>
            <Label className="w-full text-xs font-light leading-5 text-[#100f0f] sm:w-80">
              Zilmars innovative system provides healthcare record management
              solutions to private practices for better diagnosis and treatment.
            </Label>
          </div>
        </div>
      </div>

      {/* Book Now */}
      <div className="mt-20 flex w-full flex-col items-center justify-center gap-2 px-4 sm:mt-40 sm:px-0">
        <div className="flex flex-col items-center gap-10 sm:flex-row sm:gap-28">
          <div className="mt-10 flex flex-col gap-6 text-center sm:text-left">
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <Label className="text-3xl font-extralight sm:text-4xl">
                Book
              </Label>
              <Label className="text-3xl font-extrabold text-[#DA1B2E] sm:text-4xl">
                Zilmar
              </Label>
              <Label className="text-3xl font-extralight sm:text-4xl">
                Now!
              </Label>
            </div>
            <Label className="sm:text-md w-full text-sm font-light leading-7 text-[#100f0f] sm:w-[550px]">
              Its equivalent app can be downloaded on any mobile devices so you
              can access your medical patient record system anywhere you are.
            </Label>
            <div className="mx-auto flex w-fit items-center justify-center gap-2 rounded-sm bg-black px-5 py-1 text-white sm:mx-0 sm:justify-start">
              <BookCheck className="text-bkl text-blue-400" size={20} />
              <div className="flex flex-col items-center gap-1">
                <Label className="text-xs font-thin">100% </Label>
                <Label className="text-xs">RECOMMENDED</Label>
              </div>
            </div>
          </div>
          <div>
            <img
              src="download-now.svg"
              className="max-w-full sm:max-w-min"
              width={500}
              alt="Download Now"
            />
          </div>
        </div>
      </div>

      {/* Patient Feedback */}
      <PatientFeedback />

      {/* Footer */}
      <div className="mt-20 flex w-full flex-col items-center justify-center gap-2 bg-[#d4fdfe] px-4 pb-24 sm:mt-40 sm:px-0">
        <div className="flex flex-col gap-10 sm:flex-row sm:gap-28">
          <div className="mt-10 flex flex-col gap-6 text-center sm:text-left">
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <Label className="text-2xl font-semibold text-black sm:text-3xl">
                Zilmar
              </Label>
            </div>
            <Label className="w-full text-sm font-light leading-5 text-[#100f0f] sm:w-[450px]">
              Zilmars medical clinic management system software and mobile app
              enables you to work across boundaries, from different platforms
              and locations
            </Label>
          </div>
          <div className="mt-10 flex flex-col gap-6 text-center sm:text-left">
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <Label className="text-2xl font-semibold text-black sm:text-3xl">
                Connect with Us
              </Label>
            </div>
            <div className="flex flex-col items-center gap-1 sm:items-start">
              <div className="flex items-center gap-1">
                <MapPin size={15} strokeWidth={2} />
                <Label className="w-full text-sm font-light leading-5 text-[#100f0f] sm:w-[450px]">
                  62 Stanford Street, Cubao, Quezon City
                </Label>
              </div>
              <div className="flex items-center gap-1">
                <Smartphone size={15} strokeWidth={2} />
                <Label className="w-full text-sm font-light leading-5 text-[#100f0f] sm:w-[450px]">
                  (+63) 908-812-8659
                </Label>
              </div>
              <div className="flex items-center gap-1">
                <Mail size={15} strokeWidth={2} />
                <Label className="w-full text-sm font-light leading-5 text-[#100f0f] sm:w-[450px]">
                  email@Zilmar.ph
                </Label>
              </div>
            </div>
            <div
              className="flex items-center justify-center gap-2 sm:justify-start"
              id="contact"
            >
              <Label className="text-2xl font-semibold text-black sm:text-3xl">
                Follow Us
              </Label>
            </div>
            <div className="flex cursor-pointer items-center justify-center gap-2 sm:justify-start">
              <div className="h-10 w-10 rounded-full bg-white p-2">
                <img
                  src="facebook.png"
                  className="rounded-full"
                  alt="Facebook"
                />
              </div>
              <div className="h-10 w-10 cursor-pointer rounded-full bg-white p-2">
                <img src="twitter.png" className="rounded-full" alt="Twitter" />
              </div>
              <div className="h-10 w-10 cursor-pointer rounded-full bg-white p-2">
                <img
                  src="instagram.jpeg"
                  className="rounded-full"
                  alt="Instagram"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
