import {
  AuthStateType,
  ReducerAction,
  AUTH_REDUCER_ACTION_TYPES,
} from "../context/AuthContext";

const authReducer = (
  state: AuthStateType,
  { type, payload }: ReducerAction
): AuthStateType => {
  switch (type) {
    case AUTH_REDUCER_ACTION_TYPES.EMAIL:
      return {
        ...state,
        email: payload,
      };
    case AUTH_REDUCER_ACTION_TYPES.NAME:
      return {
        ...state,
        name: payload,
      };
    case AUTH_REDUCER_ACTION_TYPES.PASSWORD:
      return {
        ...state,
        password: payload,
      };
    case AUTH_REDUCER_ACTION_TYPES.CPASSWORD:
      return {
        ...state,
        cpassword: payload,
      };
    case AUTH_REDUCER_ACTION_TYPES.ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default authReducer;
