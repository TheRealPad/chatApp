import { createAsyncThunk } from "@reduxjs/toolkit";

import { ChatUseCases } from "@core/chat/types.ts";
import { SendChatRequest } from "@core/chat/sendChat/types.ts";
import { HttpClient, HttpMethods } from "../types/httpClient";

export const sendChat = createAsyncThunk(
  ChatUseCases.sendChat,
  async ({
    apiClient,
    request,
  }: {
    apiClient: HttpClient;
    request: SendChatRequest;
  }): Promise<any> => {
    return apiClient.sendHttpRequest({
      endpoint: "/postChat",
      method: HttpMethods.POST,
      data: {
        content: request.chat.content,
        groupId: request.group.uuid,
      },
    });
  }
);
