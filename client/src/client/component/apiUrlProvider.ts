import {
  HttpClient,
  RequestConfig,
} from "@/src/core/services/types/httpClient.ts";

function createApiUrlProvider(httpClient: HttpClient): HttpClient {
  return {
    sendHttpRequest<Response>(config: RequestConfig): Promise<Response> {
      return httpClient.sendHttpRequest({
        baseUrl: "/api",
        ...config,
      });
    },
  };
}

export { createApiUrlProvider };
