type User = {
  name: string;
  role: "USER" | "ADMIN";
  isConnected: boolean;
};

const user: User = {
  name: "",
  role: "USER",
  isConnected: false,
};

export { User, user };
