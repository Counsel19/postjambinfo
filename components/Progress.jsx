import React from "react";
import { TiTick } from "react-icons/bi";


const Progress = () => {
  return (
    <div className="container w-full bg-white p-2 lg:p-4 mb-4 rounded-md">
      <div className={`steps flex justify-between pt-2 pb-1`}>
        <div className={`step completed`}>
          <div className="stepIconWrap">
            <div className="stepIcon">
              <TiTick className="md:text-2xl text-sm"/>
            </div>
          </div>
          <h4 className="stepTitle">Form Filled</h4>
        </div>

        <div className={`step completed`}>
          <div className="stepIconWrap">
            <div className="stepIcon">
              <TiTick className="md:text-2xl text-sm"/>{" "}
            </div>
          </div>
          <h4 className="stepTitle">
            Data Captured
          </h4>
        </div>
       
        <div className={`step completed`}>
          <div className="stepIconWrap">
            <div className="stepIcon">
              <TiTick className="md:text-2xl text-sm"/>
            </div>
          </div>
          <h4 className="stepTitle">
            Subscribe for SMS 
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Progress;
