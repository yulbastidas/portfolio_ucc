'use client';

import React, { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import Image from 'next/image';

const hobbies = [
  { id: 1, image: '/yuly-foto-hobbie.jpg', alt: 'Patinaje 1' },
  { id: 2, image: '/yuly-foto-hobbie-2.jpg', alt: 'Patinaje 2' },
  { id: 3, image: '/yuly-foto-hobbie-3.jpg', alt: 'Patinaje 3' },
  { id: 4, image: '/yuly-foto-hobbie-4.jpg', alt: 'Patinaje 4' },
];

const skills = [
  { name: 'Resistencia', value: 90 },
  { name: 'Fuerza', value: 85 },
  { name: 'Técnica', value: 80 },
  { name: 'Velocidad', value: 75 },
];

export default function HobbiesSection(): React.ReactElement {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  return (
    <section
      id="hobbies"
      ref={sectionRef}
      className="w-full py-16 px-6 sm:px-12 md:px-24"
      style={{ backgroundColor: 'hsl(300, 43%, 95%)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-4xl sm:text-5xl font-bold text-purple-900">
          MIS HOBBIES (PATINAJE)
        </h2>
      </motion.div>

      {/* GALERÍA */}
      <div className="relative w-full max-w-6xl mx-auto">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {hobbies.map((hobby) => (
            <motion.li
              key={hobby.id}
              className="relative aspect-square overflow-hidden rounded-lg shadow-lg group"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: hobby.id * 0.1 }}
            >
              <figure className="relative w-full h-full">
                <Image
                  src={hobby.image}
                  alt={hobby.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <figcaption className="absolute bottom-0 left-0 w-full bg-black/60 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <h3 className="text-lg font-semibold">{hobby.alt}</h3>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* DESCRIPCIÓN */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-10 text-lg text-purple-900 max-w-4xl mx-auto text-center leading-relaxed"
      >
        Desde los 12 años he practicado con pasión el gimnasio, el ciclismo y el
        patinaje. Actualmente entreno tres veces al día combinando fuerza,
        resistencia y técnica. Estas disciplinas han fortalecido mi cuerpo y mi
        carácter, enseñándome valores como la constancia, la autodisciplina y la
        superación personal.
      </motion.p>

      {/* HABILIDADES */}
      <motion.div
        className="mt-12 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="text-2xl font-semibold text-center text-purple-900 mb-6">
          Habilidades Deportivas
        </h3>

        <ul className="space-y-6">
          {skills.map((skill, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <div className="flex justify-between mb-2">
                <span className="text-purple-800 font-medium">{skill.name}</span>
                <span className="text-purple-700">{skill.value}%</span>
              </div>

              <div className="w-full bg-purple-100 rounded-full h-6 overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.value}%` } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                  className="bg-purple-600 h-full rounded-full flex items-center justify-end pr-3 text-white text-sm font-semibold"
                >
                  {skill.value}%
                </motion.div>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}