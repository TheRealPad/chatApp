import React, { useState } from "react";
import { Client } from "@stomp/stompjs";

import { DisconnectButton } from "@common/disconnectButton";
import { Props } from "./types";
import styles from "./styles.module.scss";
import { useChatsRetrieval } from "@viewModels";

function Chat(_: Props) {
  const { chats } = useChatsRetrieval();
  const [users, setUsers] = React.useState<string[]>([]);
  const [messages, setMessages] = useState<
    { sender: string; content: string; timestamp: number }[]
  >([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const uniqueIdRef = React.useRef<string | null>(null);
  const stompClientRef = React.useRef<Client | null>(null);

  React.useEffect(() => {
    const stompClient = new Client({
      brokerURL: import.meta.env.VITE_WEB_SOCKET_URL,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to WebSocket");
        uniqueIdRef.current = `ReactUser_${Math.random()
          .toString(36)
          .substring(7)}`;
        stompClient.subscribe("/topic/users", (message) => {
          setUsers(JSON.parse(message.body));
        });
        stompClient.subscribe("/topic/messages", (message) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            JSON.parse(message.body),
          ]);
        });
        stompClient.publish({
          destination: "/app/connect",
          body: JSON.stringify(uniqueIdRef.current),
        });
      },
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    const handleUnload = () => {
      console.log("Unload client");
      if (uniqueIdRef.current) {
        stompClient.publish({
          destination: "/app/disconnect",
          body: JSON.stringify(uniqueIdRef.current),
        });
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
      username.trim() !== ""
    ) {
      const chatMessage = {
        sender: username,
        content: message,
        timestamp: new Date().getTime(),
      };

      stompClientRef.current.publish({
        destination: "/app/chat",
        body: JSON.stringify(chatMessage),
      });

      setMessage("");
    }
  };

  return (
    <div className={styles.home}>
      <p>chat page</p>
      <DisconnectButton />
      <h2>Connected Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <h2>Chat Messages</h2>
      <h4>{chats.length}</h4>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.sender}</strong>: {msg.content}{" "}
            <i>({new Date(msg.timestamp).toLocaleTimeString()})</i>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { Chat };
