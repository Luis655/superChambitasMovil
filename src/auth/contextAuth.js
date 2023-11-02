import React, { createContext, useReducer, useContext } from 'react';

const AuthContext = createContext();

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

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
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
