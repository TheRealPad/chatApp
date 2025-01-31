import { Props } from "./types";
import styles from "./styles.module.scss";

function About(_: Props) {
  return (
    <div className={styles.about}>
      <p>about page</p>
    </div>
  );
}

export { About };
