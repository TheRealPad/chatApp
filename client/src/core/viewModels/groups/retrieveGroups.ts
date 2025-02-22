import { useSelector, useDispatch } from "react-redux";

import { useService } from "@services/types/service.ts";
import { AppDispatch, RootState } from "@/src/core/store.ts";
import { getGroups } from "@services/core/getGroups";
import { Group, Identifiable } from "@dto";

interface ViewModel {
  isRequestPending: boolean;
  isRequestSuccess: boolean;
  isRequestFailure: boolean;
  groups: Identifiable<Group>[];
  retrieveGroups(): void;
}

function useGroupsRetrieval(): ViewModel {
  const dispatch = useDispatch<AppDispatch>();
  const { apiHttpClient } = useService();

  return {
    isRequestFailure: useSelector(
      (state: RootState) => state.groups.retrieveGroups.request.isRequestFailure
    ),
    isRequestPending: useSelector(
      (state: RootState) => state.groups.retrieveGroups.request.isRequestPending
    ),
    isRequestSuccess: useSelector(
      (state: RootState) => state.groups.retrieveGroups.request.isRequestSuccess
    ),
    groups: useSelector(
      (state: RootState) => state.groups.retrieveGroups.groups
    ),
    retrieveGroups: () => dispatch(getGroups({ apiClient: apiHttpClient })),
  };
}

export { useGroupsRetrieval };
