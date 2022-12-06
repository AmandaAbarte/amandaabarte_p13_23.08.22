import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

import reducers from "./reducers/index";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    reducers
  },
});
