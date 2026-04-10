export function emailVerification(code: string): Promise<Response> {
  const response = fetch("/api/auth/email-verification", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
    }),
  });

  return response;
}
