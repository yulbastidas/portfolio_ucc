
import { GoogleGenerativeAI } from "@google/generative-ai";


const MODEL_NAME = "gemini-1.5-pro"; 
const API_KEY = process.env.GEMINI_API_KEY || "";


const genAI = new GoogleGenerativeAI(API_KEY);

export async function sendMessage(newMessage: string): Promise<string> {
  console.log("Valor de process.env.GEMINI_API_KEY:", API_KEY);

  if (!API_KEY) {
    console.error("Error: La clave de API de Gemini no está configurada en las variables de entorno.");
    return "Lo siento, la conexión con el asistente no está disponible en este momento.";
  }

  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const yulyInfo = `Ahorita mi nombre completo es Julie Tatiana Bastidas Chilama, tengo 19 años, nací en la ciudad de Pasto en el departamento de Nariño, y mis padres son Nelson Osvaldo Bastidas y Amanda Chilamá. Actualmente estoy cursando quinto semestre de ingeniería de software en línea en la Universidad Cooperativa de Colombia. Realicé el colegio en Libertad, todo mi bachiller y mi primaria han sido en este colegio. Desde los 12 años estoy en patinaje en el club Ases del Patín, me apasiona el patinaje. Estoy desde los 17 años en el gimnasio y como en bicicleta, y actualmente estoy practicando los 3 deportes: patinaje, bicicleta y gimnasio, siendo el gimnasio como manera profesional.`;

    const prompt = `Háblame sobre Yuly Bastidas. Aquí hay algunos detalles sobre ella: ${yulyInfo}. El usuario ha preguntado: "${newMessage}"`;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    console.log("Respuesta completa de Gemini:", result);

    
    return result.response.text();

  } catch (error: any) {
    console.error("Error al enviar mensaje a Gemini:", error);
    return `Lo siento, no pude procesar tu mensaje debido a un error: ${error.message}`;
  }
}