'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const hobbies = [
  { id: 1, image: '/images/hobby1.png', alt: 'Ciclismo' },
  { id: 2, image: '/images/hobby2.png', alt: 'Patinaje' },
  { id: 3, image: '/images/hobby3.png', alt: 'Gimnasio' },
  { id: 4, image: '/images/hobby4.png', alt: 'Running' },
  { id: 5, image: '/images/hobby5.png', alt: 'Natación' },
  { id: 6, image: '/images/hobby6.png', alt: 'Escalada' },
  { id: 7, image: '/images/hobby7.png', alt: 'Yoga' },
  { id: 8, image: '/images/hobby8.png', alt: 'Artes Marciales' },
];

const skills = [
  { name: 'Resistencia', value: 90 },
  { name: 'Fuerza', value: 85 },
  { name: 'Técnica', value: 80 },
  { name: 'Velocidad', value: 75 },
];

export default function HobbiesGrid(): React.ReactElement {
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
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="text-center mb-10"
      >
        <h2 className="text-4xl font-bold text-purple-900">MIS HOBBIES</h2>
      </motion.div>

      <div className="relative w-full">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView="auto"
          centeredSlides={false}
          grabCursor={true}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active',
            bulletClass: 'swiper-pagination-bullet custom-bullet',
            el: '.swiper-pagination-hobbies',
          }}
          className="pb-8" // Espacio para la paginación
        >
          {hobbies.map((hobby) => (
            <SwiperSlide key={hobby.id} className="w-52 sm:w-60 md:w-72">
              <motion.div
                className="relative aspect-square overflow-hidden rounded-lg shadow-lg group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <Image
                  src={hobby.image}
                  alt={hobby.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg font-semibold">{hobby.alt}</h3>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-pagination-hobbies mt-4 flex justify-center"></div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeInOut' }}
        className="mt-10 text-lg text-purple-900 max-w-4xl mx-auto text-center leading-relaxed px-6 sm:px-12"
      >
        Desde los 12 años he practicado con pasión el gimnasio, el ciclismo y el
        patinaje. Actualmente, con 19 años, entreno tres veces al día, combinando
        fuerza, resistencia y técnica. Estas disciplinas no solo han fortalecido mi
        cuerpo, sino también mi carácter, enseñándome valores como la constancia,
        la autodisciplina y la superación personal. Mi compromiso con el deporte es
        parte esencial de mi vida y crecimiento.
      </motion.p>

      <motion.div
        className="mt-12 max-w-4xl mx-auto px-6 sm:px-12"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeInOut' }}
      >
        <h3 className="text-2xl font-semibold text-center text-purple-900 mb-6">
          Habilidades Deportivas
        </h3>
        <div className="space-y-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-md"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1, ease: 'easeOut' }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-purple-800 font-medium">{skill.name}</span>
                <motion.span className="text-purple-700" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }}>
                  {skill.value}%
                </motion.span>
              </div>
              <div className="w-full bg-purple-100 rounded-full h-6 overflow-hidden">
                <motion.div
                  initial={{ width: 0, backgroundColor: 'transparent' }}
                  animate={isInView ? { width: `${skill.value}%`, backgroundColor: 'hsl(300, 76%, 62%)' } : { width: '0%', backgroundColor: 'transparent' }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.1, type: 'spring', stiffness: 100 }}
                  className="bg-purple-600 h-6 rounded-full absolute left-0 top-0 shadow-md flex items-center justify-end px-3 text-white text-sm font-semibold"
                >
                  <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }}>
                    {skill.value}%
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <style jsx>{`
        .swiper-pagination-hobbies {
          /* Estilos para centrar los puntos si es necesario */
        }

        .custom-bullet {
          background-color: #d1d5db;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin: 0 5px;
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 0.3s ease;
        }

        .custom-bullet:hover {
          opacity: 1;
        }

        .custom-bullet-active {
          background-color: #5e2e87; /* Un tono de morado más oscuro */
          opacity: 1;
        }
      `}</style>
    </section>
  );
}