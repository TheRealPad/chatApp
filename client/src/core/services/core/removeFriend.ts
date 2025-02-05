import { createAsyncThunk } from "@reduxjs/toolkit";

import { HttpClient, HttpMethods } from "../types/httpClient";
import { FriendsUseCases } from "@core/friends/types.ts";
import { RemoveFriendRequest } from "@core/friends/removeFriend/types.ts";

export const removeFriend = createAsyncThunk(
  FriendsUseCases.removeFriend,
  async ({
    apiClient,
    request,
  }: {
    apiClient: HttpClient;
    request: RemoveFriendRequest;
  }): Promise<any> => {
    return apiClient.sendHttpRequest({
      endpoint: `/removeFriend/${request.friend.uuid}`,
      method: HttpMethods.DELETE,
    });
  }
);
