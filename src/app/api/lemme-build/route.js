export async function POST(req) {
    const { message } = await req.json();
    console.log(message)
  
    // Replace with your actual Lemme Build API URL and credentials
    const apiResponse = await fetch(`${process.env.LEMMEBUILD_API}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Authorization': 'Bearer',  // Your API Key
      },
      body: JSON.stringify({
        message: message,
        // Optionally pass personal info or context here as needed
      }),
    });
    const data = await apiResponse.json();
    console.log(data)
    console.log(data.res.reply)
    return new Response(JSON.stringify({ reply: data.res.reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  