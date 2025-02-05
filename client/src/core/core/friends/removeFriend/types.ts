import { Identifiable, Request, User } from "@dto";

interface RemoveFriendState {
  error: string | null;
  request: Request;
}

interface RemoveFriendRequest {
  friend: Identifiable<User>;
}

export { RemoveFriendState, RemoveFriendRequest };
