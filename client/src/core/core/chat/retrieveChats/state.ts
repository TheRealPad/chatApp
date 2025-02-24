import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { getChats } from "@services/core/getChats.ts";
import { RetrieveChatsState } from "./types.ts";
import { Chat, Identifiable } from "@dto";

function retrieveChatsStateHandler() {
  return (builder: ActionReducerMapBuilder<RetrieveChatsState>) => {
    builder
      .addCase(getChats.pending, (state, action) => {
        const group = action.meta.arg.request.group;
        const index = state.groups.findIndex(
          (g) => g.group.uuid === group.uuid
        );
        state.groups =
          index >= 0
            ? [
                ...state.groups.slice(0, index),
                {
                  chats: [],
                  error: null,
                  request: {
                    isRequestSuccess: false,
                    isRequestPending: true,
                    isRequestFailure: false,
                  },
                  group,
                },
                ...state.groups.slice(index + 1),
              ]
            : [
                ...state.groups,
                {
                  chats: [],
                  error: null,
                  request: {
                    isRequestSuccess: false,
                    isRequestPending: true,
                    isRequestFailure: false,
                  },
                  group,
                },
              ];
      })
      .addCase(getChats.fulfilled, (state, action) => {
        const group = action.meta.arg.request.group;
        const index = state.groups.findIndex(
          (g) => g.group.uuid === group.uuid
        );
        const chats: Identifiable<Chat>[] = action.payload.map((chat: any) => ({
          sender: {
            name: chat.sender.username,
            role: chat.sender.role,
            isConnected: false,
            uuid: chat.sender.uuid,
          },
          uuid: chat.uuid,
          content: chat.content,
          timestamp: new Date(chat.createdDate).getTime(),
        }));
        state.groups =
          index >= 0
            ? [
                ...state.groups.slice(0, index),
                {
                  chats: chats.sort((a, b) => a.timestamp - b.timestamp),
                  error: null,
                  request: {
                    isRequestSuccess: true,
                    isRequestPending: false,
                    isRequestFailure: false,
                  },
                  group,
                },
                ...state.groups.slice(index + 1),
              ]
            : [
                ...state.groups,
                {
                  chats: chats.sort((a, b) => a.timestamp - b.timestamp),
                  error: null,
                  request: {
                    isRequestSuccess: true,
                    isRequestPending: false,
                    isRequestFailure: false,
                  },
                  group,
                },
              ];
      })
      .addCase(getChats.rejected, (state, action) => {
        const group = action.meta.arg.request.group;
        const index = state.groups.findIndex(
          (g) => g.group.uuid === group.uuid
        );
        state.groups =
          index >= 0
            ? [
                ...state.groups.slice(0, index),
                {
                  chats: [],
                  error: null,
                  request: {
                    isRequestSuccess: false,
                    isRequestPending: false,
                    isRequestFailure: true,
                  },
                  group,
                },
                ...state.groups.slice(index + 1),
              ]
            : [
                ...state.groups,
                {
                  chats: [],
                  error: null,
                  request: {
                    isRequestSuccess: false,
                    isRequestPending: false,
                    isRequestFailure: true,
                  },
                  group,
                },
              ];
      });
  };
}

export { retrieveChatsStateHandler };
