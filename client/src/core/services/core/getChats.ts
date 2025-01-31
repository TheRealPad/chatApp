import { createAsyncThunk } from "@reduxjs/toolkit";

import { HttpClient } from "../types/httpClient";
import { ChatUseCases } from "@core/chat/types.ts";

export const getChats = createAsyncThunk(
  ChatUseCases.retrieveChats,
  async ({ apiClient }: { apiClient: HttpClient }, thunkAPI): Promise<any> => {
    try {
      console.log(apiClient);
      const data = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(["ok"]);
        }, 1000);
      });
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
