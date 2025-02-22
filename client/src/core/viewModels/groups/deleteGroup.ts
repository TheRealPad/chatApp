import { useSelector, useDispatch } from "react-redux";

import { useService } from "@services/types/service.ts";
import { AppDispatch, RootState } from "@/src/core/store.ts";
import { deleteGroup } from "@services/core/deleteGroup";
import { DeleteGroupRequest } from "@core/groups/deleteGroup/types.ts";

interface ViewModel {
  isRequestPending: boolean;
  isRequestSuccess: boolean;
  isRequestFailure: boolean;
  deleteGroup(request: DeleteGroupRequest): void;
}

function useGroupRemoval(): ViewModel {
  const dispatch = useDispatch<AppDispatch>();
  const { apiHttpClient } = useService();

  return {
    isRequestFailure: useSelector(
      (state: RootState) => state.groups.deleteGroup.request.isRequestFailure
    ),
    isRequestPending: useSelector(
      (state: RootState) => state.groups.deleteGroup.request.isRequestPending
    ),
    isRequestSuccess: useSelector(
      (state: RootState) => state.groups.deleteGroup.request.isRequestSuccess
    ),
    deleteGroup: (request) =>
      dispatch(deleteGroup({ apiClient: apiHttpClient, request })),
  };
}

export { useGroupRemoval };
