import { combineReducers } from "@reduxjs/toolkit";

import retrieveCurrentUserReducer from "./retrieveCurrentUser";
import retrieveUsersReducer from "./retrieveUsers";

const userReducer = combineReducers({
  retrieveCurrentUser: retrieveCurrentUserReducer,
  retrieveUsers: retrieveUsersReducer,
});

export { userReducer };
