import { useSelector, useDispatch } from "react-redux";

import { AppDispatch } from "@/src/core/store.ts";
import { useService } from "@services/types/service.ts";
import { sendChat } from "@services/core/sendChat.ts";
import { SendChatRequest } from "@core/chat/sendChat/types.ts";

interface ViewModel {
  isRequestPending: boolean;
  isRequestSuccess: boolean;
  isRequestFailure: boolean;
  sendChat(request: SendChatRequest): void;
}

function useChatSender(): ViewModel {
  const dispatch = useDispatch<AppDispatch>();
  const { apiHttpClient } = useService();

  return {
    isRequestFailure: useSelector(
      (state: any) => state.chat.sendChat.request.isRequestFailure
    ),
    isRequestPending: useSelector(
      (state: any) => state.chat.sendChat.request.isRequestPending
    ),
    isRequestSuccess: useSelector(
      (state: any) => state.chat.sendChat.request.isRequestSuccess
    ),
    sendChat: (request) =>
      dispatch(sendChat({ apiClient: apiHttpClient, request })),
  };
}

export { useChatSender };
