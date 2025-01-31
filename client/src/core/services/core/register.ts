import { createAsyncThunk } from "@reduxjs/toolkit";

import { RegisterRequest } from "@core/authentication/register/types.ts";
import { AuthenticationUseCases } from "@core/authentication/types.ts";
import { HttpClient, HttpMethods } from "../types/httpClient";

export const register = createAsyncThunk(
  AuthenticationUseCases.register,
  async ({
    apiClient,
    request,
  }: {
    apiClient: HttpClient;
    request: RegisterRequest;
  }): Promise<any> => {
    return apiClient.sendHttpRequest({
      endpoint: "/register",
      method: HttpMethods.POST,
      data: {
        username: request.username,
        password: request.password,
      },
    });
  }
);
