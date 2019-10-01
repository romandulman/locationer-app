import LocationsPage from "./locations.feature/locations.containers/Locations.container";
import CategoriesPage from "./categories.feature/categories.containers/Categories.container";
import { LocationsReducer } from "./locations.feature/locations.redux/Locations.reducer";
import { CategoriesReducer } from "./categories.feature/categories.redux/Categories.reducer";
import AddEditLoc from "./locations.feature/locations.containers/AddEditLoc.container";
import AddEditCat from "./categories.feature/categories.containers/AddEditCat.container";

export * from "./categories.feature/categories.redux/Categories.actions";
export * from "./locations.feature/locations.redux/Locations.actions";
export {
  LocationsPage,
  CategoriesPage,
  AddEditCat,
  AddEditLoc,
  LocationsReducer,
  CategoriesReducer
};
