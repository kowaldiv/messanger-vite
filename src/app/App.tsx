import { Route, Routes } from "react-router-dom";
import "./App.css";
import NotFoundPage from "./NotFoundPage";
import SignIn from "./auth/sign-in/page";
import SignUp from "./auth/sign-up/page";
import { DASHBOARD_PAGES } from "../config/pages-url.config";
import ForgotPassword from "./auth/forgot-password/page";
import { ResetPassword } from "./auth/reset-password/page";
import { Home } from "./home/page";
import { ProtectedRoute } from "../middleware/ProtectedRoute";
import EmailVerification from "./auth/email-verification/page";

function App() {
  return (
    <Routes>
      <Route path={DASHBOARD_PAGES.SIGN_IN} element={<SignIn />} />
      <Route path={DASHBOARD_PAGES.SIGN_UP} element={<SignUp />} />
      <Route
        path={DASHBOARD_PAGES.EMAIL_VERIFICATION}
        element={<EmailVerification />}
      />
      <Route
        path={DASHBOARD_PAGES.FORGOT_PASSWORD}
        element={<ForgotPassword />}
      />
      <Route
        path={DASHBOARD_PAGES.RESET_PASSWORD}
        element={<ResetPassword />}
      />
      <Route
        path={DASHBOARD_PAGES.HOME}
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
