

"use client";

import Image from "next/image";

export default function AboutMe() {
  return (
    <main className="flex flex-col items-center min-h-screen w-screen" style={{ backgroundColor: 'var(--bg-primary-lightest)' }}>
      {/* Header */}
      <div className="w-full bg-[var(--bg-primary)] py-6 px-8 flex items-center justify-between relative">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-6xl font-bold italic" style={{ color: 'var(--bg-primary-darkest)' }}>y</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold" style={{ color: 'var(--bg-primary-darkest)' }}>ACERCA DE MI</h1>

        {/*button*/}
        <div className="flex items-center gap-4">
          <button
            className="px-6 py-2 rounded-full font-semibold shadow-md hover:bg-[var(--bg-primary-light)] transition"
            style={{ backgroundColor: 'var(--bg-primary-lightest)', color: 'var(--bg-primary-darkest)' }}
          >
            conoceme
          </button>
        </div>
      </div>

      {/* Navbar */}
      <nav className="w-full bg-[var(--bg-primary)] py-4 flex justify-center gap-8 font-semibold">
        <a href="#about" className="hover:underline" style={{ color: 'var(--bg-primary-darkest)' }}>ACERCA DE MI</a>
        <a href="#projects" className="hover:underline" style={{ color: 'var(--bg-primary-darkest)' }}>MIS PROYECTOS</a>
        <a href="#testimonials" className="hover:underline" style={{ color: 'var(--bg-primary-darkest)' }}>TESTIMONIOS</a>
        <a href="#hobbies" className="hover:underline" style={{ color: 'var(--bg-primary-darkest)' }}>HOBBIES</a>
        <a href="#contact" className="hover:underline" style={{ color: 'var(--bg-primary-darkest)' }}>CONTACTO</a>
      </nav>

      {/* About Section */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-12 px-8 py-16 max-w-7xl">
        {/* Text */}
        <div className="max-w-md text-lg leading-relaxed" style={{ color: 'var(--bg-primary-darkest)' }}>
          <p>Mi nombre es Yuly Bastidas, soy estudiante de Ingeniería de Software, actualmente cursando el quinto semestre. Me apasiona el desarrollo de software, la lógica de la programación y el diseño de soluciones innovadoras que mejoren la experiencia de los usuarios. Me interesa especialmente el desarrollo web, la experiencia de usuario y el uso de tecnologías emergentes para crear productos funcionales y atractivos.</p>
          <p className="mt-4">Soy una persona curiosa, comprometida y con muchas ganas de seguir creciendo en el mundo de la tecnología. La constancia, la disciplina y el equilibrio son valores que aplico en cada paso de mi formación como futura ingeniera.</p>
        </div>

        {/* Img */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/yuly-foto.png" 
            alt="Foto"
            width={400}
            height={500}
            className="object-cover"
          />
        </div>
      </section>
    </main>
  );
}
