import { Identifiable, Request, User } from "@dto";

interface AddFriendState {
  error: string | null;
  request: Request;
}

interface AddFriendRequest {
  friend: Identifiable<User>;
}

export { AddFriendState, AddFriendRequest };
