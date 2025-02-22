import { combineReducers } from "@reduxjs/toolkit";

import retrieveGroupsReducer from "./retrieveGroups";
import retrievePersonalGroupReducer from "./retrievePersonalGroup";

const groupsReducer = combineReducers({
  retrieveGroups: retrieveGroupsReducer,
  retrievePersonalGroup: retrievePersonalGroupReducer,
});

export { groupsReducer };
