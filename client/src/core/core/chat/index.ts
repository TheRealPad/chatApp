import { combineReducers } from "@reduxjs/toolkit";

import retrieveChatsReducer from "./retrieveChats";
import sendChatReducer from "./sendChat";

const chatReducer = combineReducers({
  retrieveChats: retrieveChatsReducer,
  sendChat: sendChatReducer,
});

export { chatReducer };
