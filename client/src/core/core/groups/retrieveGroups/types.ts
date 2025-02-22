import { Group, Identifiable, Request } from "@dto";

interface RetrieveGroupsState {
  error: string | null;
  request: Request;
  groups: Identifiable<Group>[];
}

export { RetrieveGroupsState };
