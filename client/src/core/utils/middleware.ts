import { Middleware } from "@reduxjs/toolkit";

const loggerMiddleware: Middleware = () => (next) => (action: any) => {
  console.group(action.type);
  console.log("Action:", action.payload);
  const result = next(action);
  console.groupEnd();
  return result;
};

export { loggerMiddleware };
