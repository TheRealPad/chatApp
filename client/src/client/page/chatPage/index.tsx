import React from "react";

import { useCurrentUserRetrieval } from "@viewModels";
import { Chat } from "./chat";
import { Props } from "./types";
import styles from "./styles.module.scss";

function ChatPage(_: Props) {
  const { retrieveCurrentUser, user, isRequestSuccess } =
    useCurrentUserRetrieval();

  React.useEffect(() => {
    retrieveCurrentUser();
  }, []);

  return (
    <div className={styles.home}>
      <p>Welcome {user.name}</p>
      {isRequestSuccess && <Chat user={user} />}
    </div>
  );
}

export { ChatPage };
