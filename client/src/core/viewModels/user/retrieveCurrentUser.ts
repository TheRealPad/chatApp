import { useSelector, useDispatch } from "react-redux";

import { useService } from "@services/types/service.ts";
import { AppDispatch, RootState } from "@/src/core/store.ts";
import { Identifiable, User } from "@dto";
import { retrieveCurrentUser } from "@services/core/retrieveCurrentUser.ts";

interface ViewModel {
  isRequestPending: boolean;
  isRequestSuccess: boolean;
  isRequestFailure: boolean;
  user: Identifiable<User>;
  retrieveCurrentUser(): void;
}

function useCurrentUserRetrieval(): ViewModel {
  const dispatch = useDispatch<AppDispatch>();
  const { apiHttpClient } = useService();

  return {
    isRequestFailure: useSelector(
      (state: RootState) =>
        state.user.retrieveCurrentUser.request.isRequestFailure
    ),
    isRequestPending: useSelector(
      (state: RootState) =>
        state.user.retrieveCurrentUser.request.isRequestPending
    ),
    isRequestSuccess: useSelector(
      (state: RootState) =>
        state.user.retrieveCurrentUser.request.isRequestSuccess
    ),
    user: useSelector(
      (state: RootState) => state.user.retrieveCurrentUser.user
    ),
    retrieveCurrentUser: () =>
      dispatch(retrieveCurrentUser({ apiClient: apiHttpClient })),
  };
}

export { useCurrentUserRetrieval };
