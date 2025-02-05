import { addMessage } from "@core/chat/retrieveChats";
import { Client } from "@stomp/stompjs";
import { Dispatch } from "react";
import { UnknownAction } from "@reduxjs/toolkit";
import { getConnectedUsers } from "@core/user/retrieveUsers";
import { getConnectedFriends } from "@core/friends/retrieveUserFriends";

function chatsSubscriber(
  stompClient: Client,
  dispatch: Dispatch<UnknownAction>
) {
  stompClient.subscribe("/topic/messages", (message) => {
    dispatch(addMessage(JSON.parse(message.body)));
  });
}

function usersSubscriber(
  stompClient: Client,
  dispatch: Dispatch<UnknownAction>
) {
  stompClient.subscribe("/topic/users", (message) => {
    dispatch(
      getConnectedUsers(
        JSON.parse(message.body).map((user: any) => ({
          uuid: user.uuid,
          name: user.username,
          role: user.role as "USER" | "ADMIN",
        }))
      )
    );
    dispatch(
      getConnectedFriends(
        JSON.parse(message.body).map((user: any) => ({
          uuid: user.uuid,
          name: user.username,
          role: user.role as "USER" | "ADMIN",
        }))
      )
    );
  });
}

export { chatsSubscriber, usersSubscriber };
