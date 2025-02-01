import { Client } from "@stomp/stompjs";
import { Chat } from "@dto";

function connectionPublisher(stompClient: Client, uniqueIdRef: string) {
  stompClient.publish({
    destination: "/app/connect",
    body: JSON.stringify(uniqueIdRef),
  });
}

function disconnectionPublisher(stompClient: Client, uniqueIdRef: string) {
  stompClient.publish({
    destination: "/app/disconnect",
    body: JSON.stringify(uniqueIdRef),
  });
}

function sendChatPublisher(stompClient: Client, chatMessage: Chat) {
  stompClient.publish({
    destination: "/app/chat",
    body: JSON.stringify(chatMessage),
  });
}

export { connectionPublisher, disconnectionPublisher, sendChatPublisher };
