import { Props } from "./types";
import styles from "./styles.module.scss";

function AboutPage(_: Props) {
  return (
    <div className={styles.about}>
      <p>about page</p>
    </div>
  );
}

export { AboutPage };
