import { Group, Identifiable } from "@dto";

interface Props {
  selectedGroup: Identifiable<Group> | null;
  setSelectedGroup(selectedGroup: Identifiable<Group>): void;
}

export { Props };
