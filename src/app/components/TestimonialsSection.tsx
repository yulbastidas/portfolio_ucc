'use client';

import React, { useState, useEffect, useRef } from 'react';
import TestimonialCard from './TestimonialCard';
import { Testimonial } from '../types';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sebastian Rojas',
    role: 'Compañero de clase',
    content:
      'Trabajar con Yuly siempre es una experiencia agradable, es una persona responsable y comprometida con lo que realiza.',
    imageUrl: 'testimonion1.jpg',
  },
  {
    id: 2,
    name: 'Camila Zambrano',
    role: 'Integrante de equipo en proyectos académicos',
    content:
      'Yuly es una persona muy dedicada y organizada. En los proyectos que compartimos siempre destacó por su liderazgo.',
    imageUrl: 'testimonial3.jpg',
  },
  {
    id: 3,
    name: 'Andres Duarte',
    role: 'Profesor',
    content:
      'Yuly tiene la habilidad de trabajar en equipo destacando su liderazgo y capacidad para resolver problemas.',
    imageUrl: 'testimonial2.jpg',
  },
];

const TestimonialsSection: React.FC = () => {
  const [inViewport, setInViewport] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setInViewport(entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  return (
    <motion.section
      id="testimonials"
      ref={sectionRef}
      className="py-16 px-6 sm:px-12 relative"
      style={{ backgroundColor: 'hsl(300, 43%, 95%)' }}
      initial={{ opacity: 0, y: 50 }}
      animate={inViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto">

        <h2
          className="text-3xl sm:text-4xl font-bold text-center mb-8"
          style={{ color: 'var(--bg-primary-darkest)' }}
        >
          TESTIMONIOS
        </h2>

        <div className="rounded-lg py-8 px-4 sm:px-8">
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView="auto"
            grabCursor={true}
            pagination={{
              clickable: true,
              el: '.swiper-pagination-testimonials',
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="w-full sm:w-80">
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* paginación swiper */}
          <div className="swiper-pagination-testimonials mt-6 flex justify-center"></div>
        </div>

      </div>

      <style jsx>{`
        .custom-bullet {
          background-color: #d1d5db;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin: 0 6px;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }

        .custom-bullet:hover {
          opacity: 1;
        }

        .custom-bullet-active {
          background-color: var(--bg-primary-dark);
          opacity: 1;
        }
      `}</style>
    </motion.section>
  );
};

export default TestimonialsSection;