import { Id, Identifiable, Request, User } from "@dto";

interface RetrieveUserFriendsState {
  error: string | null;
  request: Request;
  friends: Identifiable<User>[];
}

interface RetrieveUserFriendsRequest {
  user: Id;
}

export { RetrieveUserFriendsState, RetrieveUserFriendsRequest };
