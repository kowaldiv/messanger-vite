import { images } from "@/src/assets";
import { useUserStore } from "@/src/stores/user-store";
import { Buttons } from "./Buttons";

export function Profile() {
  const firstName = useUserStore((state) => state.firstName);
  const lastName = useUserStore((state) => state.lastName);
  const userName = useUserStore((state) => state.userName);
  const avatar = useUserStore((state) => {
    const avatars = state.avatars;
    return avatars?.find((avatar) => avatar.order === 1);
  });

  return (
    <div className="w-full mt-6">
      <div className="flex flex-col items-center mb-8">
        <div
          className={`w-20 h-20 rounded-xl overflow-hidden mb-2 bg-gray-400 ${!avatar ? "p-5" : ""}`}
        >
          <img
            src={avatar ? avatar.avatarUrl : images.icons.avatar}
            alt="avatar"
            className={`h-full w-full object-cover`}
          />
        </div>
        <p className="text-lg">
          {firstName ? firstName : "Ivan"} {lastName ? lastName : "Ivanich"}
        </p>
        <p className="text-sm mt-1 text-gray-400">
          {userName ? `@${userName}` : "@UserExample"}
        </p>
      </div>
      <Buttons />
    </div>
  );
}
