import { Identifiable } from "@/src/core/dto/identifiable.ts";
import { User } from "@/src/core/dto/user.ts";

type Group = {
  name: string;
  description: string;
  isPersonal: boolean;
  members: Identifiable<User>[];
  unseenMessages: number;
};

const group: Group = {
  name: "",
  description: "",
  isPersonal: false,
  members: [],
  unseenMessages: 0,
};

export { Group, group };
