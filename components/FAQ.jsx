import React from "react";
import { BsQuestionOctagonFill } from "react-icons/bs";

const FAQ = () => {
  return (
    <div>
      <section className="">
        <div className="flex flex-col justify-center px-4 md:px-20 py-20">
          <h2 className="mb-8 text-xl font-bold leading-none text-center sm:text-2xl  tracking-wider uppercase">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-8 md:gap-8 sm:p-3 md:grid-cols-2 lg:px-12 xl:px-32">
            <div  className="shadow-md p-4">
              <BsQuestionOctagonFill size={35} className="text-blue-500 mb-2" />
              <h3 className="font-semibold">
                How do you get our Information?.
              </h3>
              <p className="mt-1 text-gray-500">
                We have insider in all public and private
                universities,Polytechnics, colleges all over Nigeria.
              </p>
            </div>
            <div className="shadow-md p-4">
              <BsQuestionOctagonFill size={35} className="text-blue-500 mb-2" />
              <h3 className="font-semibold">Why should I trust ?</h3>
              <p className="mt-1 text-gray-500">
                Our Information are geniune and must be verified from a number
                of sources before we dispatch. All our insiders are very much
                involved in the academic such that they acces to first hand
                details
              </p>
            </div>
            <div  className="shadow-md p-4">
              <BsQuestionOctagonFill size={35} className="text-blue-500 mb-2" />
              <h3 className="font-semibold">
                How do I verify I am registered?
              </h3>
              <p className="mt-1 text-gray-500">
                Once you have successfully registered you will get and email
                from us immediately showing you have been listed to get current
                information from your chosen school of choices. You will also be
                acces to a dashboard to edit your choices
              </p>
            </div>
            <div  className="shadow-md p-4">
              <BsQuestionOctagonFill size={35} className="text-blue-500 mb-2" />
              <h3 className="font-semibold">
                What infomation do I expect from you?
              </h3>
              <p className="mt-1 text-gray-500">
                You will get information such as your school Jamb Cut off mark,
                Date of sales of Post-Jamb Screening for your school, where you
                can go and buy the form, and when sales of the form will close,
                Post Jamb screening day, and any other information to help you
                get your admission concerning your school.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
