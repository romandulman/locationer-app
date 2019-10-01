export const lsConst = {
  LCTNR_CAT: "LCTNR_CAT",
  LCTNR_LOC: "LCTNR_LOC"
};

export const loadState = keyName => {
  try {
    const serializedState = localStorage.getItem(keyName);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const isSavedPersist = keyname => {
  return localStorage.getItem(keyname) === null;
};

export const saveState = (state, keyName) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(keyName, serializedState);
  } catch (err) {
    if (err === "QUOTA_EXCEEDED_ERR") {
      alert('Browser Local Storage quota exceeded limit, the items will not save')
    }
  }
};
