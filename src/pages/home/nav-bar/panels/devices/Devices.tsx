import { images } from "@/src/assets";
import { Button } from "@/src/ui/components/atoms/Button";
import { useUserStore } from "@/src/stores/user-store";
import { useEffect, useState } from "react";
import { userApi } from "@/src/api/user.api";

export function Devices() {
  const [isRequestPending, setIsRequestPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const sessions = useUserStore((state) => state.sessions);

  useEffect(() => {
    const getUserSessions = async () => {
      setIsRequestPending(true);
      const result = await userApi.sessions();
      setIsRequestPending(false);
      if (!result.success) {
        setErrorMessage(result.userMessage);
      } else {
        useUserStore.getState().setSessions(result.data);
      }
    };
    getUserSessions();
  }, []);

  const handleRevokeSession = async (tokenId: string) => {
    const result = await userApi.revokeSession({ tokenId });
    if (!result.success) {
      setErrorMessage("Завершить сессию не удалось, попробуйте позже");
    } else {
      useUserStore.getState().deleteSession(tokenId);
    }
  };

  return (
    <div className="w-full mt-2 grid gap-4">
      <p className="text-center text-xl">Devices</p>
      {errorMessage ? (
        <p className="text-center text-sm sm:text-base text-red-600">
          {errorMessage}
        </p>
      ) : (
        ""
      )}
      {isRequestPending ? (
        "Loading..."
      ) : (
        <div className="grid gap-2">
          {sessions?.map((session) => {
            const formattedDate = new Date(session.createdAt).toLocaleString(
              "ru-RU",
              {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              },
            );

            return (
              <div
                key={session.id}
                className="border border-border rounded-md p-3"
              >
                <div className="flex justify-between items-center">
                  <p>{session.fingerprint}</p>
                  <Button
                    onClick={() => handleRevokeSession(session.id)}
                    variant="default"
                  >
                    <img className="h-5" src={images.icons.exit} alt="exit" />
                  </Button>
                </div>
                <p className="text-sm text-gray-400 mt-1">{formattedDate}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
