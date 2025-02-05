import { RetrieveUserFriendsState } from "./types.ts";
import { request } from "@dto";

const initialState: RetrieveUserFriendsState = {
  request,
  error: null,
  friends: [],
};

export { initialState };
