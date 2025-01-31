import { combineReducers } from "@reduxjs/toolkit";

import retrieveCurrentUserReducer from "./retrieveCurrentUser";
import { UserReducersMap } from "./types.ts";

const userReducer = combineReducers<UserReducersMap>({
  retrieveCurrentUser: retrieveCurrentUserReducer,
});

export { userReducer };
