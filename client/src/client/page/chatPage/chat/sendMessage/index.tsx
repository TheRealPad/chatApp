import React from "react";

import { Props } from "./types";
import { sendChatPublisher } from "@component/webSocket/publishers.ts";

function SendMessage(props: Props) {
  const [message, setMessage] = React.useState("");

  const sendMessage = () => {
    if (message.trim() !== "" && props.user.name.trim() !== "") {
      const chatMessage = {
        sender: props.user.name,
        content: message,
        timestamp: new Date().getTime(),
      };

      sendChatPublisher(props.stompClient, chatMessage);

      setMessage("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={props.user.name}
      />
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export { SendMessage };
