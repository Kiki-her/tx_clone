// import Image from "next/image";
// import { Inter } from "next/font/google";
import React from "react";
import Link from "next/link";
import { BiHomeCircle, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import { HiOutlineHashtag } from "react-icons/hi";
import { HiEnvelope } from "react-icons/hi2";
const NAVIGATION_ITEMS = [
  {
    title: "Twitter",
    icon: BsTwitter
  },
  {
    title: "Home",
    icon: BiHomeCircle
  },
  {
    title: "Explore",
    icon: HiOutlineHashtag
  },
  {
    title: "Notifications",
    icon: BsBell
  },
  {
    title: "Messages",
    icon: BsEnvelope
  },
  {
    title: "Bookmarks",
    icon: BsBookmark
  }, 
  {
    title: "Profile",
    icon: BiUser
  }
]

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center items-center relative bg-black">
      <div className="max-w-screen-xl w-full h-full flex relative">
        {/* left sidebar for navigation/header */}
        <section className="fixed w-[275px] flex flex-col h-screen space-y-4 my-4">
        
          {
            NAVIGATION_ITEMS.map((item) => (
              <Link className="hover:bg-white/10 text-3xl transition duration-200 flex item-center justify-start w-fit space-x-6 rounded-3xl py-2 px-6" href={`/${item.title.toLocaleLowerCase()}`} key={item.title}>
                <div>
                  <item.icon/>
                </div>
                {item.title !== "Twitter" && <div>{item.title}</div>}
              </Link>
            ))
          }
          <button className="rounded-full m-4 bg-primary p-4 text-2xl text-center hover:bg-opacity-70 transition duration-200">
            Tweet
          </button>
        </section>
        {/* <main>Home timeline</main>
        <section>right section</section> */}
      </div>
    </div>
  )
}
