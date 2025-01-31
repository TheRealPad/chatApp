import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { chatReducer } from "@core/chat";
import { authenticationReducer } from "@core/authentication";
import { userReducer } from "@core/user";
import { ChatUseCases } from "@core/chat/types.ts";
import { AuthenticationUseCases } from "@core/authentication/types.ts";
import { loggerMiddleware } from "@utils/middleware.ts";
import { UserUseCases } from "@core/user/types.ts";

const UseCases = {
  ...ChatUseCases,
  ...AuthenticationUseCases,
  ...UserUseCases,
} as const;

const rootReducer = combineReducers({
  chat: chatReducer,
  authentication: authenticationReducer,
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
export { UseCases };
