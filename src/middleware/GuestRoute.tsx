import { Navigate } from "react-router-dom";
import { useUserStore } from "@/src/stores/user-store";
import { DASHBOARD_PAGES } from "@/src/config/pages-url.config";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function GuestRoute({ children }: Props) {
  const userId = useUserStore((state) => state.id);

  // Если пользователь уже авторизован — перенаправляем на Home
  if (userId) {
    return <Navigate to={DASHBOARD_PAGES.HOME} replace />;
  }

  return <>{children}</>;
}
