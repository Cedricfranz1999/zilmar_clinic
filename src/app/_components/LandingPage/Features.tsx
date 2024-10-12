import { BookCheck, Mail, MapPin, Smartphone } from "lucide-react";
import { Label } from "~/components/ui/label";

const Features = () => {
  return (
    <>
      <div
        className="mt-40 flex w-full flex-col items-center justify-center gap-2"
        id="features"
      >
        <div className="mb-20">
          <Label className="text-5xl font-bold text-[#DA1B2E]">Zilmar </Label>
          <Label className="text-5xl font-extralight"> Features</Label>
        </div>
        <div className="flex w-full justify-center gap-20">
          {" "}
          <div className="mt-32 grid grid-cols-2 gap-4">
            <div className="flex items-start justify-start gap-4">
              <img src="pic1.svg" width={30} />
              <div className="flex flex-col gap-5">
                <Label className="text-xl font-extralight">
                  {" "}
                  Patient Information
                </Label>
                <Label className="w-56 text-sm font-extralight">
                  {" "}
                  Access and update your patient records in{" "}
                  <span className="font-bold text-[#DA1B2E]">
                    Different and Multiple Clinics
                  </span>
                </Label>
              </div>
            </div>
            <div className="flex items-start justify-start gap-4">
              <img src="pic2.svg" width={30} />
              <div className="flex flex-col gap-5">
                <Label className="text-xl font-extralight">
                  {" "}
                  Medical Notes
                </Label>
                <Label className="w-56 text-sm font-extralight">
                  Keep track of your patients latest
                  <span className="font-bold text-[#DA1B2E]">
                    Medical Condition
                  </span>
                  anytime, anywhere.
                </Label>
              </div>
            </div>
            <div className="flex items-start justify-start gap-4">
              <img src="pic3.svg" width={30} />
              <div className="flex flex-col gap-5">
                <Label className="text-xl font-extralight">
                  {" "}
                  Patient Images
                </Label>
                <Label className="w-56 text-sm font-extralight">
                  {" "}
                  Attach{" "}
                  <span className="font-bold text-[#DA1B2E]">
                    multiple images
                  </span>{" "}
                  for each patient.
                </Label>
              </div>
            </div>
            <div className="flex items-start justify-start gap-4">
              <img src="pic4.svg" width={30} />
              <div className="flex flex-col gap-5">
                <Label className="text-xl font-extralight"> Appointments</Label>
                <Label className="w-56 text-sm font-extralight">
                  {" "}
                  Keep track of your patient appointments
                </Label>
              </div>
            </div>
            <div className="flex items-start justify-start gap-4">
              <img src="pic5.svg" width={30} />
              <div className="flex flex-col gap-5">
                <Label className="text-xl font-extralight"> Payments</Label>
                <Label className="w-56 text-sm font-extralight">
                  {" "}
                  Keep track of your patient{" "}
                  <span className="font-bold text-[#DA1B2E]">
                    Cash
                  </span> and{" "}
                  <span className="font-bold text-[#DA1B2E]">Installments</span>{" "}
                  payments.
                </Label>
              </div>
            </div>
            <div className="flex items-start justify-start gap-4">
              <img src="pic 6.svg" width={30} />
              <div className="flex flex-col gap-5">
                <Label className="text-xl font-extralight"> Reports</Label>
                <Label className="w-56 text-sm font-extralight">
                  {" "}
                  Generate{" "}
                  <span className="font-bold text-[#DA1B2E]">
                    {" "}
                    Income
                  </span> and{" "}
                  <span className="font-bold text-[#DA1B2E]">
                    {" "}
                    Expenses
                  </span>{" "}
                  and report in an instant.
                </Label>
              </div>
            </div>
          </div>
          <div>
            <img className="max-w-min" src="pick8.png" width={450} />
          </div>
        </div>
      </div>

      <div
        className="mt-40 flex w-full flex-col items-center justify-center gap-2 bg-[#5CB7DA] py-10 pb-24"
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
          <Label className="text-3xl font-thin text-white">
            Other Helpful
            <span className="font-bold"> Features</span>
          </Label>
        </div>
        <div className="mt-32 grid grid-cols-3 gap-4">
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center justify-center rounded-full bg-[#38AAD4] p-5">
              <img src="fea1.png" alt="Feature 1" />
            </div>
            <Label className="text-xl font-bold text-white">SMS Sending</Label>
            <Label className="w-60 text-sm font-light text-white">
              Send SMS to your patients via the medical clinic app for their
              upcoming appointments.
            </Label>
          </div>
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center justify-center rounded-full bg-[#38AAD4] p-5">
              <img src="fea2.png" alt="Feature 1" />
            </div>
            <Label className="text-xl font-bold text-white">Data Syncing</Label>
            <Label className="w-60 text-sm font-light text-white">
              Sync patient records and access them on your desktop, laptop, or
              mobile phones.
            </Label>
          </div>
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center justify-center rounded-full bg-[#38AAD4] p-5">
              <img src="fea3.png" alt="Feature 1" />
            </div>
            <Label className="text-xl font-bold text-white">
              Patient Info in PDF File
            </Label>
            <Label className="w-60 text-sm font-light text-white">
              Create a copy of your patient information in PDF format.
            </Label>
          </div>
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center justify-center rounded-full bg-[#38AAD4] p-5">
              <img src="fea4.png" alt="Feature 1" />
            </div>
            <Label className="text-xl font-bold text-white">
              Backup and Restore
            </Label>
            <Label className="w-60 text-sm font-light text-white">
              Secured database because you can backup and restore your patient
              data from your medical clinic app.
            </Label>
          </div>
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center justify-center rounded-full bg-[#38AAD4] p-5">
              <img src="fea5.png" alt="Feature 1" />
            </div>
            <Label className="text-xl font-bold text-white">Multi User</Label>
            <Label className="w-60 text-sm font-light text-white">
              Add your secretary as a user to access your medical clinic
              management system.
            </Label>
          </div>
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center justify-center rounded-full bg-[#38AAD4] p-5">
              <img src="fea6.png" alt="Feature 1" />
            </div>
            <Label className="text-xl font-bold text-white">
              Prescription Plan
            </Label>
            <Label className="w-60 text-sm font-light text-white" id="about">
              Create, print, and email your medical prescriptions to your
              patients in an instant.
            </Label>
          </div>
        </div>
      </div>
      <div className="mt-40 flex w-full flex-col items-center justify-center gap-2">
        <div className="flex gap-28">
          <div>
            <img src="about.svg" width={600} />
          </div>
          <div className="mt-10 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Label className="text-4xl font-extralight">About</Label>
              <Label className="text-4xl font-extrabold text-[#DA1B2E]">
                Zilmar
              </Label>
            </div>
            <Label className="w-80 text-xs font-light leading-5 text-[#100f0f]">
              Zilmar is an intuitive and easy to use medical clinic management
              system ideal for healthcare professionals on the move or who are
              working from different hospitals.. Its equivalent book on this
              website now so you can access your medical patient record system
              anywhere you are.
            </Label>
            <Label className="w-80 text-xs font-light leading-5 text-[#100f0f]">
              Zilmar’s medical clinic management system software and mobile app
              enables you to work across boundaries, from different platforms
              and locations.
            </Label>

            <Label className="w-80 text-xs font-light leading-5 text-[#100f0f]">
              Zilmar’s innovative system provides healthcare record management
              solutions to private practices for better diagnosis and treatment.
            </Label>
          </div>
        </div>
      </div>

      <div className="mt-40 flex w-full flex-col items-center justify-center gap-2">
        <div className="flex gap-28">
          <div className="mt-10 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Label className="text-4xl font-extralight">Book</Label>
              <Label className="text-4xl font-extrabold text-[#DA1B2E]">
                Zilmar
              </Label>
              <Label className="text-4xl font-extralight">Now!</Label>
            </div>

            <Label className="text-md w-[550px] font-light leading-7 text-[#100f0f]">
              Its equivalent app can be downloaded on any mobile devices so you
              can access your medical patient record system anywhere you are.
            </Label>
            <div className="flex w-fit items-center justify-start gap-2 rounded-sm bg-black px-5 py-1 text-white">
              <BookCheck className="text-bkl text-blue-400" size={20} />

              <div className="flex flex-col items-center gap-1">
                <Label className="text-xs font-thin">100% </Label>
                <Label className="text-xs">RECOMMENDED</Label>
              </div>
            </div>
          </div>
          <div>
            <img src="download-now.svg" width={500} />
          </div>
        </div>
      </div>
      <div className="mt-40 flex w-full flex-col items-center justify-center gap-2 bg-[#d4fdfe] pb-24">
        <div className="flex gap-28">
          <div className="mt-10 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Label className="text-3xl font-semibold text-black">
                Zilmar
              </Label>
            </div>

            <Label className="w-[450px] text-sm font-light leading-5 text-[#100f0f]">
              Zilmar s medical clinic management system software and mobile app
              enables you to work across boundaries, from different platforms
              and locations
            </Label>
            {/* <div className="flex w-fit items-center justify-start gap-2 rounded-sm bg-black px-5 py-1 text-white">
              <BookCheck className="text-bkl text-blue-400" size={20} />

              <div className="flex flex-col items-center gap-1">
                <Label className="text-xs font-thin">100% </Label>
                <Label className="text-xs">RECOMMENDED</Label>
              </div>
            </div> */}
          </div>
          <div className="mt-10 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Label className="text-3xl font-semibold text-black">
                Connect with Us
              </Label>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1">
                <MapPin size={15} strokeWidth={2} />{" "}
                <Label className="w-[450px] text-sm font-light leading-5 text-[#100f0f]">
                  62 Stanford Street, Cubao, Quezon City
                </Label>{" "}
              </div>
              <div className="flex items-center gap-1">
                <Smartphone size={15} strokeWidth={2} />{" "}
                <Label className="w-[450px] text-sm font-light leading-5 text-[#100f0f]">
                  (+63) 908-812-8659
                </Label>
              </div>
              <div className="flex items-center gap-1">
                <Mail size={15} strokeWidth={2} />{" "}
                <Label className="w-[450px] text-sm font-light leading-5 text-[#100f0f]">
                  email@Zilmar.ph
                </Label>
              </div>
            </div>
            <div className="flex items-center gap-2" id="contact">
              <Label className="text-3xl font-semibold text-black">
                Follow Us
              </Label>
            </div>
            <div className="flex cursor-pointer items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-white p-2">
                {" "}
                <img src="facebook.png" className="rounded-full" />
              </div>
              <div className="h-10 w-10 cursor-pointer rounded-full bg-white p-2">
                {" "}
                <img src="twitter.png" className="rounded-full" />
              </div>
              <div className="h-10 w-10 cursor-pointer rounded-full bg-white p-2">
                {" "}
                <img src="instagram.jpeg" className="rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
