import React from 'react';
import { User } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, className }) => {
  return (
    <article
      className={`rounded-lg shadow-md p-6 w-full sm:w-80 ${className}`}
      style={{
        backgroundColor: 'var(--bg-primary-lightest)',
        color: 'var(--bg-primary-darkest)',
      }}
    >
      <header className="flex items-center space-x-4">
        <figure className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden">
          {testimonial.imageUrl ? (
            <img
              src={testimonial.imageUrl}
              alt={`Foto de ${testimonial.name}`}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <User size={24} className="text-gray-600" />
          )}
        </figure>

        <div>
          <h3 className="font-semibold">{testimonial.name}</h3>
          <cite className="text-sm not-italic">{testimonial.role}</cite>
        </div>
      </header>

      <p className="mt-4">{testimonial.content}</p>
    </article>
  );
};

export default TestimonialCard;