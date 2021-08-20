import React, { useReducer, useState, useEffect } from "react";
import { sendRequest } from "../utils/axios";
import { API_URL } from "./constants";
import authReducer from "../reducers/authReducer";

import { useHistory } from "react-router";
import axios from "axios";
export const AuthContext = React.createContext();
function AuthContextProvider({ children }) {
  //
  const history = useHistory();
  //
  const [authState, dispatch] = useReducer(authReducer, {
    isLoading: true,
    isAuthenticated: false,
    user: {},
  });
  const [notification, setNotification] = useState({
    isShown: false,
    content: "",
    type: "",
  });

  //LOGIN
  const userLogin = async (username, password) => {
    try {
      const res = await sendRequest(API_URL + "/login", "POST", {
        username,
        password,
      });
      if (res.data.isSuccess) {
        localStorage.setItem("USER_TOKEN", res.data.userToken);
        dispatch({
          type: "SET_AUTH_SUCCESS",
          payload: { user: res.data.user },
        });
        setNotification({
          isShown: true,
          content: "Login successfully !!!",
          type: "success",
        });
        return history.push("/home");
      }
    } catch (err) {
      console.log({ err });
      //   console.log(err.response.data);
      dispatch({
        type: "SET_AUTH_FALSE",
        payload: {},
      });
      setNotification({
        isShown: true,
        content: err.response.data.error,
        type: "danger",
      });
      setTimeout(() => {
        setNotification({ isShown: false, ...notification });
      }, 5000);
    }
  };

  //REGISTER
  const userRegister = async (username, password) => {
    try {
      const res = await sendRequest(API_URL + "/register", "POST", {
        username,
        password,
      });
      if (res.data.isSuccess) {
        setNotification({
          isShown: true,
          content: "Sign up successfully !!!",
          type: "success",
        });
      }
      return history.push("/login");
    } catch (err) {
      setNotification({
        isShown: true,
        content: err.response.data.error,
        type: "danger",
      });
      setTimeout(() => {
        setNotification({ isShown: false, ...notification });
      }, 5000);
    }
  };
  //VERIFY USER
  const userVerify = async () => {
    if (!localStorage.getItem("USER_TOKEN"))
      return dispatch({ type: "SET_AUTH_FAIL", payload: {} });
    try {
      axios.defaults.headers.common["Authorization"] =
        localStorage.getItem("USER_TOKEN");
      const res = await axios({
        method: "GET",
        url: `${API_URL}/verifyUser`,
      });
      if (res.data.isSuccess) {
        dispatch({
          type: "SET_AUTH_SUCCESS",
          payload: { user: res.data.user },
        });
      }
      // const res=await sendRequest(`${API_URL}`)
    } catch (error) {
      console.log(error);
      localStorage.removeItem("USER_TOKEN");
      dispatch({ type: "SET_AUTH_FAIL", payload: {} });
    }
  };
  useEffect(() => userVerify(), []);
  //DATA)
  const authContextData = {
    userLogin,
    authState,
    notification,
    setNotification,
    userRegister,
  };
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
