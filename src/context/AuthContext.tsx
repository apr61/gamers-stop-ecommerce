import { User, onAuthStateChanged } from "firebase/auth";
import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { auth } from "../FirebaseConfig";
import authReducer from "../reducers/authReducer";

export type AuthContextType = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  authState: AuthStateType;
  authDispatch: React.Dispatch<ReducerAction>;
  isLoading: boolean
};

export type AuthStateType = {
  email: string;
  password: string;
  name: string;
  cpassword: string;
  error: string;
};

export const AUTH_REDUCER_ACTION_TYPES = {
  EMAIL: "EMAIL",
  PASSWORD: "PASSWORD",
  NAME: "NAME",
  ERROR: "ERROR",
  CPASSWORD: "CPASSWORD",
};

export type AuthReducerType = typeof AUTH_REDUCER_ACTION_TYPES;

export type ReducerAction = {
  type: string;
  payload: string;
};

const authInitialState: AuthStateType = {
  email: "",
  name: "",
  password: "",
  cpassword: "",
  error: "",
};

const initialAuthContext: AuthContextType = {
  currentUser: null,
  setCurrentUser: () => {},
  authDispatch: () => {},
  authState: authInitialState,
  isLoading: true
};

const AuthContext = createContext<AuthContextType>(initialAuthContext);

export function useAuthContext() {
  return useContext(AuthContext);
}

type ChildrenType = {
  children: ReactElement | ReactElement[];
};

function AuthProvider({ children }: ChildrenType): ReactElement {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ authState, authDispatch, currentUser, setCurrentUser, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
