import { useSelector, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "@/src/core/store.ts";
import { useService } from "@services/types/service.ts";
import { register } from "@services/core/register.ts";
import { RegisterRequest } from "@core/authentication/register/types.ts";

interface ViewModel {
  isRequestPending: boolean;
  isRequestSuccess: boolean;
  isRequestFailure: boolean;
  register(request: RegisterRequest): void;
}

function useRegistration(): ViewModel {
  const dispatch = useDispatch<AppDispatch>();
  const { apiHttpClient } = useService();

  return {
    isRequestFailure: useSelector(
      (state: RootState) =>
        state.authentication.register.request.isRequestFailure
    ),
    isRequestPending: useSelector(
      (state: RootState) =>
        state.authentication.register.request.isRequestPending
    ),
    isRequestSuccess: useSelector(
      (state: RootState) =>
        state.authentication.register.request.isRequestSuccess
    ),
    register: (request) =>
      dispatch(register({ apiClient: apiHttpClient, request })),
  };
}

export { useRegistration };
