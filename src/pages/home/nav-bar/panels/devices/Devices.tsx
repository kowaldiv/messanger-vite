// import { images } from "@/src/assets";
// import { Button } from "@/src/ui/components/atoms/Button";
// import { useUserStore } from "@/src/stores/user-store";
import { useEffect, useState } from "react";
import { userApi } from "@/src/api/user.api";

export function Devices() {
  const [isRequestPending, setIsRequestPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // const sessions = useUserStore((state) => state.sessions);

  useEffect(() => {
    const getUserSessions = async () => {
      setIsRequestPending(true);
      const result = await userApi.devices();
      setIsRequestPending(false);
      if (!result.success) {
        setErrorMessage(result.userMessage);
      }
    };
    getUserSessions();
  }, []);

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
        <div className="grid gap-3">
          {/* {sessions?.map((sessions) => {
            return (
              <div className="border border-border rounded-md p-3">
                <div className="flex justify-between items-center">
                  <p>{sessions.fingerprint}</p>
                  <Button variant="default">
                    <img className="h-5" src={images.icons.exit} alt="exit" />
                  </Button>
                </div>
                <p className="text-sm text-gray-400">
                  {sessions.createdAt.toString()}
                </p>
              </div>
            );
          })} */}
        </div>
      )}
    </div>
  );
}
