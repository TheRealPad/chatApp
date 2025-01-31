import { useSelector, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "@/src/core/store.ts";
import { useService } from "@services/types/service.ts";
import { login } from "@services/core/login.ts";
import { LoginRequest } from "@core/authentication/login/types.ts";

interface ViewModel {
  isRequestPending: boolean;
  isRequestSuccess: boolean;
  isRequestFailure: boolean;
  login(request: LoginRequest): void;
}

function useLogin(): ViewModel {
  const dispatch = useDispatch<AppDispatch>();
  const { apiHttpClient } = useService();

  return {
    isRequestFailure: useSelector(
      (state: RootState) => state.authentication.login.request.isRequestFailure
    ),
    isRequestPending: useSelector(
      (state: RootState) => state.authentication.login.request.isRequestPending
    ),
    isRequestSuccess: useSelector(
      (state: RootState) => state.authentication.login.request.isRequestSuccess
    ),
    login: (request) => dispatch(login({ apiClient: apiHttpClient, request })),
  };
}

export { useLogin };
