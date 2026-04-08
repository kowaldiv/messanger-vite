export function forgotPassword(email: string): Promise<Response> {
  const response = fetch("/api/auth/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });

  return response;
}
