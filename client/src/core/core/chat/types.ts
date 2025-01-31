import retrieveChatsReducer from "@/src/core/core/chat/retrieveChats";
import sendChatReducer from "@/src/core/core/chat/sendChat";

enum ChatUseCases {
  retrieveChats = "retrieveChats",
  sendChat = "sendChat",
}

type ChatReducersMap = {
  [K in ChatUseCases]: typeof retrieveChatsReducer | typeof sendChatReducer;
};

export { ChatUseCases, ChatReducersMap };
