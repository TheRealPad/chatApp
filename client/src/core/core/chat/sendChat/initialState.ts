import { SendChatState } from "./types.ts";
import { request } from "@dto";

const initialState: SendChatState = {
  request,
  error: null,
};

export { initialState };
