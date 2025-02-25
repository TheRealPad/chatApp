import { Group, Id, Identifiable } from "@dto";

interface IsTyping {
  users: Id[];
  group: Identifiable<Group>;
}

interface IsTypingState {
  groups: IsTyping[];
}

interface IsTypingRequest {
  group: Identifiable<Group>;
}

export { IsTypingState, IsTypingRequest };
