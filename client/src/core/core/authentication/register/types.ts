import { Error, Request } from "@dto";

interface RegisterState {
  username: string;
  password: string;
  error: Error;
  request: Request;
}

interface RegisterRequest {
  username: string;
  password: string;
}

interface RegisterResponseSuccess {
  jwt: string;
  expiration: string;
}

export { RegisterState, RegisterRequest, RegisterResponseSuccess };
