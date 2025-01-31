import { request } from "@dto";
import { RetrieveChatsState } from "@core/chat/retrieveChats/types.ts";

const initialState: RetrieveChatsState = {
  chats: [],
  request,
  error: null,
};

export { initialState };
