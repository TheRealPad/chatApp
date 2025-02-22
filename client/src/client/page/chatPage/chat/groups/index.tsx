import React from "react";
import classNames from "classnames";

import { useCurrentUserRetrieval, useGroupsRetrieval } from "@viewModels";
import { Props } from "./types";
import styles from "./styles.module.scss";

function Groups({ setSelectedGroup, selectedGroup }: Props) {
  const {
    retrieveGroups,
    groups,
    isRequestSuccess,
    isRequestFailure,
    isRequestPending,
  } = useGroupsRetrieval();
  const { user } = useCurrentUserRetrieval();

  React.useEffect(() => {
    !isRequestFailure &&
      !isRequestPending &&
      !isRequestSuccess &&
      retrieveGroups();
  }, []);

  return (
    <div className={styles.groups}>
      {groups.map((group, key) => (
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
          {group.isPersonal ? (
            <p className={styles.tile}>
              {group.members.find((member) => member.uuid !== user.uuid)
                ?.name ?? user.name + " (you)"}
            </p>
          ) : (
            <p className={styles.tile}>{group.name} (group)</p>
          )}
        </div>
      ))}
    </div>
  );
}

export { Groups };
