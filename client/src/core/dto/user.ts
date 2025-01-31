type User = {
  name: string;
  role: "USER" | "ADMIN";
};

const user: User = {
  name: "",
  role: "USER",
};

export { User, user };
