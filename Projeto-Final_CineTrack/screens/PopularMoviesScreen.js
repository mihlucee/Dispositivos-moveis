// screens/PopularMoviesScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { Appbar, Card, Text, Button, useTheme } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { getPopularMovies } from '../api/TmdbService';

// Calcula a largura de cada item para ter 2 colunas com algum espaçamento
const { width } = Dimensions.get('window');
const NUM_COLUMNS = 2; // Definindo o número de colunas como uma constante
const ITEM_WIDTH = (width / NUM_COLUMNS) - 24; // (Largura da tela / 2 colunas) - (margem total por item)

const PopularMoviesScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  const loadPopularMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const popular = await getPopularMovies();
      setMovies(popular);
    } catch (err) {
      setError('Não foi possível carregar filmes populares. Verifique sua conexão ou chave da API.');
      console.error('Erro ao carregar filmes populares na tela:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadPopularMovies();
      return () => {};
    }, [loadPopularMovies])
  );

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
        <Appbar.Content title="Filmes Populares" titleStyle={{ fontSize: 24, color: theme.colors.buttonText }} /> 
        <Appbar.Action icon="magnify" color={theme.colors.buttonText} onPress={() => navigation.navigate('Pesquisar')} /> 
      </Appbar.Header>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text variant="bodyLarge" style={{ color: theme.colors.text }}>Carregando filmes...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text variant="bodyLarge" style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text>
          <Button onPress={loadPopularMovies} mode="contained" style={{ backgroundColor: theme.colors.primary }}>
            Tentar Novamente
          </Button>
        </View>
      ) : movies.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text variant="headlineMedium" style={{ color: theme.colors.text }}>Nenhum filme popular encontrado.</Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.text }}>Verifique a API ou tente novamente.</Text>
        </View>
      ) : (
        <FlatList
          data={movies}
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

export default PopularMoviesScreen;
