import React from "react"
import Link from "next/link";
import Header from "./components/header";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="flex flex-col justify-between sm:gap-20">
      <Header/>
    <div className="lg:flex flex-row">
      <img src="/background.png" alt="Background"  className="lg:w-[1000px] sm:w-[350px] sm:h-[200px] lg:h-[600px]" />
      <span>
      <h1 className="lg:w-[355px] sm:w-[300px] lg:text-[40px] sm:text-sm sm:m-4 font-medium mt-20">
        Connect, Communicate, and Listen in Style: Explore Our Cutting-Edge Tech
        Collection!
      </h1>
      <Link href={'/client/devices/phone'} className="lg:w-[180px] sm:text-xsm lg:text-sm lg:h-[45px] sm:w-[80px] sm:h-[20px] rounded-[8px] bg-blue text-[18px] mt-6 ml-24 text-secondary lg:p-3 sm:p-2">
        Start Shopping
      </Link>
      </span>
    </div>
    <span className="flex items-end h-full mt-60">
    <Footer/>
    </span>
    </div>
  );
}
