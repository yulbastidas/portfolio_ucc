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
  } catch (error: unknown) { 
    let errorMessage = "Ocurrió un error al llamar a la API de Gemini.";
    if (error instanceof Error) {
      errorMessage = `Error al llamar a la API de Gemini: ${error.message}`;
      console.error(errorMessage, error);
    } else {
      console.error("Error desconocido al llamar a la API de Gemini:", error);
    }
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}