import { DeleteGroupState } from "./types.ts";
import { request } from "@dto";

const initialState: DeleteGroupState = {
  request,
  error: null,
};

export { initialState };
