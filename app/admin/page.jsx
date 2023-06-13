"use client";

import { useAppContext } from "@/context/AppContext";
import { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import SearchContainer from "@/components/SearchContainer";
import { useRouter } from "next/navigation";

const Admin = () => {
  const {
    getUsers,
    user,
    successMessage,
    handleInfo,
    clearMessage,
    search,
    allUsers,
    instituteFilter,
    sort,
    isAuthenticatedAsAdmin,
  } = useAppContext();

  const router = useRouter();

  useEffect(() => {
    const auth = isAuthenticatedAsAdmin();
    if (!auth) router.push("/login");
  }, [user]);

  useEffect(() => {
    const getData = async () => {
      await getUsers();
    };

    getData();
  }, [search, instituteFilter, sort]);

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = (contact) => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(contact)
      .then(() => {
        // If successful, update the isCopied state value
        handleInfo("Contact Copied to Clipboard ");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="sm:p-10 md:px-20 px-4 bg-gray-50 ">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">All Users</h1>
        <h2 className="text-gray-600 ml-0.5">
          List of all current registered Users
        </h2>
      </div>

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

      <div className="mt-0 mb-4 py-4 overflow-x-auto relative shadow-md sm:rounded-lg bg-white  flex-1">
        <div className="w-full px-6">
          <SearchContainer />
        </div>
      </div>

      <div className="mt-0 py-4 overflow-x-auto relative shadow-md sm:rounded-lg bg-white  flex-1">
        {allUsers ? (
          <div className="my-0  px-2 py-4">
            <div className="flex items-center justify-between mb-5"></div>
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-sm text-blue-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="py-5 px-3">
                    S/N
                  </th>
                  <th scope="col" className="py-5 px-3">
                    Avatar
                  </th>
                  <th scope="col" className="py-5 px-3">
                    Fullname
                  </th>

                  <th scope="col" className="py-5 px-3">
                    Email
                  </th>

                  <th scope="col" className="py-5 px-3">
                    Phone
                  </th>
                  <th scope="col" className="py-5 px-3">
                    State
                  </th>
                  <th scope="col" className="py-5 px-3">
                    Institution
                  </th>

                  <th scope="col" className="py-5 px-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {allUsers.users.length === 0 ? (
                  <tr className="text-center font-bold text-xl py-4 px-3">
                    <td colSpan={5} className="py-4 px-3">
                      No Users Yet
                    </td>
                  </tr>
                ) : (
                  allUsers.users.map((item, index) => (
                    <tr key={item._id} className="bg-white border-b">
                      <td className="py-4 px-3">{index + 1}</td>

                      <td className="py-4 px-3">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyWLjkYKGswBE2f9mynFkd8oPT1W4Gx8RpDQ&usqp=CAU"
                          alt={item.firstname}
                          className="h-10 w-10 rounded-full object-cover overflow-hidden"
                        />
                      </td>
                      <td className="py-4 px-3">{item.fullname}</td>

                      <td className="py-4 px-3">{item.email}</td>
                      <td className="py-4 px-3">{item.phone}</td>

                      <td className="py-4 px-3">
                        <ul>
                          {item.institutions.map((item, index) => (
                            <li key={index} className="mb-1">
                              {item.state}
                            </li>
                          ))}
                        </ul>
                      </td>

                      <td className="py-4 px-3">
                        <ul>
                          {item.institutions.map((item, index) => (
                            <li key={index} className="mb-1">
                              {item.institution}
                            </li>
                          ))}
                        </ul>
                      </td>

                      <td className="py-4 px-3">
                        <button
                          onClick={() => handleCopyClick(item.phone)}
                          className="mr-2 font-medium bg-white text-blue-900 p-1 rounded border border-blue-900 hover:bg-gray-100"
                        >
                          Copy Contact
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <TailSpin />
        )}
      </div>
    </div>
  );
};

export default Admin;
