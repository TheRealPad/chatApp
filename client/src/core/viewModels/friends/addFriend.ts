import { useSelector, useDispatch } from "react-redux";

import { useService } from "@services/types/service.ts";
import { AppDispatch, RootState } from "@/src/core/store.ts";
import { AddFriendRequest } from "@core/friends/addFriend/types.ts";
import { addFriend } from "@services/core/addFriend.ts";

interface ViewModel {
  isRequestPending: boolean;
  isRequestSuccess: boolean;
  isRequestFailure: boolean;
  addFriend(request: AddFriendRequest): void;
}

function useAddFriend(): ViewModel {
  const dispatch = useDispatch<AppDispatch>();
  const { apiHttpClient } = useService();

  return {
    isRequestFailure: useSelector(
      (state: RootState) => state.friends.addFriend.request.isRequestFailure
    ),
    isRequestPending: useSelector(
      (state: RootState) => state.friends.addFriend.request.isRequestPending
    ),
    isRequestSuccess: useSelector(
      (state: RootState) => state.friends.addFriend.request.isRequestSuccess
    ),
    addFriend: (request) =>
      dispatch(addFriend({ apiClient: apiHttpClient, request })),
  };
}

export { useAddFriend };
