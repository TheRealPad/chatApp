import { useSelector, useDispatch } from "react-redux";

import { useService } from "@services/types/service.ts";
import { getChats } from "@services/core/getChats.ts";
import { AppDispatch } from "@/src/core/store.ts";

interface ViewModel {
  isRequestPending: boolean;
  isRequestSuccess: boolean;
  isRequestFailure: boolean;
  chats: string[];
  retrieveChats(): void;
}

function useChatsRetrieval(): ViewModel {
  const dispatch = useDispatch<AppDispatch>();
  const { apiHttpClient } = useService();

  return {
    isRequestFailure: useSelector(
      (state: any) => state.chat.retrieveChats.request.isRequestFailure
    ),
    isRequestPending: useSelector(
      (state: any) => state.chat.retrieveChats.request.isRequestPending
    ),
    isRequestSuccess: useSelector(
      (state: any) => state.chat.retrieveChats.request.isRequestSuccess
    ),
    chats: useSelector((state: any) => state.chat.retrieveChats.chats),
    retrieveChats: () => dispatch(getChats({ apiClient: apiHttpClient })),
  };
}

export { useChatsRetrieval };
