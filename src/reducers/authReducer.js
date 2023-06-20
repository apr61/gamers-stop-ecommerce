export const authInitialState = {
  email: "",
  name: "",
  password: "",
  cpassword: "",
  error: "",
};

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: payload,
      };
    case "EMAIL":
      return {
        ...state,
        email: payload,
      };
    case "NAME":
      return {
        ...state,
        name: payload,
      };
    case "PASSWORD":
      return {
        ...state,
        password: payload,
      };
    case "CPASSWORD":
      return {
        ...state,
        cpassword: payload,
      };
    case "ERROR":
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default authReducer;
