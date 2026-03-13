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
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: 'model',
      parts: [{ text: '🤖 ¡Hola! Soy tu asistente personal. ¿En qué puedo ayudarte hoy sobre Yuly?' }],
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);

  const textControls = useAnimation();
  const imageControls = useAnimation();

  const textVariants = {
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
    hidden: { opacity: 0, x: -100 },
  };

  const imageVariants = {
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
    hidden: { opacity: 0, x: 100 },
  };

  const isElementInViewport = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
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

  const openChat = () => setIsChatOpen(true);

  const closeChat = () => {
    setIsChatOpen(false);
    setChatHistory([
      {
        role: 'model',
        parts: [{ text: '🤖 ¡Hola! Soy tu asistente personal. ¿En qué puedo ayudarte hoy sobre Yuly?' }],
      },
    ]);
    setNewMessage('');
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      role: 'user',
      parts: [{ text: newMessage }],
    };

    setChatHistory((prev) => [...prev, userMessage]);
    setNewMessage('');

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newMessage }),
      });

      const data = await response.json();

      const modelMessage: ChatMessage = {
        role: 'model',
        parts: [{ text: data.response }],
      };

      setChatHistory((prev) => [...prev, modelMessage]);
    } catch {
      setChatHistory((prev) => [
        ...prev,
        { role: 'model', parts: [{ text: '⚠️ No se pudo conectar con el asistente.' }] },
      ]);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleScrollToAbout = () => {
    aboutSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar openChat={openChat} onScrollToAbout={handleScrollToAbout} />

      {/* ABOUT */}
      <section id="about" ref={aboutSectionRef} className="w-full bg-pink-100 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center gap-16">
          <motion.article
            className="md:w-1/2 flex flex-col items-start max-w-4xl"
            initial="hidden"
            variants={textVariants}
            animate={textControls}
          >
            <h1 className={`${islandMoments.className} text-4xl md:text-5xl font-bold text-gray-800 mb-6`}>
              Acerca de Mí
            </h1>

            <div className="text-lg text-gray-700 mb-8">
              <p>
                Mi nombre es Yuly Bastidas, soy estudiante de Ingeniería de Software y me apasiona
                el desarrollo web, la programación y la creación de soluciones tecnológicas innovadoras.
              </p>
            </div>

            <footer className="flex flex-wrap gap-4">
              <address className="bg-white p-4 rounded-lg shadow-md border not-italic">
                <strong>Nombre:</strong> Yuly Bastidas
              </address>

              <span className="bg-white p-4 rounded-lg shadow-md border">
                <strong>Edad:</strong> 19 años
              </span>

              <address className="bg-white p-4 rounded-lg shadow-md border not-italic">
                <strong>Ubicación:</strong> Pasto, Nariño
              </address>
            </footer>
          </motion.article>

          <motion.figure
            className="rounded-lg overflow-hidden shadow-xl md:w-1/2"
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
              className="object-cover rounded-lg w-full"
            />
          </motion.figure>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <ProjectsSection />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <TestimonialsSection />
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <HobbiesSection />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <ContactSection />
        </div>
      </section>

      {/* CHAT */}
      {isChatOpen && (
        <aside className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <motion.article
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md flex flex-col max-h-[90vh]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <header className="flex justify-between mb-4 border-b pb-2">
              <h2 className="flex items-center gap-2 text-xl font-bold text-purple-700">
                <FaRobot />
                Asistente Personal
              </h2>

              <button onClick={closeChat}>✖</button>
            </header>

            <section
              ref={chatContainerRef}
              className="overflow-y-auto flex-grow mb-4 p-2 border rounded-md bg-gray-50"
            >
              {chatHistory.map((message, index) => (
                <p
                  key={index}
                  className={`mb-3 flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <span
                    className={`rounded-lg p-3 text-sm max-w-[75%] ${
                      message.role === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {message.parts[0].text}
                  </span>
                </p>
              ))}
            </section>

            <footer className="flex gap-2">
              <input
                className="flex-grow border p-2 rounded"
                placeholder="Pregúntame algo..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />

              <button
                className="bg-purple-600 text-white px-4 rounded"
                onClick={handleSendMessage}
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