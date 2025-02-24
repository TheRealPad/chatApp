import { createAsyncThunk } from "@reduxjs/toolkit";

import { HttpClient, HttpMethods } from "../types/httpClient";
import { ChatUseCases } from "@core/chat/types.ts";
import { RetrieveChatsRequest } from "@core/chat/retrieveChats/types.ts";

export const getChats = createAsyncThunk(
  ChatUseCases.retrieveChats,
  async ({
    apiClient,
    request,
  }: {
    apiClient: HttpClient;
    request: RetrieveChatsRequest;
  }): Promise<any> => {
    return apiClient.sendHttpRequest({
      endpoint: `/groupChat/${request.group.uuid}`,
      method: HttpMethods.GET,
    });
  }
);
