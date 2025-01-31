import { RetrieveCurrentUserState } from "./types.ts";
import { request, user } from "@dto";

const initialState: RetrieveCurrentUserState = {
  user: { ...user, uuid: "" },
  request,
  error: null,
};

export { initialState };
