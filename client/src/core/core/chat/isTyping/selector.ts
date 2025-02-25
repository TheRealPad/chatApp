import { Group, Id, Identifiable } from "@dto";
import { useSelector } from "react-redux";
import { RootState } from "@/src/core/store.ts";

function getRetrieveIsTypingUsers(selectedGroup: Identifiable<Group>): Id[] {
  return useSelector((state: RootState) => {
    const g = state.chat.isTyping.groups.find(
      ({ group }) => group.uuid === selectedGroup.uuid
    );
    return g ? g.users : [];
  });
}

export { getRetrieveIsTypingUsers };
