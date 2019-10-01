import { catConst } from "./Categories.constants";
import {
  lsConst,
  isSavedPersist,
  loadState,
  saveState
} from "../../../utils/local-storage";
import { initCatState } from "../../../helpers/initial-data";

const initialState = () => {
  if (isSavedPersist(lsConst.LCTNR_CAT)) {
    saveState(initCatState, lsConst.LCTNR_CAT);
    return initCatState;
  } else {
    return loadState(lsConst.LCTNR_CAT);
  }
};

const filteredItem = (arr, payload) => {
  return arr.categories.filter(item => item !== payload);
};

export const CategoriesReducer = (state = initialState(), action) => {
  switch (action.type) {
    case catConst.SET_CAT: ///set for the header actions
      return {
        ...state,
        setCat: true,
        selectedItem: null
      };

    case catConst.UNSET_CAT:
      return {
        ...state,
        setCat: false
      };

    case catConst.SELECT_ITEM:
      return {
        ...state,
        selectedItem: action.payload.item
      };

    case catConst.ADD_CAT:
      saveState(
        { categories: [...state.categories, action.payload.newCat] },
        lsConst.LCTNR_CAT
      );
      return {
        ...state,
        categories: [...state.categories, action.payload.newCat]
      };

    case catConst.REMOVE_CAT:
      const updatedAfterDel = filteredItem(initialState(), action.payload.cat);
      saveState({ categories: updatedAfterDel }, lsConst.LCTNR_CAT);
      return {
        ...state,
        categories: updatedAfterDel,
        selectedItem: null
      };

    case catConst.EDIT_CAT:
      const updatedAfterEdit = filteredItem(
        initialState(),
        action.payload.oldCat
      );
      updatedAfterEdit.push(action.payload.newCat);
      saveState({ categories: updatedAfterEdit }, lsConst.LCTNR_CAT);
      return {
        ...state,
        categories: updatedAfterEdit,
        selectedItem: null
      };

    default:
      return state;
  }
};
