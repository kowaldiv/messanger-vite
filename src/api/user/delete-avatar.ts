export async function deleteAvatar(avatarId: string): Promise<Response> {
  const response = await fetch("/api/user/delete-avatar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatarId,
    }),
  });

  return response;
}
