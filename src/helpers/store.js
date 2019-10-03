import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { LocLocalStorageMiddleware } from "../middlewares/LocationsMiddleware";
import { CatLocalStorageMiddleware } from "../middlewares/CategoriesMiddleware";
import RootReducer from "./root-reducer";
const loggerMiddleware = createLogger();

export const store = createStore(
  RootReducer,
  applyMiddleware(
    loggerMiddleware,
    LocLocalStorageMiddleware,
    CatLocalStorageMiddleware
  )
);
