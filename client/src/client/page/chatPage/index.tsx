import React from "react";

import { useCurrentUserRetrieval } from "@viewModels";
import { DisconnectButton } from "@common/disconnectButton";
import { Chat } from "./chat";
import { Loader } from "./loader";
import { Friends } from "./friends";
import { Props } from "./types";
import styles from "./styles.module.scss";

function ChatPage(_: Props) {
  const { retrieveCurrentUser, user, isRequestSuccess } =
    useCurrentUserRetrieval();

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
          <Friends user={user} />
          <Chat user={user} />
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
