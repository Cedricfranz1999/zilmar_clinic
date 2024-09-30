'use client'

import { useEffect } from "react";
import Header from "./(_patientComponents)/Header";
import Sidebar from "./(_patientComponents)/Sidebar";
import { useRouter } from "next/navigation";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const adminData = localStorage.getItem("doctorId");
    if (!adminData) {
      router.push("/doctorLogin");
    }
  }, [router]);
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
