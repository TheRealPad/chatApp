import { addMessage } from "@core/chat/retrieveChats";
import { Client } from "@stomp/stompjs";
import { Dispatch } from "react";
import { UnknownAction } from "@reduxjs/toolkit";

function chatsSubscriber(
  stompClient: Client,
  dispatch: Dispatch<UnknownAction>
) {
  stompClient.subscribe("/topic/messages", (message) => {
    dispatch(addMessage(JSON.parse(message.body)));
  });
}

export { chatsSubscriber };
