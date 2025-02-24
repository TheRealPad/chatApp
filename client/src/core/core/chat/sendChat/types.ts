import { Chat, Group, Identifiable, Request } from "@dto";

interface SendChatState {
  error: string | null;
  request: Request;
}

interface SendChatRequest {
  chat: Chat;
  group: Identifiable<Group>;
}

export { SendChatState, SendChatRequest };
