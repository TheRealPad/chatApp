import { createAsyncThunk } from "@reduxjs/toolkit";

import { HttpClient, HttpMethods } from "../types/httpClient";
import { GroupsUseCases } from "@core/groups/types.ts";

export const getGroups = createAsyncThunk(
  GroupsUseCases.retrieveGroups,
  async ({ apiClient }: { apiClient: HttpClient }): Promise<any> => {
    const groups: any = await apiClient.sendHttpRequest({
      endpoint: "/groups/my",
      method: HttpMethods.GET,
    });
    return await Promise.all(
      groups.map(async (group: any) => {
        const members: any = await apiClient.sendHttpRequest({
          endpoint: `/groups/${group.uuid}/members`,
          method: HttpMethods.GET,
        });
        return { ...group, members: members._embedded.users };
      })
    );
  }
);
