import { Chat, Request } from "@dto";

interface SendChatState {
  error: string | null;
  request: Request;
}

interface SendChatRequest {
  chat: Chat;
}

export { SendChatState, SendChatRequest };
