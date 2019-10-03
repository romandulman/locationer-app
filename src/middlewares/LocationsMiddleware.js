import { locConst } from "../features/locations.feature/locations.redux/Locations.constants";
import { lsConst, saveState } from "../utils/local-storage";
import { initialState } from "../helpers/initial-data";

//// Local Storage save / load operations Middleware
const filteredItem = (arr, payload) => {
  return arr.locations.filter(item => item.name !== payload);
};

export const LocLocalStorageMiddleware = store => next => action => {
  switch (action.type) {
    case locConst.ADD_LOC:
      const updatedAfterAdd = initialState(lsConst.LCTNR_LOC).locations;
      saveState(
        { locations: [...updatedAfterAdd, action.payload.newLoc] },
        lsConst.LCTNR_LOC
      );
      next(action);
      break;

    case locConst.REMOVE_LOC:
      const updatedAfterDel = filteredItem(
        initialState(lsConst.LCTNR_LOC),
        action.payload.loc
      );
      saveState({ locations: updatedAfterDel }, lsConst.LCTNR_LOC);
      next(action);
      break;

    case locConst.EDIT_LOC:
      const updatedAfterEdit = filteredItem(
        initialState(lsConst.LCTNR_LOC),
        action.payload.oldLoc.name
      );
      saveState(
        { locations: [...updatedAfterEdit, action.payload.newLoc] },
        lsConst.LCTNR_LOC
      );
      next(action);
      break;

    default:
      next(action);
  }
};
