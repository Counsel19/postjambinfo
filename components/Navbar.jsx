"use client";

import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import React from "react";
import { BsFillPhoneFill } from "react-icons/bs";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiMenu3Fill } from "react-icons/ri";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAppContext();

  return (
    <div className="md:px-20 px-4 py-4 ">
      <div className="flex justify-between items-center bg-white">
        <div className="flex md:gap-2 gap-2 items-center justify-center">
          <Link href="/" className="font-bold md:text-xl text-lg">
            MYSCH<span className="text-blue-800">informant</span>
          </Link>
        </div>

        <div className="flex gap-3 items-center text-gray-500">
          <div className="md:flex hidden  gap-2 items-center text-sm mr-3">
            Let us get in touch
            <div className="flex gap-1 items-center mr-4">
              <BsFillPhoneFill size={20} className="text-blue-600" />{" "}
              +234-803-872-2054
            </div>
            <div className="flex gap-1 items-center">
              <MdOutlineMailOutline size={20} className="text-blue-600" />
              enochlouis1@gmail.com
            </div>
          </div>
        </div>
        <div className="hidden md:flex gap-3 items-center text-gray-500">
          <Link
            href="#register"
            className="flex gap-3 w-fit disabled:bg-indigo-300  justify-center rounded-md border border-transparent bg-indigo-600 md:py-2 md:px-4 p-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Register Now!!
          </Link>
          {isAuthenticated() ? (
            <div className="relative inline-block text-left">
              <button
                type="button"
                className="peer w-32 bg-white tracking-wide text-gray-800  rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-200 hover:text-gray-600 shadow-md py-2 px-3 inline-flex items-center"
              >
                Hi! {user.fullname.slice(0, 5)}...
              </button>

              <div
                className="hidden peer-hover:flex hover:flex absolute right-0 z-10 mt-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <div className="py-1 w-full" role="none">
                  <a
                    href="#"
                    className="text-gray-700 block w-full px-4 py-2 text-sm hover:bg-gray-100"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-0"
                  >
                    Dashboard
                  </a>

                  <button
                    onClick={logout}
                    className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-3"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-100 hover:text-gray-700 shadow-md py-2 px-6 inline-flex items-center"
            >
              Login
            </Link>
          )}
        </div>
        <div className="md:hidden ">
          {/* {isAuthenticated() ? (
            <div className="relative inline-block text-left">
              <button
                type="button"
                className="peer w-32 bg-white tracking-wide text-gray-800  rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-200 hover:text-gray-600 shadow-md py-2 px-3 inline-flex items-center"
              >
                Hi! {user.fullname.slice(0, 5)}...
              </button>

              <div
                className="hidden peer-hover:flex hover:flex absolute right-0 z-10 mt-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <div className="py-1 w-full" role="none">
                  <a
                    href="/dashboard"
                    className="text-gray-700 block w-full px-4 py-2 text-sm hover:bg-gray-100"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-0"
                  >
                    Dashboard
                  </a>

                  <button
                    onClick={logout}
                    className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-3"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative flex">
              <button className="peer p-1 border rounded border-gray-500">
                <RiMenu3Fill size={23} />
              </button>

              <div
                className="hidden peer-hover:flex hover:flex absolute right-0 z-10 mt-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <div className="py-1 w-full" role="none">
                  <Link
                    href="#register"
                    className="text-gray-700 block w-full px-4 py-2 text-sm hover:bg-gray-100"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-0"
                  >
                    Register
                  </Link>

                  <Link
                    href="/login"
                    onClick={logout}
                    className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-3"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          )} */}

          <MobileNav />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Navbar;
