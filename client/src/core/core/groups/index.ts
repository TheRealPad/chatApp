import { combineReducers } from "@reduxjs/toolkit";

import retrieveGroupsReducer from "./retrieveGroups";
import retrievePersonalGroupReducer from "./retrievePersonalGroup";
import deleteGroupReducer from "./deleteGroup";

const groupsReducer = combineReducers({
  retrieveGroups: retrieveGroupsReducer,
  retrievePersonalGroup: retrievePersonalGroupReducer,
  deleteGroup: deleteGroupReducer,
});

export { groupsReducer };
