import React from 'react';
import { Linkedin, Twitter, Github } from 'lucide-react';
import { mockData } from '../data/mock';

const Team = () => {
  return (
    <section id="equipe" className="py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Nossa <span className="text-blue-400">Equipe</span>
            </h2>
            <div className="w-24 h-1 bg-blue-400 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Profissionais especializados e apaixonados por criar soluções digitais excepcionais
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {mockData.team.map((member) => (
              <div
                key={member.id}
                className="group bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-blue-400/30 transition-all duration-300 hover:transform hover:scale-105"
              >
                {/* Member Image */}
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-600 group-hover:border-blue-400 transition-colors duration-300">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Member Info */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-200">
                    {member.name}
                  </h3>
                  <p className="text-blue-400 font-semibold mb-4">{member.role}</p>
                  
                  {/* Social Links */}
                  <div className="flex justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href="#"
                      className="bg-gray-700 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-200"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href="#"
                      className="bg-gray-700 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-200"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a
                      href="#"
                      className="bg-gray-700 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-200"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Team CTA */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Quer fazer parte da nossa equipe?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Estamos sempre em busca de talentos para fortalecer nosso time. 
                Envie seu portfólio e venha crescer conosco!
              </p>
              <a
                href="https://wa.me/5511963290107?text=Olá! Tenho interesse em trabalhar na SNO. Posso enviar meu portfólio?"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200"
              >
                Trabalhe Conosco
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;