const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const submitContactForm = async (formData) => {
  try {
    const response = await fetch(`${API}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle HTTP errors
      if (response.status === 429) {
        throw new Error(data.message || 'Muitas tentativas. Tente novamente em alguns minutos.');
      }
      throw new Error(data.message || 'Erro ao enviar mensagem');
    }

    return data;
  } catch (error) {
    // Handle network errors
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Erro de conexão. Verifique sua internet e tente novamente.');
    }
    throw error;
  }
};

export const getContactStats = async () => {
  try {
    const response = await fetch(`${API}/contact/stats`);
    
    if (!response.ok) {
      throw new Error('Erro ao obter estatísticas');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching contact stats:', error);
    return null;
  }
};