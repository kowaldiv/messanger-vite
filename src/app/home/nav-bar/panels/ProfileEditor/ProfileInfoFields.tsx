import { Button } from "@/src/components/button";
import { Input } from "@/src/components/input";
import { useUserStore } from "@/src/stores/user-store";
import { useState } from "react";

export function ProfileInfoFields({
  setErrorMessage,
}: {
  setErrorMessage: (errorMessage: string) => void;
}) {
  const firstName = useUserStore((state) => state.firstName);
  const lastName = useUserStore((state) => state.lastName);
  const userName = useUserStore((state) => state.userName);
  const about = useUserStore((state) => state.about);

  const [changedFirstName, setChangedFirstName] = useState(firstName);
  const [changedLastName, setChangedLastName] = useState(lastName);
  const [changedUserName, setChangedUserName] = useState(userName);
  const [changedAbout, setChangedAbout] = useState(about);

  const [isRequestPending, setIsRequestPending] = useState(false);

  const inputs = [
    {
      text: "User Name",
      value: changedUserName,
      onChange: setChangedUserName,
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
      value: changedAbout,
      onChange: setChangedAbout,
    },
  ];

  const isEdited =
    firstName !== changedFirstName ||
    lastName !== changedLastName ||
    userName !== changedUserName ||
    about !== changedAbout;

  const handleDeleteAvatar = async () => {
    if (!isEdited) return;
    setIsRequestPending(true);
    const result = await useUserStore.getState().updateUserProfieInfo({});
    setIsRequestPending(false);
    if (!result.success) {
      setErrorMessage(result.userMessage);
    }
  };

  return (
    <div className="grid gap-5">
      <div className="flex flex-col gap-2">
        {inputs.map((input) => {
          return (
            <div className="grid gap-1">
              <h2 className="ml-2 text-sm text-gray-400">{input.text}</h2>
              <Input
                disabled={isRequestPending}
                value={input.value}
                onChange={input.onChange}
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
