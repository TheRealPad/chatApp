import { Client } from "@stomp/stompjs";
import { Dispatch } from "react";
import { UnknownAction } from "@reduxjs/toolkit";

import { getConnectedUsers } from "@core/user/retrieveUsers";
import {
  getConnectedFriends,
  addFriend,
  removeFriend,
} from "@core/friends/retrieveUserFriends";
import { Chat, Group, Id, Identifiable, User } from "@dto";
import {
  addNewGroup,
  deleteGroup,
  updateGroupOrder,
} from "@core/groups/retrieveGroups";
import { getChat } from "@core/chat/retrieveChats";
import { usersTyping } from "@core/chat/isTyping";

function chatsSubscriber(
  stompClient: Client,
  dispatch: Dispatch<UnknownAction>
) {
  stompClient.subscribe("/user/queue/private/chat", (message) => {
    const jsonChat = JSON.parse(message.body);
    const chat: Identifiable<Chat> & { group: Id } = {
      uuid: jsonChat.uuid,
      content: jsonChat.content,
      timestamp: new Date(jsonChat.createdDate).getTime(),
      sender: {
        name: jsonChat.sender.username,
        role: jsonChat.sender.role,
        isConnected: false,
        uuid: jsonChat.sender.uuid,
      },
      group: jsonChat.group.uuid,
    };
    dispatch(getChat(chat));
    dispatch(updateGroupOrder(jsonChat.group));
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
      unseenMessages: 0,
    };
    dispatch(addNewGroup(group));
  });
}

function groupDeletionSubscriber(
  stompClient: Client,
  dispatch: Dispatch<UnknownAction>
) {
  stompClient.subscribe(`/user/queue/private/groupDeletion`, (message) => {
    const jsonGroup = JSON.parse(message.body);
    const group: Identifiable<Group> = {
      name: jsonGroup.name,
      description: jsonGroup.description,
      uuid: jsonGroup.uuid,
      isPersonal: jsonGroup.isPersonal,
      members: jsonGroup.members,
      unseenMessages: 0,
    };
    dispatch(deleteGroup(group));
  });
}

function isTypingSubscriber(
  stompClient: Client,
  dispatch: Dispatch<UnknownAction>
) {
  stompClient.subscribe(`/user/queue/private/isTyping`, (message) => {
    dispatch(usersTyping(JSON.parse(message.body)));
  });
}

export {
  chatsSubscriber,
  usersSubscriber,
  subscribeSubscriber,
  unsubscribeSubscriber,
  addToGroupSubscriber,
  groupDeletionSubscriber,
  isTypingSubscriber,
};
