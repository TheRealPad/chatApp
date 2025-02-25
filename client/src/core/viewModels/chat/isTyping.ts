import { Id } from "@dto";
import { IsTypingRequest } from "@core/chat/isTyping/types.ts";
import { getRetrieveIsTypingUsers } from "@core/chat/isTyping/selector.ts";

interface ViewModel {
  users: Id[];
}

function useIsTypingRetrieval(request: IsTypingRequest): ViewModel {
  return {
    users: getRetrieveIsTypingUsers(request.group),
  };
}

export { useIsTypingRetrieval };
