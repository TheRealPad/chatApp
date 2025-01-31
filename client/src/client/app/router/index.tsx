import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { Home } from "@page/home";
import { About } from "@page/about";
import { Chat } from "@page/chat";
import { NotFound } from "@page/notFound";
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
              <PublicRoute element={<Home />} />
            )
          }
        />
        <Route path="/about" element={<PublicRoute element={<About />} />} />

        <Route path="/chat" element={<PrivateRoute element={<Chat />} />} />
        <Route path="/private" element={<PrivateRoute element={<About />} />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export { AppRouter };
