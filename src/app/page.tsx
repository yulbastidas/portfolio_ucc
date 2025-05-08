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
import { FaRobot } from 'react-icons/fa'; // Ícono de robot

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
    { role: 'model', parts: [{ text: '🤖 ¡Hola! Soy tu asistente personal. ¿En qué puedo ayudarte hoy sobre Yuly?' }] }, // Saludo inicial del robot
  ]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Controles de animación para los elementos
  const textControls = useAnimation();
  const imageControls = useAnimation();
  const aboutSectionRef = useRef<HTMLElement>(null);

  // Definir las variantes de animación
  const textVariants = {
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    hidden: { opacity: 0, x: -100 },
  };

  const imageVariants = {
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    hidden: { opacity: 0, x: 100 },
  };

  // Función para verificar si un elemento está en el viewport
  const isElementInViewport = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 && rect.bottom >= 0
    );
  };

  // Efecto para manejar el scroll y la animación
  useEffect(() => {
    // Inicialmente comprobar si la sección ya está visible al cargar
    if (aboutSectionRef.current && isElementInViewport(aboutSectionRef.current)) {
      textControls.start('visible');
      imageControls.start('visible');
    } else {
      textControls.start('hidden');
      imageControls.start('hidden');
    }

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

    // Ejecutar la comprobación al cargar la página
    handleScroll();

    // Agregar listener para el scroll
    window.addEventListener('scroll', handleScroll);

    // Limpiar listener al desmontar
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [textControls, imageControls]);

  const openChat = () => {
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setChatHistory([
      { role: 'model', parts: [{ text: '🤖 ¡Hola! Soy tu asistente personal. ¿En qué puedo ayudarte hoy sobre Yuly?' }] }, // Saludo al cerrar y reabrir
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

  // Función para hacer scroll al último mensaje
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Función para hacer scroll y activar la animación
  const handleScrollToAbout = () => {
    if (aboutSectionRef.current) {
      aboutSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      textControls.start('visible');
      imageControls.start('visible');
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen w-screen pt-20">
      <Navbar openChat={openChat} onScrollToAbout={handleScrollToAbout} />

      <section
        id="about"
        className="flex flex-col md:flex-row items-center justify-center gap-16 px-8 py-16 max-w-7xl"
        ref={aboutSectionRef}
        style={{ backgroundColor: 'hsl(300, 43%, 95%)' }} // Fondo aplicado SOLO a la sección "about"
      >
        {/* Contenedor para el Texto e Información - A LA IZQUIERDA Y ANCHO */}
        <motion.div
          className="md:w-1/2 flex flex-col items-start max-w-4xl"
          initial="hidden"
          variants={textVariants}
          animate={textControls}
        >
          <div className="w-full text-lg leading-relaxed mb-8">
            <p>
              Mi nombre es <strong>Yuly Bastidas</strong>, soy estudiante de <strong>Ingeniería de Software</strong>,
              actualmente cursando el quinto semestre. Me apasiona el desarrollo de software, la lógica de la programación
              y el diseño de soluciones innovadoras que mejoren la experiencia de los usuarios. Me interesa
              especialmente el desarrollo web, la experiencia de usuario y el uso de tecnologías emergentes para crear
              productos funcionales y atractivos. Me desenvuelvo principalmente en <strong>Python</strong>, <strong>Java</strong> y
              bases de datos como <strong>SQL</strong>, <strong>PostgreSQL</strong> y <strong>MongoDB</strong>. Soy una persona
              curiosa, comprometida y con muchas ganas de seguir creciendo en el mundo de la tecnología. La constancia,
              la disciplina y el equilibrio son valores que aplico en cada paso de mi formación como futura ingeniera.
            </p>
          </div>
          <div className="flex flex-wrap justify-start gap-4">
            {/* Información en Cuadros */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
              <strong>Nombre:</strong> Yuly Bastidas
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
              <strong>Edad:</strong> 19 años
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
              <strong>Ubicación:</strong> Pasto, Nariño
            </div>
          </div>
        </motion.div>

        {/* Contenedor para la Imagen - A LA DERECHA */}
        <motion.div
          className="rounded-lg overflow-hidden shadow-xl md:w-1/2"
          initial="hidden"
          variants={imageVariants}
          animate={imageControls}
        >
          <Image
            src="/yuly-foto.png"
            alt="Foto"
            width={700}
            height={875}
            className="object-cover rounded-lg w-full h-auto"
            style={{ maxHeight: '700px' }}
          />
        </motion.div>
      </section>

      {/* Secciones */}
      <section id="projects">
        <ProjectsSection />
      </section>

      <section id="testimonials">
        <TestimonialsSection />
      </section>

      <section id="hobbies">
        <HobbiesSection />
      </section>

      <section id="contact">
        <ContactSection /> {/* ✅ SECCIÓN DE CONTACTO */}
      </section>

      {isChatOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-md flex flex-col" // Ajusté el ancho máximo para un chat
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <FaRobot className="text-xl text-purple-600" /> {/* Ícono de robot */}
                <h2 className="text-xl font-bold text-purple-700">Asistente Personal</h2>
              </div>
              <button onClick={closeChat} className="text-gray-500 hover:text-gray-700">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div ref={chatContainerRef} className="overflow-y-auto h-64 mb-4 p-2">
              {chatHistory.map((message, index) => (
                <div key={index} className={`mb-3 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`rounded-lg p-3 text-white max-w-xs break-words ${
                      message.role === 'user' ? 'bg-purple-600' : 'bg-gray-300 text-gray-800'
                    }`}
                  >
                    {message.parts[0].text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
                </div>
              )}
            </div>
            <div className="flex items-center">
              <input
                type="text"
                className="flex-grow rounded-md border border-gray-300 p-2 mr-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Pregúntame algo sobre Yuly..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                className="px-4 py-2 rounded-md font-semibold bg-purple-500 text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:bg-gray-400"
                onClick={handleSendMessage}
                disabled={isLoading}
              >
                Enviar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}