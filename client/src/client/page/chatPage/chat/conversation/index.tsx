import React, { useState } from "react";

import {
  useChatSender,
  useChatsRetrieval,
  useGroupRemoval,
  useIsTypingRetrieval,
} from "@viewModels";
import { group } from "@dto";
import { Props } from "./types";
import styles from "./styles.module.scss";

function Conversation({ user, selectedGroup, notifyTyping }: Props) {
  const { chats, retrieveChats } = useChatsRetrieval({
    group: selectedGroup ?? { ...group, uuid: "" },
  });
  const { sendChat } = useChatSender();
  const { deleteGroup } = useGroupRemoval();
  const { users } = useIsTypingRetrieval({
    group: selectedGroup ?? { ...group, uuid: "" },
  });
  const usersTyping = selectedGroup
    ? users
        .map(
          (u) => selectedGroup.members.find((member) => member.uuid === u)?.name
        )
        .join(",")
    : "";
  const [message, setMessage] = useState("");
  const groupName = !selectedGroup
    ? ""
    : selectedGroup.isPersonal
    ? selectedGroup.members.find((member) => member.uuid !== user.uuid)?.name ??
      user.name + " (you)"
    : selectedGroup.name;

  React.useEffect(() => {
    selectedGroup && retrieveChats({ group: selectedGroup });
  }, [selectedGroup]);

  return (
    <div className={styles.conversation}>
      <div className={styles.header}>
        <h2>{selectedGroup ? groupName : "No conversation selected"}</h2>
        {selectedGroup && (
          <div>
            <button onClick={() => deleteGroup({ group: selectedGroup })}>
              delete
            </button>
          </div>
        )}
      </div>
      <div className={styles.chats}>
        {chats.map((chat, index) => (
          <div key={index}>
            <strong>{chat.sender.name}</strong>: {chat.content}{" "}
            <i>({new Date(chat.timestamp).toLocaleString()})</i>
          </div>
        ))}
      </div>
      {selectedGroup && (
        <div>
          {usersTyping.length > 0 && <p>{usersTyping} is typing...</p>}
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
              onFocus={() => notifyTyping(user, selectedGroup, true)}
              onChange={(e) => {
                setMessage(e.target.value);
                notifyTyping(user, selectedGroup, true);
              }}
              onBlur={() => notifyTyping(user, selectedGroup, false)}
            />
            <button
              type={"submit"}
              onClick={() =>
                sendChat({
                  chat: {
                    sender: user,
                    content: message,
                    timestamp: new Date().getTime(),
                  },
                  group: selectedGroup ?? { ...group, uuid: "" },
                })
              }
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export { Conversation };
