import React from "react";
import {
  useAddFriend,
  useFriendRemoval,
  usePersonalGroupRetrieval,
  useUserFriendsRetrieval,
  useUsersRetrieval,
} from "@viewModels";
import { Box, Modal } from "@mui/material";

import { Props, modalStyle } from "./types";
import styles from "./styles.module.scss";
import { UserIcon } from "@common/userIcon";

function Friends({ user, setSelectedGroup }: Props) {
  const {
    retrieveUserFriends,
    friends,
    isRequestSuccess: isRequestFriendsSuccess,
    isRequestPending: isRequestFriendsPending,
    isRequestFailure: isRequestFriendsFailure,
  } = useUserFriendsRetrieval();
  const {
    retrieveUsers,
    users,
    isRequestSuccess: isRequestUsersSuccess,
    isRequestPending,
    isRequestFailure,
  } = useUsersRetrieval();
  const { retrievePersonalGroup, group, isRequestSuccess } =
    usePersonalGroupRetrieval();
  const { removeFriend } = useFriendRemoval();
  const { addFriend } = useAddFriend();
  const [openFriends, setOpenFriends] = React.useState(false);
  const [openUsers, setOpenUsers] = React.useState(false);

  React.useEffect(() => {
    !isRequestFriendsFailure &&
      !isRequestFriendsPending &&
      !isRequestFriendsSuccess &&
      retrieveUserFriends({ user: user.uuid });
    !isRequestPending &&
      !isRequestFailure &&
      !isRequestUsersSuccess &&
      retrieveUsers();
  }, []);

  React.useEffect(() => {
    if (isRequestSuccess) {
      setSelectedGroup(group);
      setOpenFriends(false);
    }
  }, [isRequestSuccess]);

  return (
    <div className={styles.friends}>
      <button onClick={() => setOpenFriends(!openFriends)}>See Friends</button>
      <button onClick={() => setOpenUsers(!openUsers)}>See Users</button>
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
                  <div className={styles.userIcon}>
                    <UserIcon user={friend} />
                  </div>
                  <p>{friend.name} </p>
                  {friend.isConnected && <div className={styles.connected} />}
                </div>
                <div className={styles.buttons}>
                  <button
                    onClick={() =>
                      retrievePersonalGroup({
                        user1: user.uuid,
                        user2: friend.uuid,
                      })
                    }
                  >
                    message
                  </button>
                  <button
                    className={styles.removeButton}
                    onClick={() => removeFriend({ friend: friend })}
                  >
                    remove
                  </button>
                </div>
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
                  <div className={styles.userIcon}>
                    <UserIcon user={u} />
                  </div>
                  <p>{u.name} </p>
                  {u.isConnected ||
                    (u.uuid === user.uuid && (
                      <div className={styles.connected} />
                    ))}
                </div>
                {user.uuid !== u.uuid &&
                  !friends.find((p) => p.uuid === u.uuid) && (
                    <button
                      className={styles.addButton}
                      onClick={() => addFriend({ friend: u })}
                    >
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
