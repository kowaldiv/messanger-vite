export function getChats(): Promise<Response> {
  const response = fetch("/api/chats/chats", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}
