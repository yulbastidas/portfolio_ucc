import React from 'react';
import { User } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, className }) => {
  return (
    <div
      className={`rounded-lg shadow-md p-6 w-full sm:w-80 ${className}`}
      style={{ backgroundColor: 'var(--bg-primary-lightest)', color: 'var(--bg-primary-darkest)' }} // Fondo morado más claro
    >
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden">
          {testimonial.imageUrl ? (
            <img
              src={testimonial.imageUrl}
              alt={testimonial.name}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <User size={24} className="text-gray-600" />
          )}
        </div>
        <div>
          <h4 className="font-semibold">{testimonial.name}</h4>
          <p className="text-sm">{testimonial.role}</p>
        </div>
      </div>
      <p className="mt-4">{testimonial.content}</p>
    </div>
  );
};

export default TestimonialCard;