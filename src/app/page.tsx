"use client";
import { Island_Moments } from 'next/font/google';
import Image from "next/image";
import { useState, useEffect, useRef } from 'react';

const islandMoments = Island_Moments({
  weight: '400',
  subsets: ['latin'],
});

interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export default function AboutMe() {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { role: "user", parts: [{ text: "Háblame sobre ti, Yuly." }] },
    { role: "model", parts: [{ text: "¡Hola! Soy un asistente diseñado para contarte sobre Yuly Bastidas. ¿Qué te gustaría saber?" }] },
  ]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const openChat = () => {
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setChatHistory([
      { role: "user", parts: [{ text: "Háblame sobre ti, Yuly." }] },
      { role: "model", parts: [{ text: "¡Hola! Soy un asistente diseñado para contarte sobre Yuly Bastidas. ¿Qué te gustaría saber?" }] },
    ]);
    setNewMessage('');
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      setIsLoading(true);
      const userMessage: ChatMessage = { role: "user", parts: [{ text: newMessage }] };
      setChatHistory((prevHistory) => [...prevHistory, userMessage]);
      setNewMessage('');

      try {
        const response = await fetch('/api/gemini', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newMessage }), 
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error de la API de Gemini:", errorData);
          setChatHistory((prevHistory) => [...prevHistory, { role: "model", parts: [{ text: "Error al obtener respuesta." }] }]);
        } else {
          const { response: assistantResponse } = await response.json(); 
          const modelMessage: ChatMessage = { role: "model", parts: [{ text: assistantResponse }] };
          setChatHistory((prevHistory) => [...prevHistory, modelMessage]);
        }
      } catch (error: any) {
        console.error("Error al enviar mensaje a la API:", error);
        setChatHistory((prevHistory) => [...prevHistory, { role: "model", parts: [{ text: "No se pudo conectar con el servidor." }] }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen w-screen" style={{ backgroundColor: 'var(--bg-primary-lightest)' }}>
      <div className="w-full bg-[var(--bg-primary)] py-6 px-8 flex items-center justify-between relative">
        <div className="flex items-center gap-2">
          <span
            className={`${islandMoments.className} text-8xl ml-25 text-shadow-sm spin-slow`}
            style={{ color: 'var(--bg-primary-darkest)', fontFamily: 'Island Moments' }}
          >
            y
          </span>
        </div>
        <h1 className="text-3xl font-bold" style={{ color: 'var(--bg-primary-darkest)' }}>
          ACERCA DE MI
        </h1>
        <div className="flex items-center gap-4">
          <button
            className="px-6 py-2 mr-15 mt-15 rounded-full font-extrabold shadow-md hover:bg-[var(--bg-primary-light)] transition"
            style={{ backgroundColor: 'var(--bg-primary-lightest)', color: 'var(--bg-primary-darkest)' }}
            onClick={openChat}
          >
            conoceme
          </button>
        </div>
      </div>

      <nav className="w-full mb-3 bg-[var(--bg-primary)] py-4 flex justify-center gap-8 font-semibold">
        <a href="#about" className="hover:underline" style={{ color: 'var(--bg-primary-darkest)' }}>ACERCA DE MI</a>
        <a href="#projects" className="hover:underline" style={{ color: 'var(--bg-primary-darkest)' }}>MIS PROYECTOS</a>
        <a href="#testimonials" className="hover:underline" style={{ color: 'var(--bg-primary-darkest)' }}>TESTIMONIOS</a>
        <a href="#hobbies" className="hover:underline" style={{ color: 'var(--bg-primary-darkest)' }}>HOBBIES</a>
        <a href="#contact" className="hover:underline" style={{ color: 'var(--bg-primary-darkest)' }}>CONTACTO</a>
      </nav>

      <section className="flex flex-col md:flex-row items-center justify-center gap-12 px-8 py-16 max-w-7xl">
        <div className="max-w-md text-lg leading-relaxed" style={{ color: 'var(--bg-primary-darkest)' }}>
          <p>Mi nombre es Yuly Bastidas, soy estudiante de Ingeniería de Software, actualmente cursando el quinto semestre. Me apasiona el desarrollo de software, la lógica de la programación y el diseño de soluciones innovadoras que mejoren la experiencia de los usuarios. Me interesa especialmente el desarrollo web, la experiencia de usuario y el uso de tecnologías emergentes para crear productos funcionales y atractivos.</p>
          <p className="mt-4">Soy una persona curiosa, comprometida y con muchas ganas de seguir creciendo en el mundo de la tecnología. La constancia, la disciplina y el equilibrio son valores que aplico en cada paso de mi formación como futura ingeniera.</p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <Image src="/yuly-foto.png" alt="Foto" width={400} height={500} className="object-cover" />
        </div>
      </section>

      {isChatOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-2xl flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold" style={{ color: 'var(--bg-primary-darkest)' }}>¡Hablemos sobre mí!</h2>
              <button onClick={closeChat} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
              </button>
            </div>
            <div ref={chatContainerRef} className="overflow-y-auto h-64 mb-4">
              {chatHistory.map((message, index) => (
                <div key={index} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <strong style={{ color: 'var(--bg-primary-darkest)' }}>{message.role === 'user' ? 'Tú:' : 'Asistente:'}</strong>
                  <p className="inline-block rounded-lg p-2" style={{ backgroundColor: message.role === 'user' ? 'var(--bg-primary-light)' : 'var(--bg-primary-lightest)', color: 'var(--bg-primary-darkest)' }}>{message.parts[0].text}</p>
                </div>
              ))}
              {isLoading && <p className="text-gray-500">Cargando...</p>}
            </div>
            <div className="flex items-center">
              <input
                type="text"
                className="flex-grow rounded-md border border-gray-300 p-2 mr-2"
                placeholder="Pregúntame algo sobre Yuly..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                className="px-4 py-2 rounded-md font-semibold"
                style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--bg-primary-lightest)' }}
                onClick={handleSendMessage}
                disabled={isLoading}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}