import { Client } from "@stomp/stompjs";
import { Identifiable, User } from "@dto";

interface Props {
  stompClient: Client;
  user: Identifiable<User>;
}

export { Props };
