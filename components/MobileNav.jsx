"use client";

import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

const MobileNav = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useAppContext();

  const handleIconHoverOpen = () => {
    setIsOpen(true);
  };
  const handleIconHoverClose = () => {
    setIsOpen(false);
  };
  
  const handleMobileLogout = () => {
    setIsOpen(false);
    handleLogout()
  }

  return (
    <div>
      {isAuthenticated() ? (
        <div
          onMouseEnter={handleIconHoverOpen}
          onMouseLeave={handleIconHoverClose}
          className="relative"
        >
          <button
            onMouseEnter={handleIconHoverOpen}
            onMouseLeave={handleIconHoverClose}
            type="button"
            className="w-32 bg-white tracking-wide text-gray-800  rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-200 hover:text-gray-600 shadow-md py-2 px-3 inline-flex items-center"
          >
            Hi! {user.fullname.slice(0, 5)}...
          </button>
          {isOpen && (
            <div className="h-screen w-screen z-50 bg-gray-700 bg-opacity-70 fixed top-0 right-0 left-0 bottom-0">
              <div
                onMouseEnter={handleIconHoverOpen}
                onMouseLeave={handleIconHoverClose}
                className="px-6 py-8 w-full h-42 bg-white rounded shadow-lg"
              >
                <span className="absolute top-4 right-4 rounded border p-2 bg-white border-blue-900">
                  <IoCloseSharp
                    className="justify-end cursor-pointer text-rose-600"
                    size={30}
                    onClick={handleIconHoverClose}
                  />
                </span>
                <ul className="flex mt-8  flex-col space-y-4 w-full">
                  <li onClick={() => setIsOpen(false)}>
                    <Link
                      className="text-gray-900 flex justify-start w-full p-2 hover:text-gray-600 hover:bg-blue-50"
                      href="/dashboard"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleMobileLogout}
                      className="text-gray-900 flex justify-start w-full p-2 hover:text-gray-600  hover:bg-blue-50"
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          onMouseEnter={handleIconHoverOpen}
          onMouseLeave={handleIconHoverClose}
          className="relative"
        >
          <div className="p-2 rounded bg-blue-900 text-white cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          {isOpen && (
            <div className="h-screen w-screen bg-gray-700 bg-opacity-50 fixed top-0 right-0 left-0 bottom-0">
              <div
                onMouseEnter={handleIconHoverOpen}
                onMouseLeave={handleIconHoverClose}
                className="px-6 py-8 w-full h-42 bg-white rounded shadow-lg"
              >
                <span className="absolute top-4 right-4 rounded border p-2 bg-white border-blue-900">
                  <IoCloseSharp
                    className="justify-end cursor-pointer text-rose-600"
                    size={30}
                    onClick={handleIconHoverClose}
                  />
                </span>
                <ul className="flex mt-8  flex-col space-y-4 w-full">
                  <li onClick={() => setIsOpen(false)} className="w-full">
                    <Link
                      className="text-gray-900 flex justify-start w-full p-2 hover:text-gray-600 hover:bg-blue-50"
                      href="#register"
                      role="menuitem"
                      tabIndex="-1"
                    >
                      Register
                    </Link>
                  </li>
                  <li onClick={() => setIsOpen(false)} className="w-full">
                    <Link
                      className="text-gray-900 flex justify-start w-full p-2 hover:text-gray-600  hover:bg-blue-50"
                      href="/login"
                      role="menuitem"
                      tabIndex="-1"
                    >
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileNav;
