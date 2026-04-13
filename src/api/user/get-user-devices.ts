export async function getUserDevices(): Promise<Response> {
  const response = fetch("/api/user/devices", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}
