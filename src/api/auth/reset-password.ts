export function resetPassword(
  password: string,
  resetPasswordToken: string,
): Promise<Response> {
  const response = fetch("/api/auth/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      resetPasswordToken,
    }),
  });

  return response;
}
