import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./initialState.ts";
import { registerStateHandler } from "./state.ts";
import { AuthenticationUseCases } from "../types.ts";

export const registerSlice = createSlice({
  name: AuthenticationUseCases.register,
  initialState,
  reducers: {},
  extraReducers: registerStateHandler(),
});

export default registerSlice.reducer;
