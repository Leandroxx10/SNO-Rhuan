import React from 'react';
import { Check, Star, MessageCircle } from 'lucide-react';
import { mockData } from '../data/mock';

const Plans = () => {
  const getPlanColor = (color) => {
    const colors = {
      green: {
        bg: 'from-green-600/20 to-green-800/20',
        border: 'border-green-400/30',
        accent: 'text-green-400',
        button: 'bg-green-600 hover:bg-green-500'
      },
      yellow: {
        bg: 'from-yellow-600/20 to-yellow-800/20',
        border: 'border-yellow-400/30',
        accent: 'text-yellow-400',
        button: 'bg-yellow-600 hover:bg-yellow-500'
      },
      red: {
        bg: 'from-red-600/20 to-red-800/20',
        border: 'border-red-400/30',
        accent: 'text-red-400',
        button: 'bg-red-600 hover:bg-red-500'
      }
    };
    return colors[color] || colors.green;
  };

  return (
    <section id="planos" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Escolha seu <span className="text-blue-400">Plano</span>
            </h2>
            <div className="w-24 h-1 bg-blue-400 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Soluções sob medida para cada necessidade e orçamento
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {mockData.plans.map((plan) => {
              const colors = getPlanColor(plan.color);
              return (
                <div
                  key={plan.id}
                  className={`relative bg-gradient-to-br ${colors.bg} backdrop-blur-sm border-2 ${colors.border} rounded-2xl p-8 transition-all duration-300 hover:transform hover:scale-105 ${
                    plan.popular ? 'ring-2 ring-blue-400/50 transform scale-105' : ''
                  }`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        Mais Popular
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                    <div className="mb-6">
                      <span className="text-5xl font-bold text-white">R$</span>
                      <span className="text-6xl font-bold text-white">{plan.price}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 ${colors.accent} flex-shrink-0 mt-0.5`} />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <a
                    href={`https://wa.me/5511963290107?text=${encodeURIComponent(plan.whatsappText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full ${colors.button} text-white py-4 px-6 rounded-full font-semibold text-center block transition-all duration-200 hover:transform hover:scale-105 flex items-center justify-center gap-2`}
                  >
                    <MessageCircle className="w-5 h-5" />
                    Contratar via WhatsApp
                  </a>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-sm border border-gray-600/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ainda tem dúvidas sobre qual plano escolher?
              </h3>
              <p className="text-gray-300 mb-6">
                Nossa equipe está pronta para te ajudar a encontrar a solução perfeita
              </p>
              <a
                href="https://wa.me/5511963290107?text=Olá! Preciso de ajuda para escolher o melhor plano para meu negócio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200"
              >
                <MessageCircle className="w-5 h-5" />
                Falar com Consultor
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Plans;