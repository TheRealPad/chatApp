import { AddFriendState } from "./types.ts";
import { request } from "@dto";

const initialState: AddFriendState = {
  request,
  error: null,
};

export { initialState };
