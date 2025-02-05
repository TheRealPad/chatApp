import { RemoveFriendState } from "./types.ts";
import { request } from "@dto";

const initialState: RemoveFriendState = {
  request,
  error: null,
};

export { initialState };
