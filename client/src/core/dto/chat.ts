import { Identifiable } from "@/src/core/dto/identifiable.ts";
import { user, User } from "@/src/core/dto/user.ts";

type Chat = {
  sender: Identifiable<User>;
  content: string;
  timestamp: number;
};

const chat: Chat = {
  sender: { ...user, uuid: "" },
  content: "",
  timestamp: 0,
};

export { Chat, chat };
