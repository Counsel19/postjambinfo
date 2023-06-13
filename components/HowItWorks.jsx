import React from "react";
import Steps from "./Steps";

const HowItWorks = () => {
  return (
    <div className="bg-how-it-works bg-cover bg-center bg-no-repeat md:px-20 px-2 py-10">
      <div className="mb-8 text-white">
        <h2 className=" tracking-wider uppercase text-xl font-bold leading-none text-center sm:text-lg ">
          How it works
        </h2>
        <p className=" text-white tracking-wider text-sm text-center">
          Our Procedures are Tested and Trusted
        </p>
      </div>
      <Steps />
    </div>
  );
};

export default HowItWorks;
