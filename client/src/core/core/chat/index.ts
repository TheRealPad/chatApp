import { combineReducers } from "@reduxjs/toolkit";

import retrieveChatsReducer from "./retrieveChats";
import sendChatReducer from "./sendChat";
import isTypingReducer from "./isTyping";

const chatReducer = combineReducers({
  retrieveChats: retrieveChatsReducer,
  sendChat: sendChatReducer,
  isTyping: isTypingReducer,
});

export { chatReducer };
