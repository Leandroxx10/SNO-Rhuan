export const mockData = {
  company: {
    name: "SNO",
    fullName: "SNO - Seu Negócio Online",
    slogan: "Transformamos ideias em presença digital",
    description: "A SNO nasceu para ajudar empresas e empreendedores a marcarem presença online de forma profissional, com soluções acessíveis e sob medida.",
    whatsapp: "5511963290107",
    whatsappLink: "https://wa.me/5511963290107?text=Olá,+quero+criar+meu+site+com+a+SNO!",
    email: "contato@sno.digital",
    instagram: "@sno.digital"
  },
  
  services: [
    {
      id: 1,
      title: "Landing Pages",
      description: "Páginas personalizadas que convertem visitantes em clientes",
      icon: "Monitor"
    },
    {
      id: 2,
      title: "Cardápios Digitais",
      description: "Cardápios interativos com QR Code para restaurantes",
      icon: "QrCode"
    },
    {
      id: 3,
      title: "Convites Digitais",
      description: "Convites personalizados para casamentos e eventos",
      icon: "Heart"
    },
    {
      id: 4,
      title: "Suporte Contínuo",
      description: "Manutenção e atualizações do seu site",
      icon: "Headphones"
    }
  ],

  plans: [
    {
      id: 1,
      name: "Essencial",
      price: "149",
      color: "green",
      features: [
        "Landing page simples",
        "Inserção de 1 logo",
        "Troca de cores base", 
        "Até 3 imagens",
        "1 revisão incluída",
        "Suporte por 7 dias"
      ],
      whatsappText: "Olá! Quero contratar o Plano Essencial (R$149)"
    },
    {
      id: 2,
      name: "Profissional", 
      price: "249",
      color: "yellow",
      popular: true,
      features: [
        "Tudo do Plano Essencial",
        "Formulário de contato",
        "Personalização avançada",
        "Até 6 imagens e 2 logos",
        "2 revisões incluídas",
        "Suporte por 30 dias"
      ],
      whatsappText: "Olá! Quero contratar o Plano Profissional (R$249)"
    },
    {
      id: 3,
      name: "Premium",
      price: "399", 
      color: "red",
      features: [
        "Tudo do Profissional",
        "Integração WhatsApp direta",
        "Seções extras",
        "Layout totalmente customizado",
        "Até 10 imagens",
        "Revisões ilimitadas",
        "Suporte prioritário"
      ],
      whatsappText: "Olá! Quero contratar o Plano Premium (R$399)"
    }
  ],

  team: [
    {
      id: 1,
      name: "Leandro Nogueira",
      role: "Desenvolvedor Web",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Vinicius Silva", 
      role: "Designer UI/UX",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Rhuan Alves",
      role: "Estratégia Digital", 
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face"
    }
  ],

  testimonials: [
    {
      id: 1,
      name: "Maria Santos",
      role: "Proprietária - Restaurante Sabor Real",
      comment: "A SNO criou um cardápio digital incrível para o meu restaurante. Os clientes adoraram o QR Code e as vendas aumentaram 40%!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "João Pedro",
      role: "CEO - Tech Solutions",
      comment: "Landing page profissional, entregue no prazo e com suporte excepcional. Recomendo a SNO para qualquer empresa!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Ana & Carlos",
      role: "Noivos",
      comment: "Nosso convite digital ficou lindo! Todos os convidados elogiaram o design elegante e a praticidade.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=80&h=80&fit=crop&crop=face"
    }
  ]
};

// Contact form submission moved to /src/services/api.js