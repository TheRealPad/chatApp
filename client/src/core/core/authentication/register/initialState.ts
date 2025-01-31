import { RegisterState } from "./types.ts";

import { error, request } from "@dto";

const initialState: RegisterState = {
  username: "",
  password: "",
  request,
  error,
};

export { initialState };
