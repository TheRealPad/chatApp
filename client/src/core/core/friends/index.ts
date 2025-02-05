import { combineReducers } from "@reduxjs/toolkit";

import retrieveUserFriendsReducer from "./retrieveUserFriends";
import addFriendReducer from "./addFriend";
import removeFriendReducer from "./removeFriend";

const friendReducer = combineReducers({
  retrieveUserFriends: retrieveUserFriendsReducer,
  addFriend: addFriendReducer,
  removeFriend: removeFriendReducer,
});

export { friendReducer };
