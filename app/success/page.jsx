"use client";

import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Success = () => {
  const router = useRouter();

  const { verifyPayment } = useAppContext();
  const [res, setRes] = useState();

  useEffect(() => {
    if (!router.isReady) return;

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
              href="/"
              className="bg-blue-500 flex items-center gap-2 hover:bg-blue-700 text-white py-3 px-6 rounded"
            >
              Back to Home
            </Link>
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default Success;
