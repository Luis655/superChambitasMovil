import React, { createContext, useReducer, useContext, useState } from "react";
import { useMemo } from "react";
import { useColorScheme } from "react-native";
import { jwtDecode } from "./jwtDecode";
import { scheduleNotificationAsync } from 'expo-notifications';
import * as Crypto from 'expo-crypto';
export const AuthContext = createContext();
const DarkModeContext = createContext();
const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, ...action.payload, logged: true };
    case "LOG_OUT":
      return { logged: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const initialState = {
    logged: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  const [colorMode, setDarkColorMode] = useState(useColorScheme() === "dark");
  const setUser = async ({ token, refreshToken }) => {
    const user = jwtDecode(token);
    const hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256, user.email);
    const action = {
      type: "SET_USER",
      payload: {
        profile: `https://gravatar.com/avatar/${hash}`,
        user,
        token,
        refreshToken,
        logged: true,
      },
    };
    dispatch(action);
    await scheduleNotificationAsync({
      identifier: Math.random().toString(),
      content: {
        title: "Bienvenido a SuperChambitas " + user.userName,
      },
      trigger: null,
    });
  };
  const logout = () => {
    const action = {
      type: "LOG_OUT",
    };

    dispatch(action);
  };
  const contextValue = useMemo(
    () => ({ ...state, dispatch, setUser, logout }),
    [state]
  );
  return (
    <AuthContext.Provider value={contextValue}>
      <DarkModeContext.Provider value={{ colorMode, setDarkColorMode }}>
        {children}
      </DarkModeContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  // if (!context) {
  //   throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  // }
  return context;
};

export const useDarkMode = () => {
  const isDarkMode = useContext(DarkModeContext);
  return isDarkMode;
};
