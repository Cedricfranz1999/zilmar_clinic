import { BookCheck } from "lucide-react";
import { Label } from "~/components/ui/label";

const Intro = () => {
  return (
    <div className="mt-40 flex w-full justify-center gap-20">
      <div className="mt-10 flex flex-col gap-2">
        <Label className="text-4xl font-extrabold text-[#2982ab]">
          {" "}
          <span className="text-[#DA1B2E]">SIMPLE</span> CLINIC
        </Label>
        <Label className="text-4xl font-extrabold text-[#2982ab]">
          MANAGEMENT SYSTEM
        </Label>
        <Label className="text-4xl font-extrabold text-[#2982ab]">
          DESIGN FOR DOCTORS
        </Label>
        <Label className="w-[350px] font-light leading-6 tracking-wider text-[#0c0b0b]">
          Forget about storage filing to keep patient records. Use{" "}
          <span className="font-bold text-[#DA1B2E]">Klinika</span> the
          efficient medical clinic management system at your fingertips.
        </Label>
        <div className="mt-5 flex items-center gap-4">
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
      <div>
        <img className="max-w-min" src="hero.png" width={500} />
      </div>
    </div>
  );
};

export default Intro;
