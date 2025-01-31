type Error = {
  status: number;
  error: string;
  message: string;
};

const error: Error = {
  status: 400,
  error: "",
  message: "",
};

export { Error, error };
