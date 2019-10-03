import { catConst } from "./Categories.constants";
import {
  lsConst,
  isSavedPersist,
  loadState,
  saveState
} from "../../../utils/local-storage";
import { initialState } from "../../../helpers/initial-data";


const filteredItem = (arr, payload) => {
  return arr.filter(item => item !== payload);
};

export const CategoriesReducer = (state = initialState(lsConst.LCTNR_CAT), action) => {
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
      return {
        ...state,
        categories: [...state.categories, action.payload.newCat]
      };

    case catConst.REMOVE_CAT:
      const updatedAfterDel = filteredItem(state.categories, action.payload.cat);
      return {
        ...state,
        categories: updatedAfterDel,
        selectedItem: null
      };

    case catConst.EDIT_CAT:
      const updatedAfterEdit = filteredItem(state.categories, action.payload.oldCat);
      return {
        ...state,
        categories: [...updatedAfterEdit, action.payload.newCat],
        selectedItem: null
      };

    default:
      return state;
  }
};
