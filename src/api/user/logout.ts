export async function logout(): Promise<Response> {
  const response = await fetch("/api/user/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}
