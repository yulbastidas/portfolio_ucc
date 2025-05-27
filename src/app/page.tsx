'use client';

import { Island_Moments } from 'next/font/google';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Navbar from './components/Navbar';
import ProjectsSection from './components/ProjectsSection';
import TestimonialsSection from './components/TestimonialsSection';
import HobbiesSection from './components/HobbiesSection';
import ContactSection from './components/ContactSection';
import { FaRobot } from 'react-icons/fa';

const islandMoments = Island_Moments({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { role: 'model', parts: [{ text: '🤖 ¡Hola! Soy tu asistente personal. ¿En qué puedo ayudarte hoy sobre Yuly?' }] },
  ]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const textControls = useAnimation();
  const imageControls = useAnimation();
  const aboutSectionRef = useRef<HTMLElement>(null);

  const textVariants = {
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    hidden: { opacity: 0, x: -100 },
  };

  const imageVariants = {
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    hidden: { opacity: 0, x: 100 },
  };

  const isElementInViewport = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top <= viewportHeight * 0.8 && rect.bottom >= 0;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (aboutSectionRef.current) {
        if (isElementInViewport(aboutSectionRef.current)) {
          textControls.start('visible');
          imageControls.start('visible');
        } else {
          textControls.start('hidden');
          imageControls.start('hidden');
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [textControls, imageControls]);

  const openChat = () => {
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setChatHistory([
      { role: 'model', parts: [{ text: '🤖 ¡Hola! Soy tu asistente personal. ¿En qué puedo ayudarte hoy sobre Yuly?' }] },
    ]);
    setNewMessage('');
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      setIsLoading(true);
      const userMessage: ChatMessage = { role: 'user', parts: [{ text: newMessage }] };
      setChatHistory((prev) => [...prev, userMessage]);
      setNewMessage('');

      try {
        const response = await fetch('/api/gemini', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newMessage }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error de la API de Gemini:', errorData);
          setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: '⚠️ Ups, algo salió mal. Intenta de nuevo.' }] }]);
        } else {
          const { response: assistantResponse } = await response.json();
          const modelMessage: ChatMessage = { role: 'model', parts: [{ text: assistantResponse }] };
          setChatHistory((prev) => [...prev, modelMessage]);
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? `Error al enviar mensaje a la API: ${error.message}`
            : 'No se pudo conectar con el servidor.';
        console.error(errorMessage);
        setChatHistory((prev) => [...prev, { role: 'model', parts: [{ text: '⚠️ No se pudo conectar con el asistente.' }] }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleScrollToAbout = () => {
    if (aboutSectionRef.current) {
      aboutSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      textControls.start('visible');
      imageControls.start('visible');
    }
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar openChat={openChat} onScrollToAbout={handleScrollToAbout} />

      <section
        id="about"
        ref={aboutSectionRef}
        className="w-full bg-pink-100 py-16 mt-20"
      >
        <div
          className="
            max-w-7xl mx-auto px-8
            flex flex-col md:flex-row items-center justify-center gap-16
          "
        >
          <motion.article
            className="md:w-1/2 flex flex-col items-start max-w-4xl"
            initial="hidden"
            variants={textVariants}
            animate={textControls}
          >
            <h1 className={`${islandMoments.className} text-4xl md:text-5xl font-bold text-gray-800 mb-6`}>
              Acerca de Mí
            </h1>
            <section className="w-full text-lg leading-relaxed mb-8 text-gray-700">
              <p>
                Mi nombre es **Yuly Bastidas**, soy estudiante de **Ingeniería de Software**,
                actualmente cursando el quinto semestre. Me apasiona el desarrollo de software, la lógica de la programación
                y el diseño de soluciones innovadoras que mejoren la experiencia de los usuarios. Me interesa
                especialmente el desarrollo web, la experiencia de usuario y el uso de tecnologías emergentes para crear
                productos funcionales y atractivos. Me desenvuelvo principalmente en **Python**, **Java** y
                bases de datos como **SQL**, **PostgreSQL** y **MongoDB**. Soy una persona
                curiosa, comprometida y con muchas ganas de seguir creciendo en el mundo de la tecnología. La constancia,
                la disciplina y el equilibrio son valores que aplico en cada paso de mi formación como futura ingeniera.
              </p>
            </section>
            <footer className="flex flex-wrap justify-start gap-4 w-full">
              <address className="bg-white p-4 rounded-lg shadow-md text-center text-gray-800 border border-gray-200 not-italic">
                <strong>Nombre:</strong> Yuly Bastidas
              </address>
              <time className="bg-white p-4 rounded-lg shadow-md text-center text-gray-800 border border-gray-200">
                <strong>Edad:</strong> 19 años
              </time>
              <address className="bg-white p-4 rounded-lg shadow-md text-center text-gray-800 border border-gray-200 not-italic">
                <strong>Ubicación:</strong> Pasto, Nariño
              </address>
            </footer>
          </motion.article>

          <motion.figure
            className="rounded-lg overflow-hidden shadow-xl md:w-1/2 flex justify-center items-center"
            initial="hidden"
            variants={imageVariants}
            animate={imageControls}
          >
            <Image
              src="/yuly-foto.jpg"
              alt="Foto de perfil de Yuly Bastidas"
              width={500}
              height={625}
              priority
              className="object-cover rounded-lg w-full h-auto max-h-[700px]"
            />
          </motion.figure>
        </div>
      </section>

      <section id="projects" className="w-full bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <ProjectsSection />
        </div>
      </section>

      <section id="testimonials" className="w-full bg-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <TestimonialsSection />
        </div>
      </section>

      <section id="hobbies" className="w-full bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <HobbiesSection />
        </div>
      </section>

      <section id="contact" className="w-full bg-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <ContactSection />
        </div>
      </section>

      {isChatOpen && (
        <aside className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <motion.article
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md flex flex-col h-auto max-h-[90vh]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <header className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="flex items-center gap-2 text-xl font-bold text-purple-700">
                <FaRobot className="text-xl text-purple-600" />
                Asistente Personal
              </h2>
              <button onClick={closeChat} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </header>
            <section ref={chatContainerRef} className="overflow-y-auto flex-grow mb-4 p-2 border rounded-md bg-gray-50">
              {chatHistory.map((message, index) => (
                <p key={index} className={`mb-3 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <span
                    className={`rounded-lg p-3 text-sm max-w-[75%] break-words ${
                      message.role === 'user'
                        ? 'bg-purple-600 text-white ml-auto'
                        : 'bg-gray-200 text-gray-800 mr-auto'
                    }`}
                  >
                    {message.parts[0].text}
                  </span>
                </p>
              ))}
              {isLoading && (
                <p className="flex justify-center mt-4">
                  <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></span>
                </p>
              )}
            </section>
            <footer className="flex items-center">
              <input
                type="text"
                className="flex-grow rounded-md border border-gray-300 p-2 mr-2 focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-800"
                placeholder="Pregúntame algo sobre Yuly..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isLoading}
              />
              <button
                className="px-4 py-2 rounded-md font-semibold bg-purple-500 text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={handleSendMessage}
                disabled={isLoading}
              >
                Enviar
              </button>
            </footer>
          </motion.article>
        </aside>
      )}
    </main>
  );
}