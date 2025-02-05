import { createAsyncThunk } from "@reduxjs/toolkit";

import { HttpClient, HttpMethods } from "../types/httpClient";
import { FriendsUseCases } from "@core/friends/types.ts";
import { RetrieveUserFriendsRequest } from "@core/friends/retrieveUserFriends/types.ts";

export const getUserFriends = createAsyncThunk(
  FriendsUseCases.retrieveUserFriends,
  async ({
    apiClient,
    request,
  }: {
    apiClient: HttpClient;
    request: RetrieveUserFriendsRequest;
  }): Promise<any> => {
    return apiClient.sendHttpRequest({
      endpoint: `/users/${request.user}/friends`,
      method: HttpMethods.GET,
    });
  }
);
