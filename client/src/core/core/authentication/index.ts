import { combineReducers } from "@reduxjs/toolkit";

import loginReducer from "./login";
import registerReducer from "./register";

const authenticationReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
});

export { authenticationReducer };
