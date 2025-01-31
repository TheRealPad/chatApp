enum HttpMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

type RequestConfig = {
  endpoint: string;
  method: HttpMethods;
  baseUrl?: string;
  data?: object | string;
  headers?: {
    [key: string]: string;
  };
};

interface HttpClient {
  sendHttpRequest<Response>(config: RequestConfig): Promise<Response>;
}

export { HttpClient, HttpMethods, RequestConfig };
