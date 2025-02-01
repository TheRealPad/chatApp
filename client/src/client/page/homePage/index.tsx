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
      <input
        placeholder={"username"}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder={"password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={() => username && password && login({ username, password })}
      >
        login
      </button>
      <button
        onClick={() => username && password && register({ username, password })}
      >
        register
      </button>
    </div>
  );
}

export { HomePage };
