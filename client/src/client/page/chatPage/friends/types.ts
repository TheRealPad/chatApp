import { Group, Identifiable, User } from "@dto";

interface Props {
  user: Identifiable<User>;
  setSelectedGroup(selectedGroup: Identifiable<Group>): void;
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

export { Props, modalStyle };
