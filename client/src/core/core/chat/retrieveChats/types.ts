import { Chat, Request } from "@dto";

interface RetrieveChatsState {
  chats: Chat[];
  error: string | null;
  request: Request;
}

export { RetrieveChatsState };
