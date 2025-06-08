// api/TmdbService.js
const API_KEY = 'd646107a1061c84bfbbf29e65e3f44c3'; // <<< SUBSTITUA PELA SUA CHAVE DO TMDB AQUI!
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // Base URL para imagens de pôster

/**
 * Função auxiliar para fazer requisições à API do TMDB.
 * @param {string} endpoint O endpoint da API (ex: '/movie/popular').
 * @param {object} params Parâmetros de query adicionais.
 * @returns {Promise<object>} Os dados da resposta da API.
 */
const fetchTmdb = async (endpoint, params = {}) => {
  const query = new URLSearchParams({
    api_key: API_KEY,
    language: 'pt-BR', // Define o idioma para português do Brasil
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
    throw error; // Re-lança o erro para ser tratado na tela
  }
};

// Função auxiliar para gerar URL de placeholder
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
      // Garante que poster_path sempre tenha uma URL, mesmo que seja de placeholder
      poster_path: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : getPlaceholderImage(movie.title),
      // Adiciona uma flag para identificar que veio do TMDB
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
    const data = await fetchTmdb('/search/multi', { query }); // search/multi pesquisa filmes e séries
    return data.results
      .filter(item => item.media_type === 'movie' || item.media_type === 'tv') // Filtra apenas filmes e séries
      .map(item => ({
        id: item.id.toString(),
        title: item.media_type === 'movie' ? item.title : item.name,
        year: item.release_date || item.first_air_date ? (item.release_date || item.first_air_date).substring(0, 4) : 'N/A',
        genre: item.media_type === 'movie' ? 'Filme' : 'Série', // Simplificado
        director: 'N/A',
        rating: item.vote_average ? item.vote_average.toFixed(1) : 'N/A',
        description: item.overview || 'Sem descrição.',
        poster_path: item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : getPlaceholderImage(item.title || item.name),
        isTmdbItem: true, // Adiciona uma flag para identificar que veio do TMDB
        media_type: item.media_type,
      }));
  } catch (error) {
    console.error('Erro ao pesquisar filmes/séries:', error);
    return [];
  }
};

/**
 * Busca vídeos (incluindo trailers) de um filme ou série no TMDB.
 * @param {string} id O ID do filme/série.
 * @param {string} mediaType 'movie' ou 'tv'.
 * @returns {Promise<string|null>} A chave do YouTube para o trailer, ou null se não for encontrado.
 */
export const getMovieVideos = async (id, mediaType = 'movie') => {
  try {
    const data = await fetchTmdb(`/${mediaType}/${id}/videos`);
    // Procura por um trailer do YouTube em português (Brasil)
    const trailer = data.results.find(
      (video) => video.site === 'YouTube' && video.type === 'Trailer' && video.iso_639_1 === 'pt'
    );
    // Se não encontrar em pt, tenta em inglês
    if (!trailer) {
      const fallbackTrailer = data.results.find(
        (video) => video.site === 'YouTube' && video.type === 'Trailer' && video.iso_639_1 === 'en'
      );
      return fallbackTrailer ? fallbackTrailer.key : null;
    }
    return trailer.key;
  } catch (error) {
    console.error(`Erro ao buscar vídeos para ${mediaType} com ID ${id}:`, error);
    return null;
  }
};
