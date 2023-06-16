"use client";

import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useAppContext } from "@/context/AppContext";
import Modal from "@/components/Modal";
import DashboardBanner from "@/components/DashboardBanner";
import Card from "@/components/Card";
import SelectView from "@/components/selectView";
import Profile from "@/components/Profile";
import { useRouter } from "next/navigation";
import { BsInfoCircleFill } from "react-icons/bs";

const Dashboard = () => {
  const {
    user,
    isAuthenticated,
    initiatePayment,
    isLoading,
    showModal,
    showProfile,
    clearMessage,
    errorMessage,
    successMessage,
  } = useAppContext();
  const router = useRouter();
  const [authState, setAuthState] = useState();

  useEffect(() => {
    const auth = isAuthenticated();
    setAuthState(auth);
    if (!auth) {
      router.push("/login");
    }
  }, [authState]);

  const handlePay = async () => {
    const url = await initiatePayment({
      email: user?.email,
      fullname: user?.fullname,
    });

    if (url) {
      return router.push(url);
    }
  };

  return (
    <div className="px-4 lg:px-20">
      {!user?.hasPaid && (
        <div className="bg-[#f7e5e9] lg:sticky top-0 z-50 text-gray-700 text-sm lg:text-base flex flex-col lg:flex-row justify-center items-center  p-4 gap-6 mb-2 ">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-2">
            <BsInfoCircleFill size={24} className="text-rose-400" />
            <p className="font-semibold">
              Please note that you cannot get any SMS notification yet until you
              pay a token of N500
            </p>
          </div>

          <button
            onClick={handlePay}
            disabled={isLoading}
            className="bg-white gap-2 disabled:bg-gray-100  rounded-lg shadow-lg text-blue-800 font-bold justify-center flex items-center px-4 py-3"
          >
            Proceed to Pay
            {isLoading && <TailSpin height={20} width={20} />}
          </button>
        </div>
      )}
      <DashboardBanner user={user} />

      <SelectView />

      <div className="mb-20 mt-1">
        {user ? (
          !showProfile ? (
            <div className="grid lg:grid-cols-3 gap-6">
              {user.institutions?.map((item) => (
                <div className="cols-span-1" key={item._id}>
                  <Card school={item} />
                </div>
              ))}
            </div>
          ) : (
            <Profile user={user} />
          )
        ) : (
          <TailSpin />
        )}
      </div>
      {showModal ? <Modal /> : null}

      {errorMessage ? (
        <div
          className="bg-red-100 border z-50 border-red-400 text-red-700 px-4 py-2 rounded flex items-center justify-between gap-4 mb-6 fixed top-[6rem] right-[3rem]"
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

      {successMessage && (
        <div
          className="bg-[#f7fff5] border-[#387245] text-[#64bd79] px-4 py-2 rounded-lg fixed top-[6rem] right-[3rem] flex items-center justify-between gap-4 z-50"
          role="alert"
        >
          <strong className="font-bold">{successMessage}!</strong>

          <span className="px-4rem py-[0.75rem]" onClick={clearMessage}>
            <svg
              className="fill-current h-6 w-6 text-green-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
