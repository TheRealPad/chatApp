import React, { useState } from "react";

import {
  useChatSender,
  useChatsRetrieval,
  useGroupRemoval,
  useIsTypingRetrieval,
} from "@viewModels";
import { group } from "@dto";
import { Chat } from "./chat";
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

  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  React.useEffect(() => {
    selectedGroup && retrieveChats({ group: selectedGroup });
  }, [selectedGroup]);

  return (
    <div className={styles.conversation}>
      <div className={styles.header}>
        <h2>{selectedGroup ? groupName : "No conversation selected"}</h2>
        {selectedGroup && (
          <div>
            <button
              className={styles.deleteButton}
              onClick={() => deleteGroup({ group: selectedGroup })}
            >
              delete
            </button>
          </div>
        )}
      </div>
      <div className={styles.chats} ref={chatContainerRef}>
        {chats.map((chat, index) => (
          <div key={index}>
            <Chat chat={chat} />
          </div>
        ))}
      </div>
      {selectedGroup && (
        <div>
          {usersTyping.length > 0 && (
            <p className={styles.isTyping}>{usersTyping} is typing...</p>
          )}
          <form
            className={styles.textInput}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
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
              onClick={() => {
                sendChat({
                  chat: {
                    sender: user,
                    content: message,
                    timestamp: new Date().getTime(),
                  },
                  group: selectedGroup ?? { ...group, uuid: "" },
                });
                setMessage("");
              }}
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
