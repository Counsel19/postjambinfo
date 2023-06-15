"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoIosAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io";
import ShortUniqueId from "short-unique-id";
import instituteLists from "@/utils/instituteLists";
import { useAppContext } from "@/context/AppContext";
import { TailSpin } from "react-loader-spinner";
import { useRouter } from "next/navigation";

const state = instituteLists.map((item) => Object.keys(item)[0]);

const Register = () => {
  const [data, setData] = useState([]);
  const [focusIndex, setFocusIndex] = useState(-1);
  const stateResultContainer = useRef(null);
  const resultContainer = useRef(null);
  const [stateResults, setStateResults] = useState([]);
  const [results, setResults] = useState([]);
  const [showStateResults, setShowStateResults] = useState([]);
  const [showResults, setShowResults] = useState();
  const [activeInput, setActiveInput] = useState("");
  const [instituteValue, setInstituteValue] = useState([
    { id: new ShortUniqueId({ length: 10 })(), value: "", state: "" },
  ]);
  const [selectedProfile, setSelectedProfile] = useState();
  const [input, setInput] = useState({
    fullname: "",
    phone: "",
    email: "",
    password: "",
  });
  const { initiatePayment, isLoading, handleInfo, errorMessage, clearMessage } =
    useAppContext();
  const uid = new ShortUniqueId({ length: 10 });
  const router = useRouter();

  useEffect(() => {
    if (!resultContainer.current) return;

    resultContainer.current.scrollIntoView({
      block: "center",
    });
  }, [focusIndex]);

  useEffect(() => {
    if (results.length > 0 && !showResults) setShowResults(true);

    if (results.length <= 0) setShowResults(false);
  }, [results]);

  useEffect(() => {
    if (stateResults.length > 0 && !showStateResults) setShowStateResults(true);

    if (stateResults.length <= 0) setShowStateResults(false);
  }, [stateResults]);

  useEffect(() => {
    if (selectedProfile) {
      const curentValues = instituteValue.map((item) => {
        return item.id === selectedProfile.id
          ? {
              id: item.id,
              state: selectedProfile.state,
              value: selectedProfile.value,
            }
          : item;
      });
      setInstituteValue(curentValues);
    }
  }, [selectedProfile]);

  const resetSearchComplete = useCallback((inputSpec) => {
    setFocusIndex(-1);
    setShowResults(false);
    if (inputSpec !== "institution") setShowStateResults(false);
  }, []);

  const handleSelection = (selectedIndex, item, inputSpec) => {
    let selectedItem;

    if (inputSpec === "institution") {
      selectedItem = results[selectedIndex];

      if (!selectedItem) return resetSearchComplete(inputSpec);
      setSelectedProfile({
        id: item.id,
        state: item.state,
        value: selectedItem,
      });
      resetSearchComplete(inputSpec);
    } else {
      selectedItem = stateResults[selectedIndex];

      if (!selectedItem) return resetSearchComplete(inputSpec);
      setSelectedProfile({ id: item.id, state: selectedItem, value: "" });
      resetSearchComplete(inputSpec);

      let current = [];
      instituteLists.filter((institute) => {
        Object.keys(institute)[0] === selectedItem
          ? current.push(institute[selectedItem])
          : null;
      });

      setData(Object.values(current[0]));
    }
  };

  const handleKeyDown = (e, item, inputSpec) => {
    const { key } = e;
    let nextIndexCount = 0;

    if (key === "ArrowDown") {
      nextIndexCount = (focusIndex + 1) % results.length;
    }
    if (key === "ArrowUp") {
      nextIndexCount = (focusIndex + results.length - 1) % results.length;
    }
    if (key === "Escape") {
      resetSearchComplete();
    }
    if (key === "Enter") {
      e.preventDefault();
      handleSelection(focusIndex, item, inputSpec);
    }

    setFocusIndex(nextIndexCount);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleChange = (e, id) => {
    e.preventDefault();
    setActiveInput(id);
    const curentValues = instituteValue.map((item) =>
      item.id === id
        ? { id: id, state: item.state, value: e.target.value }
        : item
    );
    setInstituteValue(curentValues);
    const { target } = e;
    if (!target.value.trim()) return setResults([]);

    const filteredValue = data.filter(
      (item) => item.toLowerCase().indexOf(target.value.toLowerCase()) > -1
    );
    setResults(filteredValue);
  };

  const handleStateChange = (e, id) => {
    e.preventDefault();
    setActiveInput(id);
    const curentValues = instituteValue.map((item) =>
      item.id === id
        ? { id: id, state: e.target.value, value: item.value }
        : item
    );
    setInstituteValue(curentValues);
    const { target } = e;
    if (!target.value.trim()) return setStateResults([]);

    const filteredValue = state.filter(
      (item) => item.toLowerCase().indexOf(target.value.toLowerCase()) > -1
    );
    setStateResults(filteredValue);
  };

  const clearValue = (e, inputType, id) => {
    e.stopPropagation();
    const currentValue = instituteValue.map((item) => {
      if (item.id === id) {
        return { ...item, [inputType]: "" };
      } else return item;
    });
    setInstituteValue(currentValue);
  };

  const addInstitute = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (instituteValue.length < 6) {
      setInstituteValue([
        ...instituteValue,
        { id: uid(), state: "", value: "" },
      ]);
    } else handleInfo("You can only add six(6) Schools", true);
  };

  const removeInstitute = (e, id) => {
    e.preventDefault();
    e.preventDefault();
    setInstituteValue(instituteValue.filter((item) => item.id !== id));
  };

  const handleInitPayment = async () => {
    const payload = {
      fullname: input.fullname,
      email: input.email,
      phone: input.phone,
      institutes: instituteValue.map((item) => ({
        state: item.state,
        institution: item.value,
      })),
    };
    const url = await initiatePayment(payload);

    if (url) {
      router.push(url);
    }
  };

  return (
    <div
      id="register"
      className=" py-6 md:px-20 px-4 bg-gray-100 flex items-center justify-center"
    >
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
      <div className="">
        <div className="w-full mb-6 flex flex-col items-center justify-center">
          <p className="tracking-wider uppercase text-xl font-bold leading-none text-center sm:text-2xl ">
            Register Here
          </p>
          <p className=" text-gray-500 tracking-wider text-center mb-6">
            Start Receiving SMS Notification as it is happening
          </p>
        </div>

        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div className="flex w-full items-center justify-center py-3 bg-blue-200 text-lg font-bold text-gray-600 mb-8">
            Registration cost only N500
          </div>
          <div className="grid gap-12 gap-y-2 text-sm  grid-cols-1 lg:grid-cols-5 items-center">
            <div className="md:col-span-3 grid gap-4 gap-y-6 text-sm grid-cols-1 md:grid-cols-6 items-center">
              <div className="md:col-span-3">
                <label htmlFor="full_name">Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  placeholder="Enter Full Name"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  value={input.fullname}
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:col-span-3">
                <label htmlFor="city">Phone</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  value={input.phone}
                  onChange={handleInputChange}
                  placeholder="Phone"
                />
              </div>

              <div className="md:col-span-3">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  value={input.email}
                  onChange={handleInputChange}
                  placeholder="email@domain.com"
                />
              </div>

              <div className="md:col-span-3">
                <label htmlFor="city">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  value={input.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                />
              </div>

              <div className="md:col-span-6 ">
                <label htmlFor="institution">Institutions: </label>
                {instituteValue?.map((institute, pIndex) => (
                  <div
                    tabIndex={1}
                    key={institute.id}
                    onBlur={resetSearchComplete}
                    className="relative w-full grid md:grid-cols-6 gap-4 mb-3 items-center"
                  >
                    <div
                      onKeyDown={(e) => handleKeyDown(e, institute, "state")}
                      className="w-full h-10 md:col-span-2 bg-gray-50 flex border border-gray-200 rounded items-center mt-1 "
                    >
                      <input
                        name="state"
                        id="state"
                        placeholder="Enter State"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                        value={institute?.state}
                        onChange={(e) => handleStateChange(e, institute?.id)}
                      />
                      <button
                        tabIndex="-1"
                        onClick={(e) => clearValue(e, "state", institute?.id)}
                        className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600"
                      >
                        <svg
                          className="w-4 h-4 mx-2 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>

                    <div
                      onKeyDown={(e) =>
                        handleKeyDown(e, institute, "institution")
                      }
                      className="w-full h-10 md:col-span-3 bg-gray-50 flex border border-gray-200 rounded items-center mt-1 "
                    >
                      <input
                        name="institution"
                        id="institution"
                        placeholder="Enter your Institution"
                        className="px-4 outline-none text-gray-800 w-full bg-transparent"
                        value={institute?.value}
                        onChange={(e) => handleChange(e, institute?.id)}
                      />
                      <button
                        tabIndex="-1"
                        onClick={(e) => clearValue(e, "value", institute.id)}
                        className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600"
                      >
                        <svg
                          className="w-4 h-4 mx-2 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>

                    <div className="absolute grid md:grid-cols-6 gap-4 md:top-full right-0 left-0 z-40">
                      {showStateResults && activeInput === institute?.id ? (
                        <ul className=" mt-1 md:col-span-2 w-full p-2 bg-white shadow-lg rounded-bl rounded-br max-h-56 overflow-y-auto">
                          {stateResults.map((item, index) => (
                            <li
                              onMouseDown={() =>
                                handleSelection(index, institute, "state")
                              }
                              ref={
                                index == -focusIndex
                                  ? stateResultContainer
                                  : null
                              }
                              key={index}
                              style={{
                                backgroundColor:
                                  index === focusIndex ? "rgba(0,0,0,0.1)" : "",
                              }}
                              className="cursor-pointer hover:bg-black hover:bg-opacity-10 p-2"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="hidden md:block mt-1 md:col-span-2 w-full -z-10"></div>
                      )}

                      {showResults && activeInput === institute?.id ? (
                        <ul className=" mt-52 md:mt-1 md:col-span-3 w-full p-2 bg-white shadow-lg rounded-bl rounded-br max-h-56 overflow-y-auto">
                          {results.map((item, index) => (
                            <li
                              onMouseDown={() =>
                                handleSelection(index, institute, "institution")
                              }
                              ref={
                                index == -focusIndex ? resultContainer : null
                              }
                              key={index}
                              style={{
                                backgroundColor:
                                  index === focusIndex ? "rgba(0,0,0,0.1)" : "",
                              }}
                              className="cursor-pointer hover:bg-black hover:bg-opacity-10 p-2"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="hidden md:block mt-1 md:col-span-1 w-full -z-10"></div>
                      )}
                    </div>

                    <div className="col-span-1">
                      <button
                        onClick={addInstitute}
                        style={
                          instituteValue.length - 1 <= pIndex
                            ? { display: "flex" }
                            : { display: "none" }
                        }
                        className="bg-white w-full h-fit px-3 py-2 font-semibold shadow-md rounded-lg items-center justify-center gap-2 text-blue-800"
                      >
                        <IoIosAddCircleOutline size={20} />
                      </button>
                      <button
                        onClick={(e) => removeInstitute(e, institute.id)}
                        style={
                          instituteValue.length - 1 > pIndex
                            ? { display: "flex" }
                            : { display: "none" }
                        }
                        className="bg-white w-full h-fit px-3 py-2 font-semibold shadow-md rounded-lg items-center justify-center gap-2 text-rose-800"
                      >
                        <IoMdRemoveCircleOutline size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="md:col-span-6 my-10 lg:mb-0 text-right">
                <div className="inline-flex items-end">
                  <button
                    onClick={handleInitPayment}
                    disabled={isLoading}
                    className="bg-blue-500 w-52 flex justify-center items-center gap-2 hover:bg-blue-700 text-white font-bold py-3 px-6 text-lg rounded disabled:bg-blue-200"
                  >
                    Submit
                    {isLoading && <TailSpin height="20" width="20" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full  md:col-span-2 rounded-2xl">
              <div className="relative py-3">
                <div className="absolute lg:inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative flex items-center justify-center px-8 py-10 bg-white shadow-lg sm:rounded-3xl">
                  <div>
                    <h1 className="text-xl font-semibold mb-3">
                      Do you know????
                    </h1>
                    <p>
                      Do you know how much you can spend to travel to all your
                      6schools weekly to get latest information may be close to
                      N30,000. But for Only N500, we get it for you and send to
                      you quickly and accurately.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
