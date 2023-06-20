import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth } from "../FirebaseConfig";
import authReducer, { authInitialState } from "../reducers/authReducer";

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    });
    return () => unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, authDispatch, currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
