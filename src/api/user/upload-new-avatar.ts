export async function uploadNewAvatar(avatar: File): Promise<Response> {
  const response = await fetch("/api/user/upload-new-avatar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar,
    }),
  });

  return response;
}
