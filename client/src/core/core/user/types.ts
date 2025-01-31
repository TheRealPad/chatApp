import retrieveCurrentUserReducer from "./retrieveCurrentUser";

enum UserUseCases {
  retrieveCurrentUser = "retrieveCurrentUser",
}

type UserReducersMap = {
  [K in UserUseCases]: typeof retrieveCurrentUserReducer;
};

export { UserUseCases, UserReducersMap };
