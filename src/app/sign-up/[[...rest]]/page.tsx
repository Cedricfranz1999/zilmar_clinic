import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import Header from "~/app/_components/LandingPage/Header";

const SignInPage = () => {
  return (
    <>
      <Header />

      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-r from-[#d3ebef] via-[#efebe3] to-[#e9e9f1] px-10">
        <div className="flex w-full items-center justify-center">
          <div className="max-h-[500px] overflow-scroll rounded-lg bg-red-400 p-4">
            <SignUp
              path="/sign-up"
              routing="path"
              signInUrl="/sign-in"
              fallbackRedirectUrl="/sign-in"
            />
          </div>
        </div>

        <div className="flex w-full items-center justify-center">
          <div className="flex items-center justify-center rounded-lg bg-blue-500 p-3">
            <Image alt="image" src="/signup.png" height={400} width={400} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
