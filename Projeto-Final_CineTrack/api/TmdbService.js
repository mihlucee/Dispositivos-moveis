const API_KEY = 'd646107a1061c84bfbbf29e65e3f44c3'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; 

/**
 * Função auxiliar para fazer requisições à API do TMDB.
 * @param {string} endpoint 
 * @param {object} params 
 * @returns {Promise<object>} 
 */
const fetchTmdb = async (endpoint, params = {}) => {
  const query = new URLSearchParams({
    api_key: API_KEY,
    language: 'pt-BR', 
    ...params,
  }).toString();

  const url = `${BASE_URL}${endpoint}?${query}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Erro na API do TMDB: ${response.status} - ${errorData.status_message || 'Erro desconhecido'}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados do TMDB:', error);
    throw error; 
  }
};


const getPlaceholderImage = (title) => {
  const encodedTitle = encodeURIComponent(title || 'Sem título');
  return `https://placehold.co/600x400/CCCCCC/000000?text=${encodedTitle.replace(/\s/g, '+')}`;
};

/**
 * Busca filmes populares no TMDB.
 * @returns {Promise<Array>} Uma lista de filmes populares.
 */
export const getPopularMovies = async () => {
  try {
    const data = await fetchTmdb('/movie/popular');
    return data.results.map(movie => ({
      id: movie.id.toString(),
      title: movie.title,
      year: movie.release_date ? movie.release_date.substring(0, 4) : 'N/A',
      genre: 'Filme',
      director: 'N/A',
      rating: movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A',
      description: movie.overview || 'Sem descrição.',
      poster_path: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : getPlaceholderImage(movie.title),
      isTmdbItem: true,
      media_type: 'movie',
    }));
  } catch (error) {
    console.error('Erro ao buscar filmes populares:', error);
    return [];
  }
};

/**
 * Busca próximos lançamentos de filmes no TMDB.
 * @returns {Promise<Array>} Uma lista de filmes que serão lançados em breve.
 */
export const getUpcomingMovies = async () => {
  try {
    const data = await fetchTmdb('/movie/upcoming');
    return data.results.map(movie => ({
      id: movie.id.toString(),
      title: movie.title,
      year: movie.release_date ? movie.release_date.substring(0, 4) : 'N/A',
      genre: 'Filme',
      director: 'N/A',
      rating: movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A',
      description: movie.overview || 'Sem descrição.',
      poster_path: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : getPlaceholderImage(movie.title),
      isTmdbItem: true,
      media_type: 'movie',
    }));
  } catch (error) {
    console.error('Erro ao buscar próximos lançamentos:', error);
    return [];
  }
};


/**
 * Pesquisa filmes ou séries no TMDB.
 * @param {string} query A consulta de pesquisa.
 * @returns {Promise<Array>} Uma lista de resultados de pesquisa.
 */
export const searchMoviesAndSeries = async (query) => {
  if (!query) return [];
  try {
    const data = await fetchTmdb('/search/multi', { query }); 
    return data.results
      .filter(item => item.media_type === 'movie' || item.media_type === 'tv') 
      .map(item => ({
        id: item.id.toString(),
        title: item.media_type === 'movie' ? item.title : item.name,
        year: item.release_date || item.first_air_date ? (item.release_date || item.first_air_date).substring(0, 4) : 'N/A',
        genre: item.media_type === 'movie' ? 'Filme' : 'Série', 
        director: 'N/A',
        rating: item.vote_average ? item.vote_average.toFixed(1) : 'N/A',
        description: item.overview || 'Sem descrição.',
        poster_path: item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : getPlaceholderImage(item.title || item.name),
        isTmdbItem: true, 
        media_type: item.media_type,
      }));
  } catch (error) {
    console.error('Erro ao pesquisar filmes/séries:', error);
    return [];
  }
};

