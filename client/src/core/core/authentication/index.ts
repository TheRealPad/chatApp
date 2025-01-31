import { combineReducers } from "@reduxjs/toolkit";

import loginReducer from "./login";
import registerReducer from "./register";
import { AuthenticationReducersMap } from "./types.ts";

const authenticationReducer = combineReducers<AuthenticationReducersMap>({
  login: loginReducer,
  register: registerReducer,
});

export { authenticationReducer };
