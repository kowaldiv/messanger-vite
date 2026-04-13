// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUserStore } from "../stores/user-store";
// import { DASHBOARD_PAGES } from "../config/pages-url.config";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // const navigate = useNavigate();

  // const [isRequestPending, setIsRequestPending] = useState(false);
  // const userId = useUserStore((state) => state.userId);

  // // проверка авторизован ли пользователь
  // useEffect(() => {
  //   async function getInfo() {
  //     setIsRequestPending(true);
  //     const result = await useUserStore.getState().getMyInfo();
  //     setIsRequestPending(false);
  //     if (!result.success) {
  //       navigate(DASHBOARD_PAGES.SIGN_IN, { replace: true });
  //     }
  //   }
  //   getInfo();
  // }, [navigate]);

  // if (isRequestPending || !userId) {
  //   return <div>загрузка...</div>;
  // }

  return <>{children}</>;
}
