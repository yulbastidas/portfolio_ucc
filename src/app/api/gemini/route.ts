
import { sendMessage } from '../../utils/gemini';

export async function POST(req: Request) {
  try {
    const { newMessage } = await req.json(); 
    const response = await sendMessage(newMessage); 
    return new Response(JSON.stringify({ response }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    console.error("Error al llamar a la API de Gemini:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
