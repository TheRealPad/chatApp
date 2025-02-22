import { addMessage } from "@core/chat/retrieveChats";
import { Client } from "@stomp/stompjs";
import { Dispatch } from "react";
import { UnknownAction } from "@reduxjs/toolkit";
import { getConnectedUsers } from "@core/user/retrieveUsers";
import {
  getConnectedFriends,
  addFriend,
  removeFriend,
} from "@core/friends/retrieveUserFriends";
import { Group, Identifiable, User } from "@dto";
import { addNewGroup } from "@core/groups/retrieveGroups";

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

function subscribeSubscriber(
  stompClient: Client,
  dispatch: Dispatch<UnknownAction>
) {
  stompClient.subscribe(`/user/queue/subscribe`, (message) => {
    const jsonUser = JSON.parse(message.body);
    const user: Identifiable<User> = {
      name: jsonUser.username,
      role: jsonUser.role,
      uuid: jsonUser.uuid,
      isConnected: true,
    };
    dispatch(addFriend(user));
  });
}

function unsubscribeSubscriber(
  stompClient: Client,
  dispatch: Dispatch<UnknownAction>
) {
  stompClient.subscribe(`/user/queue/unsubscribe`, (message) => {
    const jsonUser = JSON.parse(message.body);
    const user: Identifiable<User> = {
      name: jsonUser.username,
      role: jsonUser.role,
      uuid: jsonUser.uuid,
      isConnected: true,
    };
    dispatch(removeFriend(user));
  });
}

function addToGroupSubscriber(
  stompClient: Client,
  dispatch: Dispatch<UnknownAction>
) {
  stompClient.subscribe(`/user/queue/private/addToGroup`, (message) => {
    const jsonGroup = JSON.parse(message.body);
    const group: Identifiable<Group> = {
      name: jsonGroup.name,
      description: jsonGroup.description,
      uuid: jsonGroup.uuid,
      isPersonal: jsonGroup.isPersonal,
      members: jsonGroup.members,
    };
    dispatch(addNewGroup(group));
  });
}

export {
  chatsSubscriber,
  usersSubscriber,
  subscribeSubscriber,
  unsubscribeSubscriber,
  addToGroupSubscriber,
};
