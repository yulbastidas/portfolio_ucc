'use client';

import ProjectCard from './ProjectCard';
import { Project } from '../../app/types';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import React, { useState, useEffect, useRef } from 'react';

interface ProjectWithGithub extends Project {
  githubUrl?: string;
}

const projectsData: ProjectWithGithub[] = [
  {
    id: 1,
    title: 'PROYECTO 1',
    imageUrl: '/images/proyecto1.png',
    description: 'Descripción del proyecto 1',
    url: 'https://proyecto1.com',
    githubUrl: 'https://github.com/usuario/proyecto1',
  },
  {
    id: 2,
    title: 'PROYECTO 2',
    imageUrl: '/images/proyecto2.png',
    description: 'Descripción del proyecto 2',
    url: 'https://proyecto2.com',
    githubUrl: 'https://github.com/usuario/proyecto2',
  },
  {
    id: 3,
    title: 'PROYECTO 3',
    imageUrl: '/images/proyecto3.png',
    description: 'Descripción del proyecto 3',
    url: 'https://proyecto3.com',
    githubUrl: 'https://github.com/usuario/proyecto3',
  },
  {
    id: 4,
    title: 'PROYECTO 4',
    imageUrl: '/images/proyecto4.png',
    description: 'Descripción del proyecto 4',
    url: 'https://proyecto4.com',
    githubUrl: 'https://github.com/usuario/proyecto4',
  },
  {
    id: 5,
    title: 'PROYECTO 5',
    imageUrl: '/images/proyecto5.png',
    description: 'Descripción del proyecto 5',
    url: 'https://proyecto5.com',
    githubUrl: 'https://github.com/usuario/proyecto5',
  },
];

const ProjectsSection: React.FC = () => {
  const [inViewport, setInViewport] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setInViewport(entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <motion.section
      id="projects"
      className="py-16 px-6 sm:px-12 transition-colors duration-300 relative"
      ref={sectionRef}
      initial={{ opacity: 0, y: 50 }} // También podemos hacer que aparezca deslizando desde abajo
      animate={inViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }} // Aumentamos la duración y cambiamos el easing
      style={{ backgroundColor: 'hsl(300, 43%, 95%)' }} // Fondo aplicado aquí
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-4xl sm:text-5xl font-bold text-center mb-12"
          style={{ color: 'var(--bg-primary-darkest)' }}
        >
          MIS PROYECTOS
        </h2>

        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView="auto"
          centeredSlides={false}
          grabCursor={true}
          pagination={{
            clickable: true,
            bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active',
            bulletClass: 'swiper-pagination-bullet custom-bullet',
            el: '.swiper-pagination-custom',
          }}
          navigation={false}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
        >
          {projectsData.map((project) => (
            <SwiperSlide key={project.id} className="w-80">
              <ProjectCard project={project} githubUrl={project.githubUrl} className="custom-project-card" />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-pagination-custom mt-8 flex justify-center"></div>
      </div>
      <style jsx>{`
        .custom-project-card {
          border: 1px solid #e0e0e0;
          border-radius: 0.75rem;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.3s ease-in-out;
        }

        .custom-project-card:hover {
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }

        .swiper-pagination-custom {
          /* Estilos para centrar los puntos */
        }

        .custom-bullet {
          background-color: #cbd5e0;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin: 0 8px;
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

export default ProjectsSection;