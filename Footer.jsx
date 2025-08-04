import React from 'react';
import { ArrowUp } from 'lucide-react';
import { mockData } from '../data/mock';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const menuItems = [
    { href: '#inicio', label: 'Início' },
    { href: '#sobre', label: 'Sobre' },
    { href: '#servicos', label: 'Serviços' },
    { href: '#planos', label: 'Planos' },
    { href: '#equipe', label: 'Equipe' },
    { href: '#depoimentos', label: 'Depoimentos' },
    { href: '#contato', label: 'Contato' }
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {mockData.company.name}
                </h3>
                <p className="text-blue-400 font-semibold mb-4">
                  {mockData.company.slogan}
                </p>
                <p className="text-gray-400 leading-relaxed">
                  {mockData.company.description}
                </p>
              </div>
              
              <div>
                <a
                  href={mockData.company.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-200"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-xl font-bold text-white mb-6">Navegação</h4>
              <nav className="space-y-3">
                {menuItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="block text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-xl font-bold text-white mb-6">Contato</h4>
              <div className="space-y-4 text-gray-400">
                <div>
                  <p className="font-semibold text-white mb-1">WhatsApp:</p>
                  <a
                    href={`https://wa.me/${mockData.company.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 transition-colors duration-200"
                  >
                    +55 11 96329-0107
                  </a>
                </div>
                
                <div>
                  <p className="font-semibold text-white mb-1">E-mail:</p>
                  <a
                    href={`mailto:${mockData.company.email}`}
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    {mockData.company.email}
                  </a>
                </div>
                
                <div>
                  <p className="font-semibold text-white mb-1">Instagram:</p>
                  <a
                    href="https://instagram.com/sno.digital"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-400 hover:text-pink-300 transition-colors duration-200"
                  >
                    {mockData.company.instagram}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-gray-400 text-center sm:text-left">
              © 2025 {mockData.company.name} - Todos os direitos reservados.
            </p>
            
            <button
              onClick={scrollToTop}
              className="mt-4 sm:mt-0 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-colors duration-200 group"
              aria-label="Voltar ao topo"
            >
              <ArrowUp className="w-5 h-5 group-hover:transform group-hover:-translate-y-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;