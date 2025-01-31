import { createAsyncThunk } from "@reduxjs/toolkit";

import { ChatUseCases } from "@core/chat/types.ts";
import { SendChatRequest } from "@core/chat/sendChat/types.ts";
import { HttpClient } from "../types/httpClient";

export const sendChat = createAsyncThunk(
  ChatUseCases.sendChat,
  async (
    { apiClient, request }: { apiClient: HttpClient; request: SendChatRequest },
    thunkAPI
  ): Promise<any> => {
    try {
      console.log(apiClient);
      const data = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(request.chat);
        }, 1000);
      });
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
