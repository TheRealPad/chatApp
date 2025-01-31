import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";

import { createApiUrlProvider } from "@/src/client/component/apiUrlProvider.ts";
import { createHttpClient } from "@/src/client/component/httpClient.ts";
import store from "@/src/core/store.ts";
import { ServiceContext } from "@/src/core/services/types/service.ts";
import { AppRouter } from "@app/router";
import "./index.scss";

function main() {
  const httpClient = createHttpClient();
  const apiHttpClient = createApiUrlProvider(httpClient);

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Provider store={store}>
        <ServiceContext.Provider value={{ apiHttpClient }}>
          <AppRouter />
        </ServiceContext.Provider>
      </Provider>
    </StrictMode>
  );
}

main();
