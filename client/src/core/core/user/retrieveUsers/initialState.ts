import { RetrieveUsersState } from "./types.ts";
import { request } from "@dto";

const initialState: RetrieveUsersState = {
  users: [],
  request,
  error: null,
};

export { initialState };
