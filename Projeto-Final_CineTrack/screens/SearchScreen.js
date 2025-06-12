import React, { useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { Appbar, TextInput, Button, Card, Text, useTheme } from 'react-native-paper';
import { searchMoviesAndSeries } from '../api/TmdbService';

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 2; 
const ITEM_WIDTH = (width / NUM_COLUMNS) - 24; 

const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const theme = useTheme();

  const handleSearch = async () => {
    if (!searchText.trim()) {
      setResults([]);
      setError('Por favor, digite algo para pesquisar.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const searchResults = await searchMoviesAndSeries(searchText);
      setResults(searchResults);
      if (searchResults.length === 0) {
        setError('Nenhum resultado encontrado para sua pesquisa.');
      }
    } catch (err) {
      setError('Não foi possível realizar a pesquisa. Verifique sua conexão ou chave da API.');
      console.error('Erro ao pesquisar:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <Card style={[styles.card, { backgroundColor: theme.colors.cardBackground }]} onPress={() => navigation.navigate('DetalhesExplorar', { item })}>
      {item.poster_path ? (
        <Card.Cover
          source={{ uri: item.poster_path }}
          style={[styles.cardCover, { backgroundColor: theme.colors.placeholder }]}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.noImageContainer, { backgroundColor: theme.colors.placeholder }]}>
          <Text style={styles.noImageText}>Pôster não disponível</Text>
        </View>
      )}
      <Card.Content style={styles.cardContent}>
        <Text variant="titleMedium" numberOfLines={2} style={styles.cardTitle}>{item.title}</Text>
        <Text variant="bodySmall" style={styles.cardSubtitle}>{item.year}</Text>
        <Text variant="bodySmall" style={styles.cardRating}>Avaliação: {item.rating}</Text>
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <Button
          onPress={() => navigation.navigate('DetalhesExplorar', { item })}
          mode="text"
          labelStyle={{ color: theme.colors.primary }}
        >
          Ver Detalhes
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.primary, elevation: 2 }}> 
        <Appbar.Content title="Pesquisar Filmes & Séries" titleStyle={{ fontSize: 24, color: theme.colors.buttonText }} /> 
      </Appbar.Header>

      <View style={[styles.searchContainer, { backgroundColor: theme.colors.surface, elevation: 2 }]}>
        <TextInput
          label="Pesquisar por título"
          value={searchText}
          onChangeText={setSearchText}
          mode="outlined"
          style={[styles.searchInput, { backgroundColor: theme.colors.inputBackground }]}
          theme={{ roundness: theme.roundness, colors: { primary: theme.colors.primary, placeholder: theme.colors.placeholder, text: theme.colors.text, background: theme.colors.inputBackground, outline: theme.colors.text } }}
          onSubmitEditing={handleSearch}
        />
        <Button
          mode="contained"
          onPress={handleSearch}
          style={[styles.searchButton, { backgroundColor: theme.colors.primary, borderRadius: theme.roundness }]}
          labelStyle={{ color: theme.colors.buttonText }}
          loading={loading}
          disabled={loading}
        >
          Pesquisar
        </Button>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text variant="bodyLarge" style={{ color: theme.colors.text }}>Buscando resultados...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text variant="bodyLarge" style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text>
        </View>
      ) : results.length === 0 && searchText.trim() !== '' ? (
        <View style={styles.emptyContainer}>
          <Text variant="headlineSmall" style={{ color: theme.colors.text }}>Nenhum resultado encontrado.</Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.text }}>Tente uma pesquisa diferente.</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={NUM_COLUMNS}
          key={NUM_COLUMNS.toString()}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.row}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderRadius: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
  },
  searchButton: {
    paddingVertical: 4,
    elevation: 3,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 8,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  card: {
    width: ITEM_WIDTH,
    marginHorizontal: 8,
    marginBottom: 8,
    borderRadius: 12,
    elevation: 4,
    overflow: 'hidden',
  },
  cardCover: {
    height: ITEM_WIDTH * 1.5,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  noImageContainer: {
    height: ITEM_WIDTH * 1.5,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    padding: 10,
  },
  cardContent: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  cardTitle: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  cardRating: {
    fontSize: 12,
    color: '#444',
    marginTop: 4,
  },
  cardActions: {
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default SearchScreen;
