import React from 'react';

interface NavbarProps {
  openChat: () => void;
  onScrollToAbout: () => void; // Nueva prop para manejar el scroll
}

const Navbar: React.FC<NavbarProps> = ({ openChat, onScrollToAbout }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-[var(--bg-primary)] py-6 px-8 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span
          className="text-8xl ml-25 text-shadow-sm spin-slow"
          style={{ color: 'var(--bg-primary-darkest)', fontFamily: 'Island Moments' }}
        >
          y
        </span>
      </div>

      {/* Título "Acerca de mí" */}
      <h1 className="text-3xl font-bold" style={{ color: 'var(--bg-primary-darkest)' }}>
        ACERCA DE MI
      </h1>

      {/* Navegación de secciones */}
      <div className="flex items-center gap-8 font-semibold">
        <a
          href="#about"
          className="hover:underline"
          style={{ color: 'var(--bg-primary-darkest)' }}
          onClick={(e) => {
            e.preventDefault(); // Prevenir el comportamiento predeterminado de anclar
            onScrollToAbout(); // Llamar a la función para hacer scroll y activar la animación
          }}
        >
          Acerca de mí
        </a>
        <a
          href="#projects"
          className="hover:underline"
          style={{ color: 'var(--bg-primary-darkest)' }}
        >
          Mis Proyectos
        </a>
        <a
          href="#testimonials"
          className="hover:underline"
          style={{ color: 'var(--bg-primary-darkest)' }}
        >
          Testimonios
        </a>
        <a
          href="#hobbies"
          className="hover:underline"
          style={{ color: 'var(--bg-primary-darkest)' }}
        >
          Hobbies
        </a>
        <a
          href="#contact"
          className="hover:underline"
          style={{ color: 'var(--bg-primary-darkest)' }}
        >
          Contacto
        </a>
      </div>

      {/* Botón para abrir el chat */}
      <div className="flex items-center gap-4">
        <button
          className="px-6 py-2 rounded-full font-extrabold shadow-md hover:bg-[var(--bg-primary-light)] transition"
          style={{ backgroundColor: 'var(--bg-primary-lightest)', color: 'var(--bg-primary-darkest)' }}
          onClick={openChat}
        >
          Conóceme
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
