import { useSelector, useDispatch } from "react-redux";

import { useService } from "@services/types/service.ts";
import { AppDispatch, RootState } from "@/src/core/store.ts";
import { Identifiable, User } from "@dto";
import { getUsers } from "@services/core/getUsers.ts";

interface ViewModel {
  isRequestPending: boolean;
  isRequestSuccess: boolean;
  isRequestFailure: boolean;
  users: Identifiable<User>[];
  retrieveUsers(): void;
}

function useUsersRetrieval(): ViewModel {
  const dispatch = useDispatch<AppDispatch>();
  const { apiHttpClient } = useService();

  return {
    isRequestFailure: useSelector(
      (state: RootState) => state.user.retrieveUsers.request.isRequestFailure
    ),
    isRequestPending: useSelector(
      (state: RootState) => state.user.retrieveUsers.request.isRequestPending
    ),
    isRequestSuccess: useSelector(
      (state: RootState) => state.user.retrieveUsers.request.isRequestSuccess
    ),
    users: useSelector((state: RootState) => state.user.retrieveUsers.users),
    retrieveUsers: () => dispatch(getUsers({ apiClient: apiHttpClient })),
  };
}

export { useUsersRetrieval };
