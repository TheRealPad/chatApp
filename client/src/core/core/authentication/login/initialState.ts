import { error, request } from "@dto";
import { LoginState } from "./types.ts";

const initialState: LoginState = {
  username: "",
  password: "",
  request,
  error,
};

export { initialState };
