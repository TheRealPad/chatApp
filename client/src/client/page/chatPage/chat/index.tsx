import React, { useState } from "react";
import { Client } from "@stomp/stompjs";
import { useDispatch } from "react-redux";

import { useChatsRetrieval } from "@viewModels";
import {
  chatsSubscriber,
  subscribeSubscriber,
  unsubscribeSubscriber,
  usersSubscriber,
} from "@component/webSocket/subscribers.ts";
import {
  connectionPublisher,
  disconnectionPublisher,
  sendChatPublisher,
} from "@component/webSocket/publishers.ts";
import { Props } from "./types";
import styles from "./styles.module.scss";

function Chat({ user }: Props) {
  const dispatch = useDispatch();
  const { chats } = useChatsRetrieval();
  const [message, setMessage] = useState("");
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
    <div className={styles.chat}>
      <div className={styles.leftBox}>
        <p>Display the conversations with groups and users</p>
      </div>
      <div className={styles.rightBox}>
        <div className={styles.chats}>
          {chats.map((chat, index) => (
            <div key={index}>
              <strong>{chat.sender}</strong>: {chat.content}{" "}
              <i>({new Date(chat.timestamp).toLocaleTimeString()})</i>
            </div>
          ))}
        </div>
        <form
          className={styles.textInput}
          onSubmit={(e) => {
            sendMessage();
            e.preventDefault();
            e.preventDefault();
          }}
        >
          <p>
            {user.name} {">"}
          </p>
          <input
            className={styles.input}
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type={"submit"} onClick={sendMessage}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export { Chat };
