"use client";

import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { TailSpin } from "react-loader-spinner";

const Success = () => {
  const router = useRouter();

  const { verifyPayment, errorMessage, clearMessage } = useAppContext();
  const [res, setRes] = useState();
  const searchParams = useSearchParams();

  useEffect(() => {
    const reference = searchParams.get("reference");

    const getData = async () => {
      const payload = await verifyPayment(reference);

      if (payload) {
        setRes(payload);
      }
    };

    getData();
  }, [router]);

  return (
    <div className="bg-blue-50 h-screen w-screen flex items-center justify-center">
      {errorMessage ? (
        <div
          className="bg-red-100 border z-50 border-red-400 text-red-700 px-4 py-2 rounded flex items-center justify-between gap-4 mb-6 fixed top-[2rem] right-[1.5rem] lg:top-[6rem] lg:right-[3rem]"
          role="alert"
        >
          <strong className="font-bold">{errorMessage}!</strong>

          <span className="px-4 py-2" onClick={clearMessage}>
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      ) : null}
      {res ? (
        <div className="bg-white shadow-md w-1/2 flex flex-col items-center justify-center gap-8 px-8 py-6">
          <div className="mx-auto  rounded-full border-blue-500">
            <Image
              src="./images/done.svg"
              width={200}
              height={200}
              alt="Payment Succesful"
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-3">
            <h3 className="font-bold text-2xl">
              Thanks for Registering with us.
            </h3>
            <p className="text-center text-gray-600">
              A confirmation email as been sent to you at
              okpabicounsel@gmail.com
            </p>

            <Link
              href="/dashboard"
              className="bg-blue-500 flex items-center gap-2 hover:bg-blue-700 text-white py-3 px-6 rounded"
            >
              <IoArrowBackOutline size={20} />
              Back to Dashboard
            </Link>
          </div>
        </div>
      ) : (
        <TailSpin />
      )}
    </div>
  );
};

export default Success;
