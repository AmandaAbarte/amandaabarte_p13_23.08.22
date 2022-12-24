import { createStore } from "redux";

const initialState = {
  token: "",
  data: "",
  error: "",
  isEdit: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "getToken":
      return {
        ...state,
        token: action.token,
        error: action.error,
      };
    case "getError":
      return {
        ...state,
        error: action.error,
      };
    case "getProfile":
      return {
        ...state,
        data: action.data,
      };
    case "isEdit":
      return {
        ...state,
        isEdit: action.isEdit,
      };
    default:
      return state;
  }
};

export const store = createStore(reducer);
