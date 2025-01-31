import { createAsyncThunk } from "@reduxjs/toolkit";

import { LoginRequest } from "@core/authentication/login/types.ts";
import { AuthenticationUseCases } from "@core/authentication/types.ts";
import { HttpClient, HttpMethods } from "../types/httpClient";

export const login = createAsyncThunk(
  AuthenticationUseCases.login,
  async ({
    apiClient,
    request,
  }: {
    apiClient: HttpClient;
    request: LoginRequest;
  }): Promise<any> => {
    return apiClient.sendHttpRequest({
      endpoint: "/login",
      method: HttpMethods.POST,
      data: {
        username: request.username,
        password: request.password,
      },
    });
  }
);
