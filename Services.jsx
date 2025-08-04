import React from 'react';
import { Monitor, QrCode, Heart, Headphones, ArrowRight } from 'lucide-react';
import { mockData } from '../data/mock';

const Services = () => {
  const getIcon = (iconName) => {
    const icons = {
      Monitor,
      QrCode, 
      Heart,
      Headphones
    };
    return icons[iconName] || Monitor;
  };

  return (
    <section id="servicos" className="py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Nossos <span className="text-blue-400">Serviços</span>
            </h2>
            <div className="w-24 h-1 bg-blue-400 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Soluções completas para fortalecer sua presença digital e impulsionar seus negócios
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
            {mockData.services.map((service, index) => {
              const IconComponent = getIcon(service.icon);
              return (
                <div 
                  key={service.id} 
                  className="group bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-blue-400/30 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="flex items-start space-x-6">
                    <div className="bg-blue-500/20 rounded-xl p-4 group-hover:bg-blue-500/30 transition-colors duration-200">
                      <IconComponent className="w-8 h-8 text-blue-400" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-200">
                        {service.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <a
                        href={mockData.company.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold group-hover:gap-3 transition-all duration-200"
                      >
                        Saiba mais
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Precisa de algo personalizado?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Nossa equipe está pronta para desenvolver soluções sob medida para suas necessidades específicas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={mockData.company.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200"
              >
                Solicitar Orçamento
              </a>
              <button
                onClick={() => document.querySelector('#planos').scrollIntoView({ behavior: 'smooth' })}
                className="bg-transparent border-2 border-gray-600 hover:border-gray-500 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200"
              >
                Ver Planos
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;