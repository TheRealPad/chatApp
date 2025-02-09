import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "access_token";

function storeAccessToken(token: string) {
  Cookies.set(ACCESS_TOKEN_KEY, token, { expires: 0.5 });
}

function retrieveAccessToken() {
  return Cookies.get(ACCESS_TOKEN_KEY);
}

function deleteAccessToken() {
  Cookies.remove(ACCESS_TOKEN_KEY);
}

export { storeAccessToken, retrieveAccessToken, deleteAccessToken };
