import { Button } from "@/src/ui/components/atoms/Button";
import { Input } from "@/src/ui/components/atoms/Input";
import { useUserStore } from "@/src/stores/user-store";
import { useState } from "react";
import { userApi } from "@/src/api/user.api";

export function ProfileInfoFields({
  setErrorMessage,
}: {
  setErrorMessage: (errorMessage: string) => void;
}) {
  const firstName = useUserStore((state) => state.firstName);
  const lastName = useUserStore((state) => state.lastName);
  const username = useUserStore((state) => state.username);
  const bio = useUserStore((state) => state.bio);

  const [changedFirstName, setChangedFirstName] = useState(firstName);
  const [changedLastName, setChangedLastName] = useState(lastName);
  const [changedUsername, setChangedUsername] = useState(username);
  const [changedBio, setChangedBio] = useState(bio);

  const [isRequestPending, setIsRequestPending] = useState(false);

  const inputs = [
    {
      text: "User Name",
      value: changedUsername,
      onChange: setChangedUsername,
    },
    {
      text: "First Name",
      value: changedFirstName,
      onChange: setChangedFirstName,
    },
    {
      text: "Last Name",
      value: changedLastName,
      onChange: setChangedLastName,
    },
    {
      text: "About",
      value: changedBio,
      onChange: setChangedBio,
    },
  ];

  const isEdited =
    firstName !== changedFirstName ||
    lastName !== changedLastName ||
    username !== changedUsername ||
    bio !== changedBio;

  const handleDeleteAvatar = async () => {
    if (!isEdited) return;
    setIsRequestPending(true);
    const result = await userApi.updateUserProfile({
      username:
        changedUsername !== username ? changedUsername || undefined : undefined,
      firstName:
        changedFirstName !== firstName
          ? changedFirstName || undefined
          : undefined,
      lastName:
        changedLastName !== lastName ? changedLastName || undefined : undefined,
      bio: changedBio !== bio ? changedBio || undefined : undefined,
    });
    setIsRequestPending(false);
    if (!result.success) {
      setErrorMessage(result.userMessage);
    } else {
      useUserStore.getState().updateUserInfo({
        username: changedUsername || undefined,
        firstName: changedFirstName || undefined,
        lastName: changedLastName || undefined,
        bio: changedBio || undefined,
      });
    }
  };

  return (
    <div className="grid gap-5">
      <div className="flex flex-col gap-2">
        {inputs.map((input) => {
          return (
            <div key={input.text} className="grid gap-1">
              <h2 className="ml-2 text-sm text-gray-400">{input.text}</h2>
              <Input
                value={input.value || ""}
                onChange={(e) => input.onChange(e.target.value)}
                disabled={isRequestPending}
                className="text-sm"
              />
            </div>
          );
        })}
      </div>
      {isEdited ? (
        <Button
          disabled={isRequestPending}
          onClick={handleDeleteAvatar}
          variant="primary"
          value="Apply changes"
        />
      ) : (
        ""
      )}
    </div>
  );
}
