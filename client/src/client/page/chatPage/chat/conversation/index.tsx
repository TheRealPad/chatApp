import { useState } from "react";

import { useChatsRetrieval } from "@viewModels";
import { Props } from "./types";
import styles from "./styles.module.scss";

function Conversation({ user, selectedGroup, sendMessage }: Props) {
  const { chats } = useChatsRetrieval();
  const [message, setMessage] = useState("");
  const groupName = !selectedGroup
    ? ""
    : selectedGroup.isPersonal
    ? selectedGroup.members.find((member) => member.uuid !== user.uuid)?.name ??
      user.name + " (you)"
    : selectedGroup.name;

  return (
    <div className={styles.conversation}>
      <div className={styles.header}>
        <h2>{selectedGroup ? groupName : "No group selected"}</h2>
        {selectedGroup && (
          <div>
            <button onClick={() => alert("delete group")}>delete</button>
          </div>
        )}
      </div>
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
        <button type={"submit"} onClick={() => sendMessage(message)}>
          Send Send
        </button>
      </form>
    </div>
  );
}

export { Conversation };
