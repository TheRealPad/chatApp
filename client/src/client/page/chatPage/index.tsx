import React from "react";

import { useCurrentUserRetrieval } from "@viewModels";
import { DisconnectButton } from "@common/disconnectButton";
import { Chat } from "./chat";
import { Loader } from "./loader";
import { Friends } from "./friends";
import { Props } from "./types";
import styles from "./styles.module.scss";
import { Group, Identifiable } from "@dto";

function ChatPage(_: Props) {
  const { retrieveCurrentUser, user, isRequestSuccess } =
    useCurrentUserRetrieval();
  const [selectedGroup, setSelectedGroup] =
    React.useState<Identifiable<Group> | null>(null);

  React.useEffect(() => {
    retrieveCurrentUser();
  }, []);

  return (
    <div className={styles.chat}>
      {isRequestSuccess ? (
        <div className={styles.content}>
          <div className={styles.header}>
            <h2>ChatApp, welcome {user.name}</h2>
            <DisconnectButton />
          </div>
          <Friends user={user} setSelectedGroup={setSelectedGroup} />
          <Chat
            user={user}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
          />
        </div>
      ) : (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
    </div>
  );
}

export { ChatPage };
