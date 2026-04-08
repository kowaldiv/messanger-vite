export function getUserInfo(): Promise<Response> {
  const response = fetch("/api/user/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}
