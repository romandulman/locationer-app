import { locConst } from "./Locations.constants";
import { lsConst } from "../../../utils/local-storage";
import { initialState } from "../../../helpers/initial-data";
import { sortByAbc, sortByCat } from "../../../utils/sort-func";

const filteredItem = (arr, payload) => {
  return arr.locations.filter(item => item.name !== payload);
};

export const LocationsReducer = (
  state = initialState(lsConst.LCTNR_LOC),
  action
) => {
  switch (action.type) {
    case locConst.SET_LOC:
      return {
        ...state,
        setLoc: true,
        selectedItem: null
      };

    case locConst.UNSET_LOC:
      return {
        ...state,
        setLoc: false
      };

    case locConst.SELECT_ITEM:
      return {
        ...state,
        selectedItem: action.payload.item
      };

    case locConst.RESET_LOC_LIST:
      const locations = initialState(lsConst.LCTNR_LOC);
      return {
        ...state,
        locations: locations.locations,
        selectedItem: null,
        viewByCat: false
      };

    case locConst.VIEW_CAT_LOC: /// view locations by category
      const savedLocations = initialState(lsConst.LCTNR_LOC);
      const specificCatLocItems = savedLocations.locations.filter(
        item => item.category === action.payload.cat
      );
      return {
        ...state,
        locations: specificCatLocItems,
        viewByCat: true,
        category: action.payload.cat
      };

    case locConst.ADD_LOC:
      return {
        ...state,
        locations:
          state.category === action.payload.newLoc.category
            ? [...state.locations, action.payload.newLoc]
            : [...state.locations]
      };

    case locConst.REMOVE_LOC:
      const updatedStateDel = filteredItem(
        { locations: [...state.locations] },
        action.payload.loc
      );
      return {
        ...state,
        locations: updatedStateDel
      };

    case locConst.EDIT_LOC:
      const updatedStateEdit = filteredItem(
        { locations: [...state.locations] },
        action.payload.oldLoc.name
      );

      if (state.category === action.payload.newLoc.category) {
        updatedStateEdit.push(action.payload.newLoc);
      }
      
      return {
        ...state,
        locations: updatedStateEdit
      };

    case locConst.SORT_BY_ABC:
      return {
        ...state,
        locations: sortByAbc([...state.locations])
      };

    case locConst.SORT_BY_CAT:
      return {
        ...state,
        locations: sortByCat([...state.locations])
      };

    default:
      return state;
  }
};
