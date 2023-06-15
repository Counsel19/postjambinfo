import React from "react";
import { TfiWrite } from "react-icons/tfi";
import { BiSelectMultiple } from "react-icons/bi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";

const Steps = () => {
  return (
    <div className="container w-full bg-white p-2 lg:p-4 mb-4 rounded-md">
      <div className={`steps flex justify-between pt-2 pb-1`}>
        <div className={`step completed`}>
          <div className="stepIconWrap">
            <div className="stepIcon">
              <TfiWrite className="md:text-4xl text-sm"/>
            </div>
          </div>
          <h4 className="stepTitle">Fill the form Below </h4>
        </div>

        <div className={`step completed`}>
          <div className="stepIconWrap">
            <div className="stepIcon">
              <BiSelectMultiple className="md:text-4xl text-sm"/>{" "}
            </div>
          </div>
          <h4 className="stepTitle">
            Ensure to Select all your Institutions
          </h4>
        </div>
        <div className={`step completed`}>
          <div className="stepIconWrap">
            <div className="stepIcon">
              <IoMdInformationCircleOutline className="md:text-4xl text-sm"/>
            </div>
          </div>
          <h4 className="stepTitle">
            Your information Recieved and Insiders contacted
          </h4>
        </div>
        <div className={`step completed`}>
          <div className="stepIconWrap">
            <div className="stepIcon">
              <FiMessageSquare className="md:text-4xl text-sm"/>
            </div>
          </div>
          <h4 className="stepTitle">
            We send you all neccesary information via SMS
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Steps;
