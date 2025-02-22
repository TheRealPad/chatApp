import { Group, Identifiable, Request } from "@dto";

interface DeleteGroupState {
  error: string | null;
  request: Request;
}

interface DeleteGroupRequest {
  group: Identifiable<Group>;
}

export { DeleteGroupState, DeleteGroupRequest };
