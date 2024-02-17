// import Image from "next/image";
// import { Inter } from "next/font/google";
import React from "react";
import LeftSidebar from "@/components/LeftSidebar";
import MainComponent from "@/components/MainComponent";


// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center items-center relative bg-black">
      <div className="max-w-screen-xl w-full h-full flex relative">
        {/* left sidebar for navigation/header */}
        <LeftSidebar/>
        <MainComponent/>
        {/* <section>right section</section> */}
      </div>
    </div>
  )
}
