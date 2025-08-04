import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { mockData } from '../data/mock';

const WhatsAppFloat = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Show tooltip for 3 seconds after appearing
      setTimeout(() => {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 4000);
      }, 1000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end">
      {/* Tooltip */}
      {showTooltip && (
        <div className="bg-white rounded-lg shadow-lg p-3 mr-3 max-w-xs animate-bounce">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-800 text-sm">
              Precisa de ajuda?
            </span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-gray-600 text-xs leading-relaxed">
            Clique aqui para falar conosco no WhatsApp e tirar suas dúvidas!
          </p>
          {/* Arrow */}
          <div className="absolute right-[-8px] top-1/2 transform -translate-y-1/2">
            <div className="w-0 h-0 border-l-8 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
          </div>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={mockData.company.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
        aria-label="Conversar no WhatsApp"
      >
        <MessageCircle className="w-7 h-7 group-hover:animate-bounce" />
        
        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-green-400 opacity-75 animate-ping"></div>
        <div className="absolute inset-0 rounded-full bg-green-400 opacity-50 animate-ping animation-delay-75"></div>
      </a>
    </div>
  );
};

export default WhatsAppFloat;