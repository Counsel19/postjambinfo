"use client";

import React, { useState } from "react";
import { BsPhone } from "react-icons/bs";
import { MdOutlineMailOutline } from "react-icons/md";
import Image from "next/image";
import { FaUserEdit } from "react-icons/fa";
import { useAppContext } from "@/context/AppContext";
import { TailSpin } from "react-loader-spinner";

const Profile = ({ user }) => {
  const { handleEditProfile, isLoading } = useAppContext();
  const [input, setInput] = useState({
    id: user._id,
    fullname: user.fullname,
    phone: user.phone,
    email: user.email,
  });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput({ ...input, [name]: value });
  };

  const handleEdit = async () => {
    await handleEditProfile(input);
    setEditMode(false);
  };
  return (
    <div>
      {user ? (
        <div className="grid md:grid-cols-2 gap-4 rounded-md shadow-md">
          <div className="relative col-span-1 flex items-center justify-center">
            <Image
              src="/images/profile.svg"
              width={400}
              height={500}
              alt="user profile"
            />
            <h3 className="text-white font-bold text-2xl bg-gray-900 bg-opacity-50 absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center">
              User Personal Profile
            </h3>
          </div>
          <div className="col-span-1 px-6 py-8 relative">
            {editMode ? (
              <div>
                <div className="mb-4 grid grid-cols-3 items-center">
                  <label
                    className="block col-span-1 text-gray-700 text-sm font-bold mb-2"
                    htmlFor="fullname"
                  >
                    Full Name
                  </label>
                  <input
                    className=" col-span-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="fullname"
                    type="text"
                    name="fullname"
                    value={input.fullname}
                    placeholder="Full Name"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4 grid grid-cols-3 items-center">
                  <label
                    className="col-span-1 block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="col-span-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="fullname"
                    type="email"
                    name="email"
                    value={input.email}
                    placeholder="Email"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4 grid grid-cols-3 items-center">
                  <label
                    className="col-span-1 block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="fullname"
                  >
                    Phone
                  </label>
                  <input
                    className="col-span-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="fullname"
                    type="text"
                    name="phone"
                    value={input.phone}
                    placeholder="Phone"
                    onChange={handleChange}
                  />
                </div>

                <div className="mt-6 flex justify-center w-full items-center gap-6">
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-3 py-2 rounded bg-rose-500 text-white hover:bg-rose-600"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={isLoading}
                    onClick={handleEdit}
                    className="flex items-center gap-2 px-3 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300"
                  >
                    Save
                    {isLoading && <TailSpin height={20} width={20} />}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setEditMode(true)}
                  className="absolute  top-4 right-4 border border-blue-700 p-2 rounded"
                >
                  <FaUserEdit className="text-blue-700" size={24} />
                </button>
                <h3 className="text-lg font-semibold mb-10">{user.fullname}</h3>

                <div className=" flex gap-4 items-center mb-6">
                  <div className="border border-amber-400 p-1 rounded">
                    <MdOutlineMailOutline
                      size={22}
                      className="text-amber-600"
                    />
                  </div>
                  <span>{user.email}</span>
                </div>
                <div className=" flex gap-4 items-center mb-6">
                  <div className="border border-amber-400 p-1 rounded">
                    <BsPhone size={22} className="text-amber-600" />
                  </div>
                  <span>{user.phone}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <TailSpin />
      )}
    </div>
  );
};

export default Profile;
