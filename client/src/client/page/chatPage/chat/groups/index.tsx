import React from "react";
import classNames from "classnames";

import {
  useCurrentUserRetrieval,
  useGroupRemoval,
  useGroupsRetrieval,
} from "@viewModels";
import { CrossIcon } from "./crossIcon";
import { Props } from "./types";
import styles from "./styles.module.scss";
import { UserIcon } from "@common/userIcon";

function Groups({ setSelectedGroup, selectedGroup, markMessageAsRead }: Props) {
  const {
    retrieveGroups,
    groups,
    isRequestSuccess,
    isRequestFailure,
    isRequestPending,
  } = useGroupsRetrieval();
  const { user } = useCurrentUserRetrieval();
  const { deleteGroup } = useGroupRemoval();

  React.useEffect(() => {
    !isRequestFailure &&
      !isRequestPending &&
      !isRequestSuccess &&
      retrieveGroups();
  }, []);

  React.useEffect(() => {
    groups.length &&
      groups[0].uuid === selectedGroup?.uuid &&
      markMessageAsRead(selectedGroup);
  }, [groups]);

  return (
    <div className={styles.groups}>
      {groups.map((group, key) => {
        const unseenNotification =
          selectedGroup?.uuid !== group.uuid ? group.unseenMessages : 0;
        return (
          <div
            key={key}
            className={classNames(styles.group, {
              [styles.notPersonal]: !group.isPersonal,
              [styles.selected]: group.uuid === selectedGroup?.uuid,
            })}
            onClick={() => {
              if (group.isPersonal) {
                setSelectedGroup(group);
              }
            }}
          >
            <div className={styles.start}>
              <div className={styles.profileIcon}>
                <UserIcon
                  user={
                    group.members.find((member) => member.uuid !== user.uuid) ??
                    user
                  }
                />
                <div
                  className={classNames(styles.unseenMessages, {
                    [styles.visible]: unseenNotification > 0,
                  })}
                >
                  <p>{unseenNotification}</p>
                </div>
              </div>
              {group.isPersonal ? (
                <p className={styles.title}>
                  {group.members.find((member) => member.uuid !== user.uuid)
                    ?.name ?? user.name + " (you)"}
                </p>
              ) : (
                <p className={styles.tile}>{group.name} (group)</p>
              )}
            </div>
            <div
              className={styles.deleteButton}
              onClick={() => {
                deleteGroup({ group: group });
                setSelectedGroup(null);
              }}
            >
              <CrossIcon className={styles.icon} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { Groups };
