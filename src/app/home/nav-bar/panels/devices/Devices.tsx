import { images } from "@/src/assets";
import { Button } from "@/src/components/button";
import { useUserStore } from "@/src/stores/user-store";
import { useEffect, useState } from "react";

export function Devices() {
  const [isRequestPending, setIsRequestPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const devices = useUserStore((state) => state.devices);

  useEffect(() => {
    const getUserDevices = async () => {
      setIsRequestPending(true);
      const result = await useUserStore.getState().getUserDevices();
      setIsRequestPending(false);
      if (!result.success) {
        setErrorMessage(result.userMessage);
      }
    };
    getUserDevices();
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
          {devices?.map((device) => {
            return (
              <div className="border border-border rounded-md p-3">
                <div className="flex justify-between items-center">
                  <p>{device.name}</p>
                  <Button variant="default">
                    <img className="h-5" src={images.icons.exit} alt="exit" />
                  </Button>
                </div>
                <p className="text-sm text-gray-400">{device.from}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
