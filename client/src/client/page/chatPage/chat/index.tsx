import React from "react";
import { Client } from "@stomp/stompjs";
import { useDispatch } from "react-redux";

import {
  addToGroupSubscriber,
  chatsSubscriber,
  groupDeletionSubscriber,
  isTypingSubscriber,
  subscribeSubscriber,
  unsubscribeSubscriber,
  usersSubscriber,
} from "@component/webSocket/subscribers.ts";
import {
  connectionPublisher,
  disconnectionPublisher,
  isTypingPublisher,
  openMessagePublisher,
} from "@component/webSocket/publishers.ts";
import { Group, Identifiable, User } from "@dto";
import { Groups } from "./groups";
import { Conversation } from "./conversation";
import { Props } from "./types";
import styles from "./styles.module.scss";

function Chat({ user, selectedGroup, setSelectedGroup }: Props) {
  const dispatch = useDispatch();
  const uniqueIdRef = React.useRef<string | null>(null);
  const stompClientRef = React.useRef<Client | null>(null);

  React.useEffect(() => {
    const stompClient = new Client({
      brokerURL: import.meta.env.VITE_WEB_SOCKET_URL,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to WebSocket");
        uniqueIdRef.current = user.uuid;
        subscribeSubscriber(stompClient, dispatch);
        unsubscribeSubscriber(stompClient, dispatch);
        usersSubscriber(stompClient, dispatch);
        chatsSubscriber(stompClient, dispatch);
        groupDeletionSubscriber(stompClient, dispatch);
        addToGroupSubscriber(stompClient, dispatch);
        isTypingSubscriber(stompClient, dispatch);
        connectionPublisher(stompClient, uniqueIdRef.current);
      },
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    const handleUnload = () => {
      console.log("Unload client");
      if (uniqueIdRef.current) {
        disconnectionPublisher(stompClient, uniqueIdRef.current);
      }
      stompClient.deactivate();
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      handleUnload();
      window.removeEventListener("beforeunload", handleUnload);
      stompClient.deactivate();
    };
  }, []);

  const notifyTyping = (
    user: Identifiable<User>,
    group: Identifiable<Group>,
    isTyping: boolean
  ) => {
    if (stompClientRef.current) {
      isTypingPublisher(stompClientRef.current, {
        user: user.uuid,
        group: group.uuid,
        isTyping: isTyping,
      });
    }
  };

  const markMessageAsRead = (group: Identifiable<Group>) => {
    if (stompClientRef.current) {
      openMessagePublisher(stompClientRef.current, {
        user: user.uuid,
        group: group.uuid,
      });
    }
  };

  return (
    <div className={styles.chat}>
      <div className={styles.leftBox}>
        <Groups
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
          markMessageAsRead={markMessageAsRead}
        />
      </div>
      <div className={styles.rightBox}>
        <Conversation
          user={user}
          selectedGroup={selectedGroup}
          notifyTyping={notifyTyping}
        />
      </div>
    </div>
  );
}

export { Chat };
