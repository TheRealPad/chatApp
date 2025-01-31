import { Identifiable, Request, User } from "@dto";

interface RetrieveCurrentUserState {
  user: Identifiable<User>;
  error: string | null;
  request: Request;
}

export { RetrieveCurrentUserState };
