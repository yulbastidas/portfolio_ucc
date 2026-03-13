'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  openChat: () => void;
  onScrollToAbout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ openChat, onScrollToAbout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();

    if (id === 'about') {
      onScrollToAbout();
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[var(--bg-primary)] py-4 px-6 sm:px-8 shadow-md">

      <nav className="flex items-center justify-between">

        {/* LOGO */}
        <span className="text-6xl sm:text-7xl md:text-8xl text-shadow-sm spin-slow font-['Island_Moments'] text-[var(--bg-primary-darkest)]">
          y
        </span>

        <h1 className="hidden md:block text-2xl sm:text-3xl font-bold text-[var(--bg-primary-darkest)]">
          ACERCA DE MI
        </h1>

        {/* BOTÓN MENÚ MÓVIL */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-[var(--bg-primary-darkest)]"
          aria-label="Abrir menú"
        >
          {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

        {/* MENÚ DESKTOP */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 font-semibold">
          <a
            href="#about"
            className="hover:underline text-[var(--bg-primary-darkest)]"
            onClick={(e) => handleLinkClick(e, 'about')}
          >
            Acerca de mí
          </a>

          <a
            href="#projects"
            className="hover:underline text-[var(--bg-primary-darkest)]"
            onClick={(e) => handleLinkClick(e, 'projects')}
          >
            Mis Proyectos
          </a>

          <a
            href="#testimonials"
            className="hover:underline text-[var(--bg-primary-darkest)]"
            onClick={(e) => handleLinkClick(e, 'testimonials')}
          >
            Testimonios
          </a>

          <a
            href="#hobbies"
            className="hover:underline text-[var(--bg-primary-darkest)]"
            onClick={(e) => handleLinkClick(e, 'hobbies')}
          >
            Hobbies
          </a>

          <a
            href="#contact"
            className="hover:underline text-[var(--bg-primary-darkest)]"
            onClick={(e) => handleLinkClick(e, 'contact')}
          >
            Contacto
          </a>

          <button
            className="px-5 py-2 rounded-full font-extrabold shadow-md hover:bg-[var(--bg-primary-light)] transition bg-[var(--bg-primary-lightest)] text-[var(--bg-primary-darkest)]"
            onClick={openChat}
          >
            Conóceme
          </button>
        </div>
      </nav>

      {/* MENÚ MOBILE */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[var(--bg-primary)] shadow-lg py-4 flex flex-col items-center space-y-4">

          <a
            href="#about"
            className="hover:underline text-[var(--bg-primary-darkest)] text-lg"
            onClick={(e) => handleLinkClick(e, 'about')}
          >
            Acerca de mí
          </a>

          <a
            href="#projects"
            className="hover:underline text-[var(--bg-primary-darkest)] text-lg"
            onClick={(e) => handleLinkClick(e, 'projects')}
          >
            Mis Proyectos
          </a>

          <a
            href="#testimonials"
            className="hover:underline text-[var(--bg-primary-darkest)] text-lg"
            onClick={(e) => handleLinkClick(e, 'testimonials')}
          >
            Testimonios
          </a>

          <a
            href="#hobbies"
            className="hover:underline text-[var(--bg-primary-darkest)] text-lg"
            onClick={(e) => handleLinkClick(e, 'hobbies')}
          >
            Hobbies
          </a>

          <a
            href="#contact"
            className="hover:underline text-[var(--bg-primary-darkest)] text-lg"
            onClick={(e) => handleLinkClick(e, 'contact')}
          >
            Contacto
          </a>

          <button
            className="px-5 py-2 rounded-full font-extrabold shadow-md hover:bg-[var(--bg-primary-light)] transition bg-[var(--bg-primary-lightest)] text-[var(--bg-primary-darkest)]"
            onClick={() => {
              openChat();
              setIsMobileMenuOpen(false);
            }}
          >
            Conóceme
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;