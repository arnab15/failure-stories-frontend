/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import jwtDecode from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService";

const Authcontext = createContext({
  currentUser: null,
  logout() {},
  isAuthenticated: false,
  setCurrentUser(user) {},
  authLoading: false,
});
Authcontext.displayName = "AuthContext";

function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [authLoading, setAuthLoading] = useState(false);
  const handelRefrshToken = async () => {
    try {
      const { data } = await authService.getRefreshedToken();
      if (data.accessToken) {
        localStorage.setItem("_accessToken", data.accessToken);
        const decodedData = jwtDecode(data.accessToken);
        setCurrentUser(decodedData);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAuthLoading(true);
      const accessToken = localStorage.getItem("_accessToken");
      if (accessToken) {
        try {
          const decodedData = jwtDecode(accessToken);
          const currentTime = new Date().getTime() / 1000;
          if (currentTime > decodedData.exp) {
            handelRefrshToken();
            setAuthLoading(false);
            return console.log("Token refreshed");
          }
          setCurrentUser(decodedData);
          setAuthLoading(false);
        } catch (error) {
          console.log("error decoding token auth context");
        }
      }
    }
  }, []);
  return (
    <Authcontext.Provider
      value={{
        isAuthenticated: !!currentUser,
        currentUser,
        setCurrentUser,
        authLoading,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
}

export default AuthContextProvider;

export const useAuth = () => useContext(Authcontext);
