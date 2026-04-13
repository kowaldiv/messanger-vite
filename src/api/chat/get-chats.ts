export async function getChats(): Promise<Response> {
  const response = await fetch("/api/chats/chats", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}
