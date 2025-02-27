import { Group, Identifiable, User } from "@dto";

interface Props {
  user: Identifiable<User>;
  selectedGroup: Identifiable<Group> | null;
  setSelectedGroup(selectedGroup: Identifiable<Group> | null): void;
}

export { Props };
