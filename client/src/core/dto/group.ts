import { Identifiable } from "@/src/core/dto/identifiable.ts";
import { User } from "@/src/core/dto/user.ts";

type Group = {
  name: string;
  description: string;
  isPersonal: boolean;
  members: Identifiable<User>[];
};

const group: Group = {
  name: "",
  description: "",
  isPersonal: false,
  members: [],
};

export { Group, group };
