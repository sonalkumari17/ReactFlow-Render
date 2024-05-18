import { configureStore } from "@reduxjs/toolkit";
import nodeReducer from "./reducers/nodeReducer";
import edgeReducer from "./reducers/edgeReducer";


const store = configureStore({
    reducer: nodeReducer, edgeReducer
  });

export default store;
