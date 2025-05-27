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
      style={{ backgroundColor: 'var(--bg-primary-lightest)', color: 'var(--bg-primary-darkest)' }}
    >
      <header className="flex items-center space-x-4">
        <figure className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden">
          {testimonial.imageUrl ? (
            <img
              src={testimonial.imageUrl}
              alt={testimonial.name}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <User size={24} className="text-gray-600" />
          )}
        </figure>
        <cite>
          <h4 className="font-semibold">{testimonial.name}</h4>
          <p className="text-sm">{testimonial.role}</p>
        </cite>
      </header>
      <p className="mt-4">{testimonial.content}</p>
    </article>
  );
};

export default TestimonialCard;