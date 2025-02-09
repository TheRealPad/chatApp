import React from "react";

import { Props } from "./types";
import styles from "./styles.module.scss";
import { useLogin, useRegistration } from "@viewModels";
import { useNavigate } from "react-router-dom";

function HomePage(_: Props) {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const navigate = useNavigate();
  const { login, isRequestSuccess: isLoginSuccess } = useLogin();
  const { register, isRequestSuccess } = useRegistration();

  React.useEffect(() => {
    username && password && isRequestSuccess && login({ username, password });
  }, [isRequestSuccess]);

  React.useEffect(() => {
    isLoginSuccess && navigate("/chat");
  }, [isLoginSuccess]);

  return (
    <div className={styles.home}>
      <div className={styles.head}>
        <h1>ChattApp</h1>
        <h3>Chat app to communicate with your friends or groups</h3>
        <h5>Redux + websocket</h5>
      </div>
      <div className={styles.form}>
        <div className={styles.inputs}>
          <input
            className={styles.input}
            placeholder={"username"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.buttons}>
          <button
            onClick={() =>
              username && password && login({ username, password })
            }
          >
            login
          </button>
          <button
            onClick={() =>
              username && password && register({ username, password })
            }
          >
            register
          </button>
        </div>
      </div>
    </div>
  );
}

export { HomePage };
