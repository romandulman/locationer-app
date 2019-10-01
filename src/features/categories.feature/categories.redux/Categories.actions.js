import { catConst } from "./Categories.constants";

/// Set Header Navber toolbar to make future operations on Categories list
export const setForCategory = () => ({
  type: catConst.SET_CAT
});
export const unsetForCategory = () => ({
  type: catConst.UNSET_CAT
});

/// Select Category item from list to future operations
export const selectCatItem = item => ({
  type: catConst.SELECT_ITEM,
  payload: { item }
});

/// Add, Delete, Edit operations
export const addCategory = newCat => ({
  type: catConst.ADD_CAT,
  payload: { newCat }
});

export const remCategory = cat => ({
  type: catConst.REMOVE_CAT,
  payload: { cat }
});

export const editCategory = (oldCat, newCat) => ({
  type: catConst.EDIT_CAT,
  payload: { oldCat, newCat }
});
