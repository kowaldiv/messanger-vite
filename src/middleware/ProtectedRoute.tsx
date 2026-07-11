import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/user-store";
import { DASHBOARD_PAGES } from "../config/pages-url.config";
import { userApi } from "../api/user.api";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const [isRequestPending, setIsRequestPending] = useState(false);
  const userId = useUserStore((state) => state.id);

  // проверка авторизован ли пользователь
  useEffect(() => {
    async function getInfo() {
      if (userId) return;
      setIsRequestPending(true);
      const result = await userApi.getUserInfo();
      setIsRequestPending(false);
      if (!result.success) {
        navigate(DASHBOARD_PAGES.SIGN_IN, { replace: true });
        return;
      }
      useUserStore.getState().setUserInfo(result.data);
    }
    getInfo();
  }, [navigate, userId]);

  if (isRequestPending || !userId) {
    return <div>загрузка...</div>;
  }

  return <>{children}</>;
}
