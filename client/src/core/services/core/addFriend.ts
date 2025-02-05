import { createAsyncThunk } from "@reduxjs/toolkit";

import { HttpClient, HttpMethods } from "../types/httpClient";
import { FriendsUseCases } from "@core/friends/types.ts";
import { AddFriendRequest } from "@core/friends/addFriend/types.ts";

export const addFriend = createAsyncThunk(
  FriendsUseCases.addFriend,
  async ({
    apiClient,
    request,
  }: {
    apiClient: HttpClient;
    request: AddFriendRequest;
  }): Promise<any> => {
    return apiClient.sendHttpRequest({
      endpoint: `/addFriend/${request.friend.uuid}`,
      method: HttpMethods.POST,
    });
  }
);
