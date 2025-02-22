import { useSelector, useDispatch } from "react-redux";

import { useService } from "@services/types/service.ts";
import { AppDispatch, RootState } from "@/src/core/store.ts";
import { getPersonalGroup } from "@services/core/getPersonalGroup.ts";
import { RetrievePersonalGroupRequest } from "@core/groups/retrievePersonalGroup/types.ts";
import { Group, Identifiable } from "@dto";

interface ViewModel {
  isRequestPending: boolean;
  isRequestSuccess: boolean;
  isRequestFailure: boolean;
  group: Identifiable<Group>;
  retrievePersonalGroup(request: RetrievePersonalGroupRequest): void;
}

function usePersonalGroupRetrieval(): ViewModel {
  const dispatch = useDispatch<AppDispatch>();
  const { apiHttpClient } = useService();

  return {
    isRequestFailure: useSelector(
      (state: RootState) =>
        state.groups.retrievePersonalGroup.request.isRequestFailure
    ),
    isRequestPending: useSelector(
      (state: RootState) =>
        state.groups.retrievePersonalGroup.request.isRequestPending
    ),
    isRequestSuccess: useSelector(
      (state: RootState) =>
        state.groups.retrievePersonalGroup.request.isRequestSuccess
    ),
    group: useSelector(
      (state: RootState) => state.groups.retrievePersonalGroup.group
    ),
    retrievePersonalGroup: (request) =>
      dispatch(getPersonalGroup({ apiClient: apiHttpClient, request })),
  };
}

export { usePersonalGroupRetrieval };
