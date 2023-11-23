import React, { createContext, useReducer, useContext, useState } from "react";
import { useMemo } from "react";
import { useColorScheme } from "react-native";
import { jwtDecode } from "jwt-decode";
export const AuthContext = createContext();
const DarkModeContext = createContext();
const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload, logged: true };
    case "LOG_OUT":
      return { logged: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const initialState = {
    token: "",
    refreshToken: "",
    logged: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  const [colorMode, setDarkColorMode] = useState(useColorScheme() === "light");
  const setUser = ({token, refreshToken}) => {
    console.log(token);
    const user= jwtDecode(token)
    const action = {
      type: "SET_USER",
      payload: {
        user,
        token,
        refreshToken,
        logged: true,
      },
    };
    dispatch(action);
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
