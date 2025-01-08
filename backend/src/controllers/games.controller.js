import axios from 'axios';

// Función para obtener juegos desde RAWG.io
const getGamesFromRAWG = async () => {
  try {
    const response = await axios.get('https://api.rawg.io/api/games', {
      params: {
        key: process.env.RAWG_API_KEY, 
        page_size: 5, 
      },
    });

    return response.data.results;
  } catch (error) {
    console.error('Error obteniendo juegos de RAWG.io:', error);
    return [];
  }
};

export { getGamesFromRAWG };