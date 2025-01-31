import { Request, Error } from "@dto";

interface LoginState {
  username: string;
  password: string;
  error: Error;
  request: Request;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponseSuccess {
  jwt: string;
  expiration: string;
}

export { LoginState, LoginRequest, LoginResponseSuccess };
