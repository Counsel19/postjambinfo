"use client";

import { createContext, useContext, useReducer } from "react";
import appReducer from "./appReducer";
import * as ACTIONS from "./actions";
import axios from "axios";
import instituteList from "@/utils/instituteLists";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};
let user;
let token;

if (typeof window !== "undefined") {
  user = JSON.parse(localStorage.getItem("user"));
  token = localStorage.getItem("token");
}

const allInstituteList = instituteList
  .map((item) => Object.values(item))
  .flat()
  .flatMap((item) => Object.values(item))
  .sort();

export const inintialState = {
  user: user || null,
  token: token || null,
  isLoading: false,
  isEmailSending: false,
  allInstituteList: allInstituteList,
  instituteFilter: "",
  search: "",
  sort: "latest",
  showProfile: false,
  editingSchool: null,
  showModal: false,
  numOfPages: 1,
  activeLoad: "",
  successMessage: "",
  errorMessage: "",
  page: 1,
  showDesktopDD: false,
  sortOptions: [
    { _id: "latest" },
    { _id: "oldest" },
    { _id: "a-z" },
    { _id: "z-a" },
  ],
};

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, inintialState);

  const authFetch = axios.create({
    withCredentials: true,
    baseURL: "/api/",
  });

  //request Interceptor
  authFetch.interceptors.request.use(
    (config) => {
      dispatch({ type: ACTIONS.START_LOADING });
      config.headers.Authorization = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      dispatch({ type: ACTIONS.STOP_LOADING });
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      dispatch({ type: ACTIONS.STOP_LOADING });
      return response;
    },
    (error) => {
      dispatch({ type: ACTIONS.STOP_LOADING });
      const err = error.response;
      // console.log(err);

      if (err.status === 401 || err.status === 403) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const handleSaveDetails = async ({
    fullname,
    email,
    password,
    phone,
    institutes,
  }) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });

      const { data } = await authFetch.post("/users/add", {
        fullname,
        email,
        phone,
        password,
        institutions: JSON.stringify(institutes),
      });

      const { user, token } = data;

      if (user && token) {
        dispatch({
          type: ACTIONS.LOGIN,
          payload: {
            user,
            token,
          },
        });

        addUserToLocalStorage({ user, token });
        dispatch({ type: ACTIONS.STOP_LOADING });
        return user;
      } else {
        dispatch({ type: ACTIONS.STOP_LOADING });
        throw new Error("Error");
      }
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleInfo(error?.response.data.msg, true);
      console.log(error);
    }
  };
  const initiatePayment = async ({ fullname, email }) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });

      const { data } = await authFetch.post("/payment/pay", {
        fullname,
        email,
      });

      dispatch({ type: ACTIONS.STOP_LOADING });
      return data?.url;
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      console.log(error);
    }
  };

  const verifyPayment = async (ref) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      let { data } = await authFetch.get(`/payment/verify?ref=${ref}`);

      return data;
    } catch (error) {
      console.log(error);
      dispatch({ type: ACTIONS.STOP_LOADING });
    }
  };

  const getUsers = async () => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      const { search, sort, page, instituteFilter } = state;
      let url = `/users/get/?sort=${sort}&page=${page}&instituteFilter=${instituteFilter}`;
      if (search) {
        url = url + `&search=${search}`;
      }
      const res = await authFetch.get(url);
      dispatch({ type: ACTIONS.SET_USERS, payload: { users: res.data } });

      return res.data;
    } catch (error) {
      console.log(error);
      dispatch({ type: ACTIONS.STOP_LOADING });
    }
  };

  const handleEditInstitute = async (requestObj) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });

      const { data } = await authFetch.post("/auth/edit/institute", requestObj);

      const { token } = state;

      dispatch({
        type: ACTIONS.LOGIN,
        payload: {
          user: data,
          token,
        },
      });

      addUserToLocalStorage({ user, token });

      handleInputChange("showModal", false);

      dispatch({ type: ACTIONS.STOP_LOADING });
    } catch (error) {
      handleInputChange("showModal", false);
      handleInfo(error?.response.data.msg, true);
      dispatch({ type: ACTIONS.STOP_LOADING });
    }
  };

  const handleEditProfile = async (requestObj) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });

      const { data } = await authFetch.post("/auth/edit/profile", requestObj);

      const { token } = state;

      dispatch({
        type: ACTIONS.LOGIN,
        payload: {
          user: data,
          token,
        },
      });

      addUserToLocalStorage({ user, token });

      handleInfo("Profile Update Success!");

      dispatch({ type: ACTIONS.STOP_LOADING });
    } catch (error) {
      handleInfo(error?.response.data.msg, true);
      dispatch({ type: ACTIONS.STOP_LOADING });
    }
  };

  const getUser = async () => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });

      const { data } = await authFetch.delete(`/user/`);

      const { token } = state;

      dispatch({
        type: ACTIONS.LOGIN,
        payload: {
          user: data,
          token,
        },
      });

      addUserToLocalStorage({ user, token });

      dispatch({ type: ACTIONS.STOP_LOADING });
    } catch (error) {
      handleInfo(error?.response.data.msg, true);
      dispatch({ type: ACTIONS.STOP_LOADING });
    }
  };

  const handleDeleteInstitution = async (institutionId) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });

      const { data } = await authFetch.delete(
        `/auth/delete/institution?institutionId=${institutionId}`
      );

      await getUser();

      addUserToLocalStorage({ user, token });

      handleInfo(data.msg);

      dispatch({ type: ACTIONS.STOP_LOADING });
    } catch (error) {
      handleInfo(error?.response.data.msg, true);
      dispatch({ type: ACTIONS.STOP_LOADING });
    }
  };

  const logout = () => {
    dispatch({ type: ACTIONS.LOGOUT });
    removeUserFromLocalStorage();
  };

  const login = async (data) => {
    try {
      dispatch({ type: ACTIONS.START_LOADING });
      const res = await axios.post("/api/auth/login", data);
      const { user, token } = res.data;

      dispatch({
        type: ACTIONS.LOGIN,
        payload: {
          user,
          token,
        },
      });

      addUserToLocalStorage({ user, token });
      dispatch({ type: ACTIONS.STOP_LOADING });
      return user;
    } catch (error) {
      // console.log(error, "true");
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleInfo(error.response.data.msg, true);
    }
  };

  const isAuthenticated = () => {
    const { user, token } = state;

    if (user && token) return true;
    return false;
  };
  const isAuthenticatedAsAdmin = () => {
    const { user, token } = state;
    if (user && user.isAdmin && token) return true;
    return false;
  };

  const handleInputChange = (name, value) => {
    dispatch({ type: ACTIONS.HANDLE_CHANGE, payload: { name, value } });
  };

  const clearFilters = () => {
    dispatch({ type: ACTIONS.CLEAR_FILTERS });
  };

  const clearMessage = () => {
    dispatch({ type: ACTIONS.CLEAR_MESSAGE });
  };

  const handleInfo = (info, error) => {
    if (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: { errorMessage: info },
      });
    } else {
      dispatch({
        type: ACTIONS.SET_SUCCESS,
        payload: { successMessage: info },
      });
    }

    setTimeout(() => {
      clearMessage();
    }, 5000);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        getUsers,
        login,
        logout,
        handleInfo,
        handleDeleteInstitution,
        isAuthenticated,
        handleEditInstitute,
        handleEditProfile,
        isAuthenticatedAsAdmin,
        clearMessage,
        handleSaveDetails,
        initiatePayment,
        verifyPayment,
        handleInputChange,
        clearFilters,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
