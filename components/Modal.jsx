"use client";

import { IoCloseSharp } from "react-icons/io5";
import { useCallback, useEffect, useRef, useState } from "react";
import instituteLists from "@/utils/instituteLists";
import { useAppContext } from "@/context/AppContext";
import { TailSpin } from "react-loader-spinner";

const state = instituteLists.map((item) => Object.keys(item)[0]);

const Modal = () => {
  const { editingSchool, handleEditInstitute, isLoading, handleInputChange } =
    useAppContext();
  const [data, setData] = useState([]);
  const [focusIndex, setFocusIndex] = useState(-1);
  const resultContainer = useRef(null);
  const stateResultContainer = useRef(null);
  const [results, setResults] = useState([]);
  const [stateResults, setStateResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showStateResults, setShowStateResults] = useState(false);
  const [instituteValue, setInstituteValue] = useState({
    id: editingSchool._id,
    value: editingSchool.institution,
    state: editingSchool.state,
  });
  const [selectedProfile, setSelectedProfile] = useState();

  useEffect(() => {
    let current = [];
    instituteLists.filter((institute) => {
      Object.keys(institute)[0] === editingSchool.state
        ? current.push(institute[editingSchool.state])
        : null;
    });

    setData(Object.values(current[0]));
  }, [])

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
      setInstituteValue({
        ...instituteValue,
        state: selectedProfile.state,
        value: selectedProfile.value,
      });
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

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleChange = (e) => {
    e.preventDefault();

    setInstituteValue({ ...instituteValue, value: e.target.value });
    const { target } = e;
    if (!target.value.trim()) return setResults([]);

    const filteredValue = data.filter((item) =>
      item.toLowerCase().startsWith(target.value.toLowerCase())
    );
    setResults(filteredValue);
  };

  const handleStateChange = (e) => {
    e.preventDefault();

    setInstituteValue({ ...instituteValue, state: e.target.value });
    const { target } = e;
    if (!target.value.trim()) return setStateResults([]);

    const filteredValue = state.filter((item) =>
      item.toLowerCase().startsWith(target.value.toLowerCase())
    );
    setStateResults(filteredValue);
  };

  const clearValue = (e, inputType,) => {
    e.stopPropagation();

    setInstituteValue({ ...instituteValue, [inputType]: "" });
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-700 bg-opacity-50 fixed top-0 right-0 left-0 bottom-0">
      
      <div className="flex flex-col px-6 py-16 md:p-16  width-1/2 h-fit rounded-lg shadow bg-white relative">
      <span>
        <IoCloseSharp
          className="absolute top-6 right-6 cursor-pointer text-rose-600"
          size={30}
          onClick={() => handleInputChange("showModal", false)}
        />
      </span>
        
        <div className="flex flex-col items-center gap-4">
          <div className="md:col-span-6 ">
            <label
              className="font-semibold mb-6 text-lg text-gray-700"
              htmlFor="institution"
            >
              Edit Institution:
            </label>
            <div
                tabIndex={1}
                key={instituteValue.id}
                onBlur={resetSearchComplete}
                className="relative w-full grid lg:grid-cols-6 gap-4 mb-3 items-center"
              >
                <div
                  onKeyDown={(e) => handleKeyDown(e, instituteValue, "state")}
                  className="w-full h-10 md:col-span-2 bg-gray-50 flex border border-gray-200 rounded items-center mt-1 "
                >
                  <input
                    name="state"
                    id="state"
                    placeholder="Enter State"
                    className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                    value={instituteValue?.state}
                    onChange={(e) => handleStateChange(e)}
                  />
                  <button
                    tabIndex="-1"
                    onClick={(e) => clearValue(e, "state",)}
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
                  onKeyDown={(e) => handleKeyDown(e, instituteValue, "institution")}
                  className="w-full h-10 md:col-span-3 bg-gray-50 flex border border-gray-200 rounded items-center mt-1 "
                >
                  <input
                    name="institution"
                    id="institution"
                    placeholder="Enter your Institution"
                    className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                    value={instituteValue?.value}
                    onChange={(e) => handleChange(e)}
                  />
                  <button
                    tabIndex="-1"
                    onClick={(e) => clearValue(e, "value")}
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

                <div className="absolute grid md:grid-cols-6 gap-4 top-full right-0 left-0">
                  {showStateResults ? (
                    <ul className=" mt-1 md:col-span-2 w-full p-2 bg-white shadow-lg rounded-bl rounded-br max-h-56 overflow-y-auto">
                      {stateResults.map((item, index) => (
                        <li
                          onMouseDown={() =>
                            handleSelection(index, instituteValue, "state")
                          }
                          ref={
                            index == -focusIndex ? stateResultContainer : null
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
                    <div className="mt-1 md:col-span-2 w-full"></div>
                  )}

                  {showResults && (
                    <ul className="md:col-span-3 mt-1 w-full p-2 bg-white shadow-lg rounded-bl rounded-br max-h-56 overflow-y-auto">
                      {results.map((item, index) => (
                        <li
                          onMouseDown={() =>
                            handleSelection(index, instituteValue, "institution")
                          }
                          ref={index == -focusIndex ? resultContainer : null}
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
                  )}
                  <div className="mt-1 md:col-span-1 w-full"></div>
                </div>

                <div className="md:col-span-1 text-right">
                  <div className="inline-flex items-end">

                    <button
                      onClick={() => handleEditInstitute(instituteValue)}
                      disabled={isLoading}
                      className="bg-blue-500 flex items-center gap-2 hover:bg-blue-700 text-white font-bold py-3 px-6 text-lg rounded disabled:bg-blue-200"
                    >
                      Submit
                      {isLoading && <TailSpin height="20" width="20" />}
                    </button>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
