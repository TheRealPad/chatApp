import { Chat, Group, Identifiable, Request } from "@dto";

interface GroupChat {
  chats: Identifiable<Chat>[];
  error: string | null;
  request: Request;
  group: Identifiable<Group>;
}

interface RetrieveChatsState {
  groups: GroupChat[];
}

interface RetrieveChatsRequest {
  group: Identifiable<Group>;
}

export { RetrieveChatsState, RetrieveChatsRequest };
