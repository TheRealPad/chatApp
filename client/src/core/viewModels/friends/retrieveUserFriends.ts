import { useSelector, useDispatch } from "react-redux";

import { useService } from "@services/types/service.ts";
import { AppDispatch, RootState } from "@/src/core/store.ts";
import { Identifiable, User } from "@dto";
import { RetrieveUserFriendsRequest } from "@core/friends/retrieveUserFriends/types.ts";
import { getUserFriends } from "@services/core/getUserFriends.ts";

interface ViewModel {
  isRequestPending: boolean;
  isRequestSuccess: boolean;
  isRequestFailure: boolean;
  friends: Identifiable<User>[];
  retrieveUserFriends(request: RetrieveUserFriendsRequest): void;
}

function useUserFriendsRetrieval(): ViewModel {
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
    friends: useSelector(
      (state: RootState) => state.friends.retrieveUserFriends.friends
    ),
    retrieveUserFriends: (request) =>
      dispatch(getUserFriends({ apiClient: apiHttpClient, request })),
  };
}

export { useUserFriendsRetrieval };
