import React, { useState } from "react";
import { Client } from "@stomp/stompjs";

import { DisconnectButton } from "@common/disconnectButton";
import { Props } from "./types";
import styles from "./styles.module.scss";
import {
  useAddFriend,
  useChatsRetrieval,
  useUsersRetrieval,
} from "@viewModels";
import { useDispatch } from "react-redux";
import {
  chatsSubscriber,
  usersSubscriber,
} from "@component/webSocket/subscribers.ts";
import {
  connectionPublisher,
  disconnectionPublisher,
  sendChatPublisher,
} from "@component/webSocket/publishers.ts";

function Chat({ user }: Props) {
  const dispatch = useDispatch();
  const { chats } = useChatsRetrieval();
  const { addFriend } = useAddFriend();
  const {
    retrieveUsers,
    users,
    isRequestSuccess,
    isRequestFailure,
    isRequestPending,
  } = useUsersRetrieval();
  const [message, setMessage] = useState("");
  const uniqueIdRef = React.useRef<string | null>(null);
  const stompClientRef = React.useRef<Client | null>(null);

  React.useEffect(() => {
    !isRequestFailure &&
      !isRequestPending &&
      !isRequestSuccess &&
      retrieveUsers();
  }, []);

  React.useEffect(() => {
    const stompClient = new Client({
      brokerURL: import.meta.env.VITE_WEB_SOCKET_URL,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to WebSocket");
        uniqueIdRef.current = user.uuid;
        usersSubscriber(stompClient, dispatch);
        chatsSubscriber(stompClient, dispatch);
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

  const sendMessage = () => {
    if (
      stompClientRef.current &&
      message.trim() !== "" &&
      user.name.trim() !== ""
    ) {
      const chatMessage = {
        sender: user.name,
        content: message,
        timestamp: new Date().getTime(),
      };

      sendChatPublisher(stompClientRef.current, chatMessage);

      setMessage("");
    }
  };

  return (
    <div className={styles.home}>
      <p>chat page</p>
      <DisconnectButton />
      <h2>Users</h2>
      <ul>
        {users.map((u, index) => (
          <li key={index}>
            {u.name}{" "}
            {u.isConnected || u.uuid === user.uuid
              ? "(connected)"
              : "(not connected)"}
            {user.uuid !== u.uuid && (
              <button onClick={() => addFriend({ friend: u })}>add</button>
            )}
          </li>
        ))}
      </ul>
      <input type="text" placeholder="Enter your name" value={user.name} />
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <h2>Chat Messages</h2>
      <ul>
        {chats.map((chat, index) => (
          <li key={index}>
            <strong>{chat.sender}</strong>: {chat.content}{" "}
            <i>({new Date(chat.timestamp).toLocaleTimeString()})</i>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { Chat };
