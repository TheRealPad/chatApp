import React from "react";
import {
  useAddFriend,
  useFriendRemoval,
  useUserFriendsRetrieval,
  useUsersRetrieval,
} from "@viewModels";
import { Box, Button, Modal } from "@mui/material";

import { Props, modalStyle } from "./types";
import styles from "./styles.module.scss";

function Friends({ user }: Props) {
  const { retrieveUserFriends, friends } = useUserFriendsRetrieval();
  const { retrieveUsers, users } = useUsersRetrieval();
  const { removeFriend } = useFriendRemoval();
  const { addFriend } = useAddFriend();
  const [openFriends, setOpenFriends] = React.useState(false);
  const [openUsers, setOpenUsers] = React.useState(false);

  React.useEffect(() => {
    retrieveUserFriends({ user: user.uuid });
    retrieveUsers();
  }, []);

  return (
    <div className={styles.friends}>
      <Button onClick={() => setOpenFriends(!openFriends)}>See Friends</Button>
      <Button onClick={() => setOpenUsers(!openUsers)}>See Users</Button>
      <Modal
        open={openFriends}
        onClose={() => setOpenFriends(!openFriends)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div className={styles.box}>
            {friends.map((friend, index) => (
              <div className={styles.user} key={index}>
                <div className={styles.name}>
                  <p>{friend.name} </p>
                  {friend.isConnected && <div className={styles.connected} />}
                </div>
                <button onClick={() => removeFriend({ friend: friend })}>
                  remove
                </button>
              </div>
            ))}
          </div>
        </Box>
      </Modal>
      <Modal
        open={openUsers}
        onClose={() => setOpenUsers(!openUsers)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div className={styles.box}>
            {users.map((u, index) => (
              <div className={styles.user} key={index}>
                <div className={styles.name}>
                  <p>{u.name} </p>
                  {u.isConnected ||
                    (u.uuid === user.uuid && (
                      <div className={styles.connected} />
                    ))}
                </div>
                {user.uuid !== u.uuid &&
                  !friends.find((p) => p.uuid === u.uuid) && (
                    <button onClick={() => addFriend({ friend: u })}>
                      add
                    </button>
                  )}
              </div>
            ))}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export { Friends };
