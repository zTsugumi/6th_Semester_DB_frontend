import { combineReducers, applyMiddleware, createStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const configureStore = () => {
  const store = createStore(
    combineReducers({

    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
