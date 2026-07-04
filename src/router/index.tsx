import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { DASHBOARD_PAGES } from "../config/pages-url.config";
import { ProtectedRoute } from "../middleware/ProtectedRoute";
import { GuestRoute } from "../middleware/GuestRoute";

const SignIn = lazy(() => import("@/src/pages/auth/sign-in/page"));
const SignUp = lazy(() => import("@/src/pages/auth/sign-up/page"));
const ForgotPassword = lazy(
  () => import("@/src/pages/auth/forgot-password/page"),
);
const ResetPassword = lazy(() => import("@/src/pages/auth/reset-passord/page"));
const Home = lazy(() => import("@/src/pages/home/page"));
const NotFoundPage = lazy(() => import("@/src/pages/NotFoundPage"));

export function LazyPage({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={"Загрузка страницы..."}>{children}</Suspense>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const router = createBrowserRouter([
  {
    path: DASHBOARD_PAGES.SIGN_IN,
    element: (
      <LazyPage>
        <GuestRoute>
          <SignIn />
        </GuestRoute>
      </LazyPage>
    ),
  },
  {
    path: DASHBOARD_PAGES.SIGN_UP,
    element: (
      <LazyPage>
        <GuestRoute>
          <SignUp />
        </GuestRoute>
      </LazyPage>
    ),
  },
  {
    path: DASHBOARD_PAGES.FORGOT_PASSWORD,
    element: (
      <LazyPage>
        <GuestRoute>
          <ForgotPassword />
        </GuestRoute>
      </LazyPage>
    ),
  },
  {
    path: DASHBOARD_PAGES.RESET_PASSWORD,
    element: (
      <LazyPage>
        <GuestRoute>
          <ResetPassword />
        </GuestRoute>
      </LazyPage>
    ),
  },
  {
    path: DASHBOARD_PAGES.HOME,
    element: (
      <LazyPage>
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      </LazyPage>
    ),
  },
  {
    path: "*",
    element: (
      <LazyPage>
        <NotFoundPage />
      </LazyPage>
    ),
  },
]);
