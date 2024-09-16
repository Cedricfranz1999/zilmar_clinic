import { SignIn } from "@clerk/nextjs";
import Header from "~/app/_components/LandingPage/Header";

const SignInPage = () => {
  return (
    <>
        <Header/>

    <div  className=" w-full h-screen  items-center justify-center px-10 flex">
      
      <div className=" flex items-center justify-center  w-full">
        <div className=" p-14 bg-red-400 rounded-lg ">
          <SignIn
           
            path="/sign-in"
            fallbackRedirectUrl="/"
            routing="path"
            signUpUrl="/sign-up"
          />
          </div>
      </div>

      <div className=" flex items-center justify-center  w-full">
        <div className=" flex items-center justify-center  bg-blue-500  p-10 rounded-lg">
          <img src="login.png" width={600} />
        </div>
      </div>
    </div>
    </>
    
  );
};

export default SignInPage;
