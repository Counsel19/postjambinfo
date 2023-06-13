"use client";

import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { TailSpin } from "react-loader-spinner";
import { useRouter } from "next/navigation";

const Login = () => {
  const {
    login,
    user,
    isAuthenticated,
    isLoading,
    errorMessage,
    clearMessage,
  } = useAppContext();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  useEffect(() => {
    const auth = isAuthenticated();
    if (auth) {
      if (user.isAdmin) {
        return router.push("/admin");
      } else {
        return router.push("/dashboard");
      }
    }
  }, [user]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(input);
    console.log(user, "user");
    if (user && user.isAdmin) {
      router.push("/admin");
    } else if (user) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="w-full py-10 flex items-center justify-center bg-gray-100">
      <div className="md:w-2/6 bg-white shadow-md rounded px-8 py-10 ">
        <h3 className="mb-5  text-2xl font-semibold  text-gray-500 text-center">
          Login Here!
        </h3>
        {errorMessage ? (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded flex items-center justify-between gap-4 mb-6"
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
        <form className=" w-full h-full  mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={input.email}
              placeholder="Email address"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="***********"
              name="password"
              value={input.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-indigo-500 disabled:bg-indigo-300  flex items-center justify-center gap-2 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isLoading}
            >
              Login
              {isLoading && <TailSpin height={20} width={20} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
