import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { register } from "@services/core/register.ts";
import { RegisterState } from "./types.ts";

function registerStateHandler() {
  return (builder: ActionReducerMapBuilder<RegisterState>) => {
    builder
      .addCase(register.pending, (state) => {
        state.request.isRequestPending = true;
        state.request.isRequestFailure = false;
        state.request.isRequestSuccess = false;
      })
      .addCase(register.fulfilled, (state, payload) => {
        state.request.isRequestPending = false;
        state.request.isRequestFailure = false;
        state.request.isRequestSuccess = true;
        console.log(payload);
      })
      .addCase(register.rejected, (state) => {
        state.request.isRequestPending = false;
        state.request.isRequestFailure = true;
        state.request.isRequestSuccess = false;
      });
  };
}

export { registerStateHandler };
