import { createAsyncThunk } from "@reduxjs/toolkit";

import { HttpClient, HttpMethods } from "../types/httpClient";
import { GroupsUseCases } from "@core/groups/types.ts";
import { RetrievePersonalGroupRequest } from "@core/groups/retrievePersonalGroup/types.ts";

export const getPersonalGroup = createAsyncThunk(
  GroupsUseCases.retrievePersonalGroup,
  async ({
    apiClient,
    request,
  }: {
    apiClient: HttpClient;
    request: RetrievePersonalGroupRequest;
  }): Promise<any> => {
    return apiClient.sendHttpRequest({
      endpoint: "/groups/personal",
      method: HttpMethods.POST,
      data: {
        user1: request.user1,
        user2: request.user2,
      },
    });
  }
);
