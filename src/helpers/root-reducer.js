import { combineReducers } from "redux";
import { CategoriesReducer } from "../features";
import { LocationsReducer } from "../features";

const RootReducer = combineReducers({
  CategoriesReducer,
  LocationsReducer
});
export default RootReducer;
