import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@CineTrack:moviesAndSeries'; 

/**
 * @returns {Array} Uma lista de filmes e séries.
 */
export const getMoviesAndSeries = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Erro ao carregar filmes e séries:', e);
    return [];
  }
};

/**
 * @param {Object} newItem O novo item a ser salvo.
 * @returns {boolean} True se o item foi salvo com sucesso, false caso contrário.
 */
export const saveMovieOrSerie = async (newItem) => {
  try {
    const currentItems = await getMoviesAndSeries();
    const updatedItems = [...currentItems, { ...newItem, id: Date.now().toString() }]; 
    const jsonValue = JSON.stringify(updatedItems);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    console.log('Item salvo com sucesso:', newItem.title);
    return true;
  } catch (e) {
    console.error('Erro ao salvar filme ou série:', e);
    return false;
  }
};

/**
 * @param {Object} updatedItem O item atualizado.
 * @returns {boolean} True se o item foi atualizado com sucesso, false caso contrário.
 */
export const updateMovieOrSerie = async (updatedItem) => {
  try {
    const currentItems = await getMoviesAndSeries();
    const itemIndex = currentItems.findIndex(item => item.id === updatedItem.id);

    if (itemIndex > -1) {
      currentItems[itemIndex] = updatedItem; 
      const jsonValue = JSON.stringify(currentItems);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      console.log('Item atualizado com sucesso:', updatedItem.title);
      return true;
    }
    console.warn('Item não encontrado para atualização:', updatedItem.id);
    return false;
  } catch (e) {
    console.error('Erro ao atualizar filme ou série:', e);
    return false;
  }
};

/**
 * Deleta um filme ou série do AsyncStorage.
 * @param {string} id O ID do item a ser deletado.
 * @returns {boolean} True se o item foi deletado com sucesso, false caso contrário.
 */
export const deleteMovieOrSerie = async (id) => {
  try {
    const currentItems = await getMoviesAndSeries();
    const filteredItems = currentItems.filter(item => item.id !== id); 
    const jsonValue = JSON.stringify(filteredItems);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    console.log('Item deletado com sucesso:', id);
    return true;
  } catch (e) {
    console.error('Erro ao deletar filme ou série:', e);
    return false;
  }
};

/**
 * Deleta todos os filmes e séries do AsyncStorage.
 */
export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage limpo com sucesso.');
  } catch (e) {
    console.error('Erro ao limpar AsyncStorage:', e);
  }
};
