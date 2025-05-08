'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaGithub, FaEnvelope } from 'react-icons/fa6';
import { useInView, motion } from 'framer-motion';

export default function ContactSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  // Variante para la sección principal
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.8,
      },
    },
  };

  // Variante para el título con movimiento especial
  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  // Variante para la imagen
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: '0px 10px 20px rgba(72, 0, 78, 0.2)',
      transition: {
        duration: 0.3,
      },
    },
  };

  // Variante para los elementos de contacto
  const contactItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.1,
      color: '#6a006e',
      x: 10,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-start py-16 px-6 sm:px-12 md:px-24"
      style={{ backgroundColor: 'hsl(300, 43%, 95%)' }}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={sectionVariants}
    >
      <motion.h1
        className="text-4xl font-extrabold text-[#48004e] mb-12 border-t border-b border-[#48004e] px-4 py-2"
        variants={titleVariants}
      >
        CONTACTO
      </motion.h1>

      <div className="flex flex-col md:flex-row items-center gap-12 max-w-3xl mx-auto w-full">
        {/* Imagen con animación al hacer hover */}
        <motion.div
          className="rounded overflow-hidden shadow-lg md:order-1"
          variants={imageVariants}
          whileHover="hover"
        >
          <Image
            src="/yuly-contacto.png"
            alt="Foto de contacto"
            width={300}
            height={400}
            className="object-cover w-full h-full"
          />
        </motion.div>

        {/* Información de contacto con animación individual por cada ítem */}
        <div className="flex flex-col items-start gap-6 text-[#48004e] text-lg font-semibold md:order-2">
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            variants={contactItemVariants}
            whileHover="hover"
          >
            <FaPhoneAlt className="text-2xl" />
            <span>3185953095</span>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            variants={contactItemVariants}
            whileHover="hover"
          >
            <FaGithub className="text-2xl" />
            <span>yulbastidas</span>
          </motion.div>

          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            variants={contactItemVariants}
            whileHover="hover"
          >
            <FaEnvelope className="text-2xl" />
            <a
              href="mailto:bastidasyuly1081@gmail.com"
              className="underline hover:text-[#6a006e]"
            >
              bastidasyuly1081@gmail.com
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}