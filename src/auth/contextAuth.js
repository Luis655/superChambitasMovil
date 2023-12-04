import React, { createContext, useReducer, useContext, useState, useMemo } from "react";
import { useColorScheme } from "react-native";
import storage from 'expo-storage';
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
      return { ...state,logged: false };
    
  }
};
const init = () => {
  let data
  storage.getItem("userData").then((userData)=>{
    data = userData
    ? JSON.parse(userData)
    : "";
  })
  return {
    ...data
  };
  

    
};
const initialState = {
  logged: false,
  profile: "",
  user: null,
  token: "",
  refreshToken: "",
};
export const AuthProvider = ({ children }) => {

  const [state, dispatch] = useReducer(authReducer, initialState,init);
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
   try {
    const dataSave= JSON.stringify(action.payload)
    await storage.setItem('userData', dataSave)
   } catch (error) {
    console.warn(error);
   }

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
    AsyncStorage.removeItem('userData')
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
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export const useDarkMode = () => {
  const isDarkMode = useContext(DarkModeContext);
  return isDarkMode;
};
