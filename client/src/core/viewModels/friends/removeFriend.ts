import { useSelector, useDispatch } from "react-redux";

import { useService } from "@services/types/service.ts";
import { AppDispatch, RootState } from "@/src/core/store.ts";
import { RemoveFriendRequest } from "@core/friends/removeFriend/types.ts";
import { removeFriend } from "@services/core/removeFriend.ts";

interface ViewModel {
  isRequestPending: boolean;
  isRequestSuccess: boolean;
  isRequestFailure: boolean;
  removeFriend(request: RemoveFriendRequest): void;
}

function useFriendRemoval(): ViewModel {
  const dispatch = useDispatch<AppDispatch>();
  const { apiHttpClient } = useService();

  return {
    isRequestFailure: useSelector(
      (state: RootState) => state.friends.removeFriend.request.isRequestFailure
    ),
    isRequestPending: useSelector(
      (state: RootState) => state.friends.removeFriend.request.isRequestPending
    ),
    isRequestSuccess: useSelector(
      (state: RootState) => state.friends.removeFriend.request.isRequestSuccess
    ),
    removeFriend: (request) =>
      dispatch(removeFriend({ apiClient: apiHttpClient, request })),
  };
}

export { useFriendRemoval };
