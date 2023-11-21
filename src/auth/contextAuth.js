import React, { createContext, useReducer, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';

const AuthContext = createContext();
const DarkModeContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_TOKEN':
      return { ...state, token: action.payload };
    case 'SET_TYPE':
      return { ...state, type: action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const initialState = {
    user: '',
    password: '',
    token: '',
    type: ''
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  const [colorMode, setDarkColorMode] = useState(useColorScheme() === 'light');


  return (
    <AuthContext.Provider value={{ state, dispatch }}>
            <DarkModeContext.Provider value={{colorMode, setDarkColorMode}}>
              {children}
            </DarkModeContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const useDarkMode = () => {
  const isDarkMode = useContext(DarkModeContext);
  return isDarkMode;
};
