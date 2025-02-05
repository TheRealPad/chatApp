import { Props } from "./types";
import styles from "./styles.module.scss";
import { useFriendRemoval, useUserFriendsRetrieval } from "@viewModels";
import React from "react";

function Friends({ user }: Props) {
  const { retrieveUserFriends, friends } = useUserFriendsRetrieval();
  const { removeFriend } = useFriendRemoval();

  React.useEffect(() => {
    retrieveUserFriends({ user: user.uuid });
  }, []);

  return (
    <div className={styles.friends}>
      <h3>Friends</h3>
      <p>Friends: {friends.length}</p>
      {friends.map((friend, index) => (
        <div key={index}>
          <p>
            {friend.name}{" "}
            {friend.isConnected ? "(connected)" : "(not connected)"}
            <button onClick={() => removeFriend({ friend: friend })}>
              remove
            </button>
          </p>
        </div>
      ))}
    </div>
  );
}

export { Friends };
