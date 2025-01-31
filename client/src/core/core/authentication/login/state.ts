import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";

import { login } from "@services/core/login.ts";
import { storeAccessToken } from "@utils/token.ts";
import { LoginResponseSuccess, LoginState } from "./types.ts";

function loginStateHandler() {
  return (builder: ActionReducerMapBuilder<LoginState>) => {
    builder
      .addCase(login.pending, (state) => {
        state.request.isRequestPending = true;
        state.request.isRequestFailure = false;
        state.request.isRequestSuccess = false;
      })
      .addCase(
        login.fulfilled,
        (state, { payload }: PayloadAction<LoginResponseSuccess>) => {
          state.request.isRequestPending = false;
          state.request.isRequestFailure = false;
          state.request.isRequestSuccess = true;
          storeAccessToken(payload.jwt);
        }
      )
      .addCase(login.rejected, (state, payload) => {
        state.request.isRequestPending = false;
        state.request.isRequestFailure = true;
        state.request.isRequestSuccess = false;
        state.error.message = payload.error.message ?? "";
      });
  };
}

export { loginStateHandler };
