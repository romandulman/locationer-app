import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import RootReducer from "./root-reducer";
const loggerMiddleware = createLogger();

export const store = createStore(
  RootReducer,
  applyMiddleware(
    loggerMiddleware
  )
);

