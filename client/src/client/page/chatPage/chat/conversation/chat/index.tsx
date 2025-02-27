import { UserIcon } from "@common/userIcon";
import { Props } from "./types";
import styles from "./styles.module.scss";

function Chat({ chat }: Props) {
  return (
    <div className={styles.chat}>
      <div className={styles.header}>
        <div className={styles.userIcon}>
          <UserIcon user={chat.sender} />
        </div>
        <p className={styles.username}>{chat.sender.name}</p>
        <p className={styles.date}>
          {new Date(chat.timestamp).toLocaleString()}
        </p>
      </div>
      <p className={styles.body}>{chat.content}</p>
    </div>
  );
}

export { Chat };
