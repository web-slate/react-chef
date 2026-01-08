// app/api/chat/route.ts
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    const userText = lastMessage?.content?.[0]?.text || "Hello";

    // Create a simple text response
    const dummyResponse = `You said: "${userText}". This is a dummy response to test the UI! 

Here are some features:

• Message streaming works ✓
• Markdown formatting works ✓  
• **This is bold text** and *this is italic*

Try asking me anything!`;

    // Return plain JSON response
    return Response.json({
      role: "assistant",
      content: [
        {
          type: "text",
          text: dummyResponse,
        },
      ],
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return Response.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}