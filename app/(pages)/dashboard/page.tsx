"use client"

import Sidebar from "@/app/components/dashboard/sidebar";
import Header from "../../components/dashboard/header";
import DashboardBody from "@/app/components/dashboard/DashboardBody";
import Footer from "@/app/components/Footer/Footer";
import { AuthProvider } from "@/context/AuthContext";


export default function DashboardPage() {
  return (
    <>
      <AuthProvider>
        <Header />
        <div className="flex h-screen">

          <Sidebar />

          <div className="flex-1 overflow-y-auto p-4">
            <DashboardBody />
          </div>
        </div>
        <Footer />
      </AuthProvider>

    </>

  );
}

