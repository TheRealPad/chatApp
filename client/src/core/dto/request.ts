type Request = {
  isRequestPending: boolean;
  isRequestSuccess: boolean;
  isRequestFailure: boolean;
};

const request = {
  isRequestPending: false,
  isRequestFailure: false,
  isRequestSuccess: false,
};

export { Request, request };
