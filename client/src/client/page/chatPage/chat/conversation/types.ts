import { Group, Identifiable, User } from "@dto";

interface Props {
  user: Identifiable<User>;
  selectedGroup: Identifiable<Group> | null;
  sendMessage(message: string): void;
}

export { Props };
