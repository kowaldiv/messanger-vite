export async function isJsonResponse(
  response: Response,
): Promise<{ success: true; json: unknown } | { success: false }> {
  try {
    const json = await response.json();
    return { success: true, json };
  } catch {
    return { success: false };
  }
}