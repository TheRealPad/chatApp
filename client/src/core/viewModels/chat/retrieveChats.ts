import { useSelector, useDispatch } from "react-redux";

import { useService } from "@services/types/service.ts";
import { getChats } from "@services/core/getChats.ts";
import { AppDispatch, RootState } from "@/src/core/store.ts";
import { Chat } from "@dto";

interface ViewModel {
  isRequestPending: boolean;
  isRequestSuccess: boolean;
  isRequestFailure: boolean;
  chats: Chat[];
  retrieveChats(): void;
}

function useChatsRetrieval(): ViewModel {
  const dispatch = useDispatch<AppDispatch>();
  const { apiHttpClient } = useService();

  return {
    isRequestFailure: useSelector(
      (state: RootState) => state.chat.retrieveChats.request.isRequestFailure
    ),
    isRequestPending: useSelector(
      (state: RootState) => state.chat.retrieveChats.request.isRequestPending
    ),
    isRequestSuccess: useSelector(
      (state: RootState) => state.chat.retrieveChats.request.isRequestSuccess
    ),
    chats: useSelector((state: RootState) => state.chat.retrieveChats.chats),
    retrieveChats: () => dispatch(getChats({ apiClient: apiHttpClient })),
  };
}

export { useChatsRetrieval };
