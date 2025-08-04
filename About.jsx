import React from 'react';
import { Target, Users, Award, Zap } from 'lucide-react';
import { mockData } from '../data/mock';

const About = () => {
  const features = [
    {
      icon: Target,
      title: "Foco em Resultados",
      description: "Cada projeto é desenvolvido pensando na conversão e no retorno do investimento."
    },
    {
      icon: Users,
      title: "Atendimento Personalizado", 
      description: "Acompanhamento próximo e suporte dedicado durante todo o processo."
    },
    {
      icon: Award,
      title: "Qualidade Garantida",
      description: "Padrões elevados de qualidade em todos os nossos projetos digitais."
    },
    {
      icon: Zap,
      title: "Entrega Rápida",
      description: "Prazos respeitados e entregas ágeis para você sair na frente da concorrência."
    }
  ];

  return (
    <section id="sobre" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Sobre a <span className="text-blue-400">{mockData.company.name}</span>
            </h2>
            <div className="w-24 h-1 bg-blue-400 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {mockData.company.description}
            </p>
          </div>

          {/* Main content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-4">
                Por que escolher a SNO?
              </h3>
              
              <p className="text-gray-300 leading-relaxed">
                Nossa missão é democratizar a presença digital, oferecendo soluções profissionais 
                e acessíveis para empresas de todos os tamanhos. Combinamos criatividade, 
                tecnologia e estratégia para entregar resultados que realmente fazem a diferença.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                Com uma equipe especializada e processos bem definidos, garantimos que seu 
                projeto seja entregue com a qualidade e no prazo que você merece.
              </p>

              <div className="pt-4">
                <a
                  href={mockData.company.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Fale conosco
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-8 backdrop-blur-sm border border-gray-600/20">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-blue-400 mb-2">3+</div>
                    <div className="text-gray-300">Anos de Experiência</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-400 mb-2">50+</div>
                    <div className="text-gray-300">Projetos Concluídos</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-400 mb-2">98%</div>
                    <div className="text-gray-300">Taxa de Satisfação</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-400 mb-2">24h</div>
                    <div className="text-gray-300">Tempo de Resposta</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 backdrop-blur-sm border border-gray-600/20 hover:border-blue-400/20 transition-all duration-300 group-hover:transform group-hover:scale-105">
                  <div className="bg-blue-500/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors duration-200">
                    <feature.icon className="w-8 h-8 text-blue-400 mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;