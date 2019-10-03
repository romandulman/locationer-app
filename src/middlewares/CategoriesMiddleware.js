import { catConst } from "../features/categories.feature/categories.redux/Categories.constants";
import { lsConst, saveState } from "../utils/local-storage";
import { initialState } from "../helpers/initial-data";

//// Local Storage save / load operations Middleware
const filteredItem = (arr, payload) => {
  return arr.categories.filter(item => item !== payload);
};
export const CatLocalStorageMiddleware = store => next => action => {
  switch (action.type) {

    case catConst.ADD_CAT:
      saveState(
        {
          categories: [
            ...initialState(lsConst.LCTNR_CAT).categories,
            action.payload.newCat
          ]
        },
        lsConst.LCTNR_CAT
      );
      next(action);
      break;

    case catConst.REMOVE_CAT:
      const updatedAfterDel = filteredItem(
        initialState(lsConst.LCTNR_CAT),
        action.payload.cat
      );
      saveState({ categories: updatedAfterDel }, lsConst.LCTNR_CAT);
      next(action);
      break;

    case catConst.EDIT_CAT:
      const updatedAfterEdit = filteredItem(
        initialState(lsConst.LCTNR_CAT),
        action.payload.oldCat
      );
      saveState(
        {
          categories: [...updatedAfterEdit, action.payload.newCat]
        },
        lsConst.LCTNR_CAT
      );
      next(action);
      break;

    default:
      next(action);
  }
};
