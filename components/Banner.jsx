import Image from "next/image";
import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <div className="flex py-16 md:py-0 gap-4 flex-col md:flex-row bg-[#4476DD] bg-gradient-to-bl from-[#4476DD] to-[#C7F6FC] w-full h-fit items-center justify-around px-6 lg:px-48">
      <div className=" flex flex-col gap-6">
        <div className="md:text-3xl text-2xl font-bold md:leading-[2.8rem]">
          Get Reliable <span className="text-white whitespace-nowrap">SMS Notification</span>
          <br />
          From all your Jamb Schools
        </div>
        <div className="md:w-4/5 w-full">
          We have correct insider in all Universities, Polytechnics and colleges
          in Nigeria About Post Jamb, Screening, Cut off Mark sent tour own
          phone number sharp sharp and quickly. Be informed.
        </div>

        <Link
          href="#register"
          className="bg-white md:w-1/2 rounded-md shadow-lg text-blue-800 font-bold justify-center flex items-center px-4 py-3"
        >
          Make us Your Sure Plug
        </Link>
      </div>

      <Image
        src="/images/suprise_img.png"
        alt="Suprised"
        height={450}
        width={450}
        className="hidden md:block"
      />
    </div>
  );
};

export default Banner;
