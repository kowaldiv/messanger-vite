export async function getMyInfo(): Promise<Response> {
  const response = fetch("/api/user/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}
