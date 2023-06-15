import Image from "next/image";
import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <div className="grid py-16 lg:py-8 gap-4 md:grid-cols-2 bg-[#4476DD] bg-gradient-to-bl from-[#4476DD] to-[#C7F6FC] w-full h-fit items-center justify-around px-6 md:px-20">
      <div className=" col-span-1 grid flex-col gap-6">
        <div className="md:text-3xl text-2xl font-bold md:leading-[2.8rem]">
          Get Reliable{" "}
          <span className="text-white whitespace-nowrap">SMS Notification</span>
          <br />
          From all your Jamb Schools
        </div>
        <div className=" w-full">
          <p className="mb-2">
            Do you know everything happening in your Choice of School for Jamb
            admission 2023/2024? Their PostJamb date/screening, or cut off mark?
          </p>

          <p className="mb-2">
            We can send you latest information via sms to your phone sharp sharp
            as it is happening in your Jamb choice school so that this year 2023
            you will not miss your admission for only N500.
          </p>

          <p>No dull yourself o.</p>
        </div>

        <Link
          href="#register"
          className="bg-white lg:w-1/2 rounded-md shadow-lg text-blue-800 font-bold justify-center flex items-center px-4 py-3"
        >
          Make us Your Sure Plug
        </Link>
      </div>

      <div className="col-span-1 flex items-center justify-center" >
        <Image
          src="/images/surprise_img.png"
          alt="Suprised"
          height={480}
          width={480}
          
        />
      </div>
    </div>
  );
};

export default Banner;
