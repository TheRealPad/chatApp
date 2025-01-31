import { createAsyncThunk } from "@reduxjs/toolkit";

import { HttpClient, HttpMethods } from "../types/httpClient";
import { UserUseCases } from "@core/user/types.ts";

export const retrieveCurrentUser = createAsyncThunk(
  UserUseCases.retrieveCurrentUser,
  async ({ apiClient }: { apiClient: HttpClient }): Promise<any> => {
    return apiClient.sendHttpRequest({
      endpoint: "/whoami",
      method: HttpMethods.GET,
    });
  }
);
