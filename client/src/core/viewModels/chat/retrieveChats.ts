import { useDispatch } from "react-redux";

import { useService } from "@services/types/service.ts";
import { getChats } from "@services/core/getChats.ts";
import { AppDispatch } from "@/src/core/store.ts";
import { Chat, Identifiable } from "@dto";
import { RetrieveChatsRequest } from "@core/chat/retrieveChats/types.ts";
import {
  getRetrieveChatsChats,
  getRetrieveChatsRequestFailure,
  getRetrieveChatsRequestPending,
  getRetrieveChatsRequestSuccess,
} from "@core/chat/retrieveChats/selector.ts";

interface ViewModel {
  isRequestPending: boolean;
  isRequestSuccess: boolean;
  isRequestFailure: boolean;
  chats: Identifiable<Chat>[];
  retrieveChats(request: RetrieveChatsRequest): void;
}

function useChatsRetrieval(request: RetrieveChatsRequest): ViewModel {
  const dispatch = useDispatch<AppDispatch>();
  const { apiHttpClient } = useService();

  return {
    isRequestFailure: getRetrieveChatsRequestFailure(request.group),
    isRequestSuccess: getRetrieveChatsRequestSuccess(request.group),
    isRequestPending: getRetrieveChatsRequestPending(request.group),
    chats: getRetrieveChatsChats(request.group),
    retrieveChats: (request) =>
      dispatch(getChats({ apiClient: apiHttpClient, request })),
  };
}

export { useChatsRetrieval };
