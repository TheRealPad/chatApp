import { Identifiable, Request, User } from "@dto";

interface RetrieveUsersState {
  users: Identifiable<User>[];
  error: string | null;
  request: Request;
}

export { RetrieveUsersState };
