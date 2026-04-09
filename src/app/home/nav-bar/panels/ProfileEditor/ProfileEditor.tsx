import { useState } from "react";
import { AvatarPreview } from "./AvatarsPreview";
import { AddNewAvatar } from "./AddNewAvatar";
import { ProfileInfoFields } from "./ProfileInfoFields";

export function ProfileEditor() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <div className="w-full mt-12">
      <div className="flex flex-col items-center mb-8">
        <div className="flex flex-col items-center mb-2 w-full">
          <AvatarPreview setErrorMessage={setErrorMessage} />
          <AddNewAvatar setErrorMessage={setErrorMessage} />
          {errorMessage ? (
            <p className="text-center text-sm sm:text-base text-red-600 mb-2">
              {errorMessage}
            </p>
          ) : (
            ""
          )}
        </div>
        <ProfileInfoFields setErrorMessage={setErrorMessage} />
      </div>
    </div>
  );
}
