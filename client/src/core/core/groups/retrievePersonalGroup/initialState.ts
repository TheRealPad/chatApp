import { RetrievePersonalGroupState } from "./types.ts";
import { group, request } from "@dto";

const initialState: RetrievePersonalGroupState = {
  request,
  error: null,
  group: { ...group, uuid: "" },
};

export { initialState };
