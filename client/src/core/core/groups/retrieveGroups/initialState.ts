import { RetrieveGroupsState } from "./types.ts";
import { request } from "@dto";

const initialState: RetrieveGroupsState = {
  request,
  error: null,
  groups: [],
};

export { initialState };
