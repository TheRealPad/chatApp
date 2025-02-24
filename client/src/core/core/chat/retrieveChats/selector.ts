import { Chat, Group, Identifiable } from "@dto";
import { useSelector } from "react-redux";
import { RootState } from "@/src/core/store.ts";

function getRetrieveChatsRequestPending(
  selectedGroup: Identifiable<Group>
): boolean {
  return useSelector((state: RootState) => {
    const g = state.chat.retrieveChats.groups.find(
      ({ group }) => group.uuid === selectedGroup.uuid
    );
    return g ? g.request.isRequestPending : false;
  });
}

function getRetrieveChatsRequestSuccess(
  selectedGroup: Identifiable<Group>
): boolean {
  return useSelector((state: RootState) => {
    const g = state.chat.retrieveChats.groups.find(
      ({ group }) => group.uuid === selectedGroup.uuid
    );
    return g ? g.request.isRequestSuccess : false;
  });
}

function getRetrieveChatsRequestFailure(
  selectedGroup: Identifiable<Group>
): boolean {
  return useSelector((state: RootState) => {
    const g = state.chat.retrieveChats.groups.find(
      ({ group }) => group.uuid === selectedGroup.uuid
    );
    return g ? g.request.isRequestFailure : false;
  });
}

function getRetrieveChatsChats(
  selectedGroup: Identifiable<Group>
): Identifiable<Chat>[] {
  return useSelector((state: RootState) => {
    const g = state.chat.retrieveChats.groups.find(
      ({ group }) => group.uuid === selectedGroup.uuid
    );
    return g ? g.chats : [];
  });
}

export {
  getRetrieveChatsRequestPending,
  getRetrieveChatsRequestSuccess,
  getRetrieveChatsRequestFailure,
  getRetrieveChatsChats,
};
