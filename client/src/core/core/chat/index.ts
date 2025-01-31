import { combineReducers } from "@reduxjs/toolkit";

import retrieveChatsReducer from "./retrieveChats";
import sendChatReducer from "./sendChat";
import { ChatReducersMap } from "./types.ts";

const chatReducer = combineReducers<ChatReducersMap>({
  retrieveChats: retrieveChatsReducer,
  sendChat: sendChatReducer,
});

export { chatReducer };
