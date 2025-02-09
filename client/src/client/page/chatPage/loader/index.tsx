import styles from "./styles.module.scss";

function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles.content} />
    </div>
  );
}

export { Loader };
