import { Group, Identifiable, User } from "@dto";

interface Props {
  user: Identifiable<User>;
  selectedGroup: Identifiable<Group> | null;
}

export { Props };
