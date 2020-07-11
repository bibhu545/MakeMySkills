import { createStore, applyMiddleware } from "redux";
import { commonReducer } from "./CommonReducer";
import thunk from "redux-thunk";

export const store = createStore(commonReducer, applyMiddleware(thunk))