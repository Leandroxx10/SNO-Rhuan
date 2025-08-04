import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { mockData } from '../data/mock';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === mockData.testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? mockData.testimonials.length - 1 : prev - 1
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'
        }`}
      />
    ));
  };

  return (
    <section id="depoimentos" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              O que nossos <span className="text-blue-400">clientes dizem</span>
            </h2>
            <div className="w-24 h-1 bg-blue-400 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A satisfação dos nossos clientes é nossa maior conquista
            </p>
          </div>

          {/* Main Testimonial Slider */}
          <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-sm border border-gray-600/20 rounded-2xl p-8 md:p-12 mb-12">
            <div className="text-center">
              {/* Quote Icon */}
              <div className="bg-blue-500/20 rounded-full p-4 w-16 h-16 mx-auto mb-8">
                <Quote className="w-8 h-8 text-blue-400 mx-auto" />
              </div>

              {/* Testimonial Content */}
              <div className="max-w-4xl mx-auto">
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8 italic">
                  "{mockData.testimonials[currentTestimonial].comment}"
                </p>

                {/* Rating */}
                <div className="flex justify-center mb-6">
                  {renderStars(mockData.testimonials[currentTestimonial].rating)}
                </div>

                {/* Client Info */}
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={mockData.testimonials[currentTestimonial].image}
                    alt={mockData.testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
                  />
                  <div className="text-left">
                    <h4 className="text-xl font-bold text-white">
                      {mockData.testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-blue-400">
                      {mockData.testimonials[currentTestimonial].role}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700/50 hover:bg-gray-600/50 text-white p-3 rounded-full transition-colors duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700/50 hover:bg-gray-600/50 text-white p-3 rounded-full transition-colors duration-200"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {mockData.testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentTestimonial
                      ? 'bg-blue-400'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* All Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {mockData.testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`bg-gradient-to-br from-gray-800/30 to-gray-700/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 transition-all duration-300 hover:border-blue-400/30 cursor-pointer ${
                  index === currentTestimonial ? 'ring-2 ring-blue-400/50' : ''
                }`}
                onClick={() => setCurrentTestimonial(index)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
                  />
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-blue-400">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="text-gray-300 text-sm line-clamp-3">
                  {testimonial.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;