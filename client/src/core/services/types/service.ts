import { createContext, useContext } from "react";

import { HttpClient } from "./httpClient.ts";

interface Service {
  apiHttpClient: HttpClient;
}

const ServiceContext = createContext<Service | null>(null);

function useService() {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useService must be used within ServiceProvider");
  }
  return context;
}

export { useService, ServiceContext, Service };
