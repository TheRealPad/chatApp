import { Props } from "./types";
import styles from "./styles.module.scss";
import { deleteAccessToken } from "@/src/core/utils/token.ts";

function DisconnectButton({}: Props) {
  const disconnect = () => {
    deleteAccessToken();
    window.location.reload();
  };
  return (
    <div className={styles.disconnectButton}>
      <button onClick={disconnect}>disconnect</button>
    </div>
  );
}

export { DisconnectButton };
