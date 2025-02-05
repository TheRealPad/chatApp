import { createAsyncThunk } from "@reduxjs/toolkit";

import { HttpClient, HttpMethods } from "../types/httpClient";
import { UserUseCases } from "@core/user/types.ts";

export const getUsers = createAsyncThunk(
  UserUseCases.retrieveUsers,
  async ({ apiClient }: { apiClient: HttpClient }): Promise<any> => {
    return apiClient.sendHttpRequest({
      endpoint: "/users",
      method: HttpMethods.GET,
    });
  }
);
