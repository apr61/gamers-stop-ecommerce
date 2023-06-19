import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { auth } from "../FirebaseConfig";
import authReducer, { authInitialState } from "../reducers/authReducer";

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      authDispatch({ type: "SET_CURRENT_USER", payload: user });
    });
    return () => unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
