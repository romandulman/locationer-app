import { locConst } from "./Locations.constants";


/// Set Header Navber toolbar to do operations on Locations
export const setForLocations =()=>({
  type: locConst.SET_LOC
});
export const unsetForLocations =()=>({
  type: locConst.UNSET_LOC
});

/// Select Location item from list to future operations
export const selectLocItem = item =>({
  type: locConst.SELECT_ITEM,
  payload: {item}
});


/// Loading saved from local storage to state
export const resetLocList =()=>({
    type: locConst.RESET_LOC_LIST
});
/// View Locations from specific Category
export const viewFromCat = cat =>({
    type: locConst.VIEW_CAT_LOC,
    payload: {cat}
});


/// Sorting Location list
export const sortByAbc = () => ({
  type: locConst.SORT_BY_ABC
});
export const sortByCat = () => ({
  type: locConst.SORT_BY_CAT
});


/// Add, Delete, Edit operations
export const addLocation = newLoc => ({
  type: locConst.ADD_LOC,
  payload: { newLoc }
});
export const remLocation = loc => ({
  type: locConst.REMOVE_LOC,
  payload: { loc }
});
export const editLocation = (oldLoc, newLoc) => ({
  type: locConst.EDIT_LOC,
  payload: { oldLoc, newLoc }
});


/// View single Location Details / Map
/*
export const viewLocItemDetails = selected => ({
    type: locConst.VIEW_LOC_ITEM,
    payload: { selected }
});
export const viewLocItemMap = selected => ({
    type: locConst.VIEW_LOC_MAP,
    payload: { selected }
});

*/
