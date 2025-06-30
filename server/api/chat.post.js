export default defineEventHandler(async (event) => {
  try {
    const previousMessages = await readBody(event);
    const chatId = getCookie(event, 'chatId'); // or use query/cookies/storage as you prefer

    const response = await fetch(`http://localhost:5200/api/Chat/complete${chatId ? `?chatId=${chatId}` : ''}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(previousMessages)
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Backend error:', response.status, error);
      return { message: `Backend error: ${response.status} ${response.statusText}` };
    }

    const data = await response.json();

    // Save chatId if provided in the response
    if (data.chatId) {
      setCookie(event, 'chatId', data.chatId, { path: '/' });
    }

    return data;
  } catch (error) {
    console.error('Proxy error:', error);
    return { message: "Failed to connect to backend" };
  }
});
