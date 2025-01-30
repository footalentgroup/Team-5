import axios from 'axios';

// Función para obtener juegos desde RAWG.io
const getGamesFromRAWG = async () => {
  try {
    // Realizar la solicitud GET a la API de RAWG con los parámetros necesarios
    const response = await axios.get('https://api.rawg.io/api/games', {
      params: {
        key: process.env.RAWG_API_KEY,  // Utilizar la clave de API almacenada en las variables de entorno
        page_size: 5,  // Limitar la cantidad de resultados a 5
      },
    });

    // Devolver los resultados obtenidos de la API (una lista de juegos)
    return response.data.results;
  } catch (error) {
    // Manejo de errores: si la solicitud falla, se captura el error y se imprime en consola
    console.error('Error obteniendo juegos de RAWG.io:', error);
    // En caso de error, devolver un array vacío
    return [];
  }
};

// Exportar la función para su uso en otras partes del código
export { getGamesFromRAWG };
