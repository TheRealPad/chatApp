import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./initialState.ts";
import { loginStateHandler } from "./state.ts";
import { AuthenticationUseCases } from "../types.ts";

export const loginSlice = createSlice({
  name: AuthenticationUseCases.login,
  initialState,
  reducers: {},
  extraReducers: loginStateHandler(),
});

export default loginSlice.reducer;
