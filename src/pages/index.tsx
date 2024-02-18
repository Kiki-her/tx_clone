// import Image from "next/image";
// import { Inter } from "next/font/google";
import React from "react";
import LeftSidebar from "@/components/LeftSidebar";
import MainComponent from "@/components/MainComponent";
import { RightSection } from "@/components/RightSection";



// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center items-center relative bg-black">
      <div className="max-w-[80vw] w-full h-full flex relative">
        <LeftSidebar/>
        <MainComponent/>
        <RightSection/>
      </div>
    </div>
  )
}
