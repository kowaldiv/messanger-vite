export async function updateUserProfileInfo({
  userName,
  firstName,
  lastName,
  about,
}: {
  userName?: string;
  firstName?: string;
  lastName?: string;
  about?: string;
}): Promise<Response> {
  const response = fetch("/api/user/update-user-info-profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName,
      firstName,
      lastName,
      about,
    }),
  });

  return response;
}
