'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaGithub, FaEnvelope } from 'react-icons/fa6';
import { useInView, motion } from 'framer-motion';

export default function ContactSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
    hover: {
      scale: 1.05,
      boxShadow: '0px 10px 20px rgba(72, 0, 78, 0.2)',
    },
  };

  const contactItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      scale: 1.05,
      color: '#6a006e',
      x: 5,
    },
  };

  return (
    <motion.section
      id="contact"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center py-16 px-6 sm:px-12 md:px-24 text-[#48004e]"
      style={{ backgroundColor: 'hsl(300, 43%, 95%)' }}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={sectionVariants}
    >
      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold mb-12 border-t border-b border-[#48004e] px-4 py-2"
        variants={titleVariants}
      >
        CONTACTO
      </motion.h2>

      <div className="flex flex-col md:flex-row items-center gap-12 max-w-4xl mx-auto w-full">

        <motion.figure
          className="relative rounded overflow-hidden shadow-lg md:order-1 w-full md:w-1/2 aspect-[3/4]"
          variants={imageVariants}
          whileHover="hover"
        >
          <Image
            src="/yuly-foto-contac.jpg"
            alt="Foto de contacto de Yuly Bastidas"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </motion.figure>

        <address className="flex flex-col items-start gap-6 text-lg font-semibold md:order-2 w-full md:w-1/2 not-italic">

          <motion.a
            href="tel:+573185953095"
            className="flex items-center gap-3 hover:underline"
            variants={contactItemVariants}
            whileHover="hover"
          >
            <FaPhoneAlt className="text-2xl" />
            <span>3185953095</span>
          </motion.a>

          <motion.a
            href="https://github.com/yulbastidas"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:underline"
            variants={contactItemVariants}
            whileHover="hover"
          >
            <FaGithub className="text-2xl" />
            <span>yulbastidas</span>
          </motion.a>

          <motion.a
            href="mailto:bastidasyuly1081@gmail.com"
            className="flex items-center gap-3 hover:underline"
            variants={contactItemVariants}
            whileHover="hover"
          >
            <FaEnvelope className="text-2xl" />
            <span>bastidasyuly1081@gmail.com</span>
          </motion.a>

        </address>

      </div>
    </motion.section>
  );
}