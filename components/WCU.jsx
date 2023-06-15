import React from "react";
import { SiSpeedtest } from "react-icons/si";
import { GoVerified } from "react-icons/go";
import { TbMoneybag } from "react-icons/tb";

const WCU = () => {
  return (
    <div className="md:px-20 px-4 py-20 grid md:grid-cols-3 grid-rows-3 md:grid-rows-none  gap-8 items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-gray-100 rounded-full p-4 w-fit mb-3">
          <SiSpeedtest size={50} className="text-violet-500" />
        </div>
        <div className="text-center">
          <h3 className="font-bold text-lg mb-1">Fast Information Delivery</h3>
          <p>
            Our streamlined processes and efficient systems ensure that you
            receive the information you need in the shortest possible time.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="bg-gray-100 rounded-full p-4 w-fit mb-3">
          <GoVerified size={50} className="text-green-500" />
        </div>
        <div className=" text-center">
          <h3 className="font-bold text-lg mb-1">Very Relaible Sources</h3>
          <p>
            We ensure you have the most accurate and up-to-date information at
            your disposal.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="bg-gray-100 rounded-full p-4 w-fit mb-3">
          <TbMoneybag size={50} className="text-rose-500" />
        </div>
        <div className="text-center">
          <h3 className="font-bold text-lg">Highly Reduced Expenses</h3>
          <p>
            Our commitment to reducing costs ensures that you have access to
            valuable information within your budget.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WCU;
