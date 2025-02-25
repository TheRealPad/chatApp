import { Group, Identifiable, User } from "@dto";

interface Props {
  user: Identifiable<User>;
  selectedGroup: Identifiable<Group> | null;
  notifyTyping(
    user: Identifiable<User>,
    group: Identifiable<Group>,
    isTyping: boolean
  ): void;
}

export { Props };
