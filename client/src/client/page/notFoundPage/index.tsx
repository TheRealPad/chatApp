import { Props } from "./types";
import styles from "./styles.module.scss";

function NotFoundPage(_: Props) {
  return (
    <div className={styles.notFound}>
      <p>not found</p>
    </div>
  );
}

export { NotFoundPage };
