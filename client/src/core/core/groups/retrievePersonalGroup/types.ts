import { Group, Id, Identifiable, Request } from "@dto";

interface RetrievePersonalGroupState {
  error: string | null;
  request: Request;
  group: Identifiable<Group>;
}

interface RetrievePersonalGroupRequest {
  user1: Id;
  user2: Id;
}

export { RetrievePersonalGroupState, RetrievePersonalGroupRequest };
