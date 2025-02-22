import { createAsyncThunk } from "@reduxjs/toolkit";

import { HttpClient, HttpMethods } from "../types/httpClient";
import { GroupsUseCases } from "@core/groups/types.ts";
import { DeleteGroupRequest } from "@core/groups/deleteGroup/types.ts";

export const deleteGroup = createAsyncThunk(
  GroupsUseCases.deleteGroup,
  async ({
    apiClient,
    request,
  }: {
    apiClient: HttpClient;
    request: DeleteGroupRequest;
  }): Promise<any> => {
    return apiClient.sendHttpRequest({
      endpoint: `/groups/${request.group.uuid}`,
      method: HttpMethods.DELETE,
    });
  }
);
