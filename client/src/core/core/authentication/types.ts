import loginReducer from "./login/index";
import registerReducer from "./register/index";

enum AuthenticationUseCases {
  login = "login",
  register = "register",
}

type AuthenticationReducersMap = {
  [K in AuthenticationUseCases]: typeof loginReducer | typeof registerReducer;
};

export { AuthenticationUseCases, AuthenticationReducersMap };
