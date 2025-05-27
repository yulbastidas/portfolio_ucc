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

    const yulyInfo = `Mi nombre completo es Yuly Tatiana Bastidas Chilama, tengo 19 años. Nací en la ciudad de Pasto, Nariño. Mis padres son Nelson Osvaldo Bastidas y Amanda Chilamá. Actualmente curso quinto semestre de Ingeniería de Software en línea en la Universidad Cooperativa de Colombia. Estudié mi bachiller y primaria en el colegio Libertad.
Desde los 12 años practico patinaje en el club Ases del Patín. Me apasiona el patinaje.
Desde los 17 años voy al gimnasio y practico ciclismo. Actualmente, entreno los tres deportes (patinaje, ciclismo y gimnasio), siendo el gimnasio de manera más profesional.
Tengo pareja, mi novio se llama Andrés Ordóñez, tiene 21 años y llevamos 4 años juntos. Me destaco  por el manejo de base de datos como mongo bd, mysql, posgret, y en tecnologias manejando lenguajes como python , java, me desenvuelvo mejor como fronted.
ademas me gusta el manejo de lo de la nube, , me interesaria formarme en cloud computing , todo lo que tenga que ver con azure, aws , servicios en la nube.
para mi es un reto puesto que la tecnolgia avanza mucho y estoy comprometida a dar lo mejor de mi para ser una gran ingeniera. 
respecto a  patianaje he obtenido tiempos de  en la pista de 200mts, un tiempo de 19sg la mas bajita de 18, y en ruta  pista de 400mts un tiempo de 34sg, y en gym en pesas levanto 80kg en sentadilla,
en hiptrust un peso de 200kg, en sentadilla hacka un peso de 160kg y en brazo es mi punto mas debil unicamente 10kg.Alguna de  Las aventuras y lo que he hecho con mi novio 
es ir a la cocha, a las lajas, viajar a la finca de mis abuelos, salir a lugares bonitos, salir hacer un picnic, salir a dar vueltas en la moto
, estar todo un dia juntos, anecdotas bonitas desde el colegio, como graduarnos juntos, nuestro primer beso fue en la salida a comer helado, el me apoya mucho en mi carrera
y siempre me dice que soy la mejor y sere la mejor ingeniera `; 

    
    const prompt = `Actúa como un asistente personal que proporciona información sobre Yuly Bastidas.
    Responde a la pregunta del usuario de forma directa, concisa y usando únicamente la información proporcionada a continuación sobre Yuly.
    Si la pregunta no se puede responder con la información dada, indícalo claramente.
    Evita inventar detalles o extender la respuesta más allá de lo necesario.

    Información sobre Yuly: ${yulyInfo}

    Pregunta del usuario: "${newMessage}"

    Respuesta concisa:`; 

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

  } catch (error: unknown) {
    let errorMessage = "Ocurrió un error inesperado.";
    if (error instanceof Error) {
      errorMessage = `Lo siento, no pude procesar tu mensaje debido a un error: ${error.message}`;
      console.error("Error al enviar mensaje a Gemini:", error.message);
    } else {
      console.error("Error desconocido al enviar mensaje a Gemini:", error);
    }
    return errorMessage;
  }
}