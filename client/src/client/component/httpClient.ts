import axios from "axios";
import {
  HttpClient,
  HttpMethods,
  RequestConfig,
} from "@/src/core/services/types/httpClient.ts";
import { retrieveAccessToken } from "@/src/core/utils/token.ts";

function sendRequest<Response>(config: RequestConfig): Promise<Response> {
  const requestData =
    config.method === HttpMethods.GET
      ? { params: config.data }
      : { data: config.data };

  const accessToken = retrieveAccessToken();

  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache=no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }), // Add Authorization only if accessToken exists
    ...cleanHeaders(config.headers),
  };

  return new Promise<Response>((resolve, reject) =>
    axios({
      url: config.baseUrl + config.endpoint,
      method: config.method,
      headers,
      ...requestData,
    })
      .then(({ data }) => resolve(data))
      .catch((error) =>
        reject(
          !!error.response
            ? error.response.data
            : !!error.request
            ? error.request
            : error
        )
      )
  );
}

function cleanHeaders(headers: { [p: string]: string } | undefined) {
  return headers
    ? Object.entries(headers)
        .filter(([_, value]) => !!value)
        .reduce(
          (nextHeaders, [key, value]) => ({ ...nextHeaders, [key]: value }),
          {}
        )
    : undefined;
}

function createHttpClient(): HttpClient {
  return {
    sendHttpRequest<Response>(config: RequestConfig): Promise<Response> {
      return sendRequest({
        ...config,
        headers: cleanHeaders(config.headers),
      });
    },
  };
}

export { createHttpClient };
