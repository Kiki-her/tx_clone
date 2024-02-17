// import Image from "next/image";
// import { Inter } from "next/font/google";
import React from "react";
import LeftSidebar from "@/components/LeftSidebar";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center items-center relative bg-black">
      <div className="max-w-screen-xl w-full h-full flex relative">
        {/* left sidebar for navigation/header */}
        <LeftSidebar/>
        <main className="ml-[275px] flex w-[600px] h-full min-h-screen flex-col border-l border-r border-gray-600">
          <h1 className="text-3xl font-bold">Home</h1>
        </main>
        {/* <section>right section</section> */}
      </div>
    </div>
  )
}
