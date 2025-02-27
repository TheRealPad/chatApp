import { Props } from "./types";
import styles from "./styles.module.scss";

function stringToHexColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += value.toString(16).padStart(2, "0");
  }
  return color;
}

function UserIcon({ user }: Props) {
  return (
    <div
      style={{ background: stringToHexColor(user.name) }}
      className={styles.userIcon}
    >
      <p>{user.name[0]}</p>
    </div>
  );
}

export { UserIcon };
