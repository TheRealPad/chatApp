import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { HomePage } from "src/client/page/homePage";
import { AboutPage } from "src/client/page/aboutPage";
import { ChatPage } from "src/client/page/chatPage";
import { NotFoundPage } from "src/client/page/notFoundPage";
import { retrieveAccessToken } from "@utils/token.ts";

const PublicRoute = ({ element }: { element: JSX.Element }) => {
  return element;
};

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const isAuthenticated = retrieveAccessToken() !== undefined;
  return isAuthenticated ? element : <Navigate to="/" replace />;
};

const AppRouter = () => {
  const isAuthenticated = retrieveAccessToken() !== undefined;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/chat" replace />
            ) : (
              <PublicRoute element={<HomePage />} />
            )
          }
        />
        <Route
          path="/about"
          element={<PublicRoute element={<AboutPage />} />}
        />

        <Route path="/chat" element={<PrivateRoute element={<ChatPage />} />} />
        <Route
          path="/private"
          element={<PrivateRoute element={<AboutPage />} />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export { AppRouter };
