export async function emailVerification(code: string): Promise<Response> {
  const response = await fetch("/api/auth/email-verification", {
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
