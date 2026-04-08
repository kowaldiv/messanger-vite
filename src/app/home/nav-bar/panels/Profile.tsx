// import { Button } from "@/src/components/button";

import { images } from "@/src/assets";
import { useUserStore } from "@/src/stores/user-store";

export function Profile() {
  const firstName = useUserStore((state) => state.userName);
  const secondName = useUserStore((state) => state.userName);
  const userName = useUserStore((state) => state.userName);
  const avatar = useUserStore((state) => state.avatar);

  return (
    <div className="w-full">
      <div className="flex flex-col items-center mb-8">
        <div className="p-4 bg-border rounded-[60px]">
          <img
            src={avatar ? avatar : images.icons.avatar}
            alt="avatar"
            className="w-15 h-15"
          />
        </div>
        <p className="text-lg mt-2">
          {firstName ? firstName : "Ivan"} {secondName ? secondName : "Ivanich"}
        </p>
        <p className="text-sm mt-1 text-gray-400">
          {userName ? `@${userName}` : "@UserExample"}
        </p>
      </div>
      <div>
        
      </div>
    </div>
  );
}
