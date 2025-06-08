// screens/DetailsScreen.js
import React, { useState } from 'react'; // Removido useEffect, useRef
import { View, StyleSheet, ScrollView } from 'react-native'; // Removido ActivityIndicator, Linking
import { Appbar, Card, Text, Chip, Button, Snackbar, useTheme } from 'react-native-paper';
import { saveMovieOrSerie, getMoviesAndSeries } from '../data/AsyncStorageService';
// Removido import { getMovieVideos } from '../api/TmdbService';
// Removido import { Video } from 'expo-av';

const DetailsScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  // Removido trailerKey, loadingTrailer, errorTrailer states
  // Removido video useRef
  const theme = useTheme();

  // Removido useEffect para buscar trailer

  const handleAddToMyList = async () => {
    try {
      const currentItems = await getMoviesAndSeries();
      const isAlreadySaved = currentItems.some(savedItem => savedItem.id === item.id);

      if (isAlreadySaved) {
        setSnackbarMessage('Este item já está na sua lista!');
      } else {
        const success = await saveMovieOrSerie(item);
        if (success) {
          setSnackbarMessage('Adicionado à sua lista com sucesso!');
        } else {
          setSnackbarMessage('Erro ao adicionar à sua lista.');
        }
      }
    } catch (error) {
      console.error('Erro ao adicionar à lista:', error);
      setSnackbarMessage('Ocorreu um erro inesperado.');
    } finally {
      setSnackbarVisible(true);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.primary, elevation: 2 }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color={theme.colors.buttonText} />
        <Appbar.Content title={item.title} titleStyle={{ fontSize: 20, color: theme.colors.buttonText }} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          {/* Sempre exibe o pôster ou placeholder */}
          {item.poster_path ? (
            <Card.Cover
              source={{ uri: item.poster_path }}
              style={styles.cardCover}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.noImageContainer, { backgroundColor: theme.colors.placeholder }]}>
              <Text style={styles.noImageText}>Pôster não disponível</Text>
            </View>
          )}

          <Card.Content style={styles.cardContent}>
            <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.text }]}>{item.title}</Text>
            <Text variant="bodyLarge" style={[styles.yearGenre, { color: theme.colors.placeholder }]}>{item.year} - {item.genre}</Text>

            <View style={styles.chipContainer}>
              <Chip icon="star" style={[styles.chip, { backgroundColor: theme.colors.accent }]}>
                <Text variant="bodyLarge" style={{ color: '#FFFFFF' }}>{item.rating}</Text>
              </Chip>
            </View>

            {item.director && item.director !== 'N/A' && (
              <Text variant="bodyMedium" style={[styles.director, { color: theme.colors.text }]}>
                Diretor: <Text>{item.director}</Text>
              </Text>
            )}

            <Text variant="bodyMedium" style={[styles.description, { color: theme.colors.text }]}>
              {item.description}
            </Text>
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <Button
              mode="contained"
              onPress={handleAddToMyList}
              icon="plus-circle"
              style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
              labelStyle={[styles.buttonLabel, { color: theme.colors.buttonText }]}
            >
              Adicionar à Minha Lista
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: 'OK',
          onPress: () => {
            setSnackbarVisible(false);
          },
          labelStyle: { color: theme.colors.accent }
        }}
        style={[styles.snackbar, { backgroundColor: theme.colors.surface, borderRadius: theme.roundness }]}
      >
        <Text style={{ color: theme.colors.text }}>{snackbarMessage}</Text>
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // Mantém o padding inferior para rolagem
  },
  card: {
    borderRadius: 12,
    elevation: 6,
    overflow: 'hidden',
  },
  cardCover: { // Estilo para o Card.Cover
    height: 280,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    width: '100%',
  },
  // Removido videoPlayer, mediaContainer (não mais necessários sem o player)
  noImageContainer: { // Estilo para o placeholder de imagem (quando não há pôster)
    height: 280, // Mantém a mesma altura do pôster
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
  // Removido trailerErrorContainer, trailerErrorText
  cardContent: {
    padding: 20,
  },
  title: {
    marginBottom: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  yearGenre: {
    marginBottom: 16,
    textAlign: 'center',
  },
  chipContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  chip: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  director: {
    marginBottom: 10,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  description: {
    lineHeight: 24,
    textAlign: 'justify',
  },
  cardActions: {
    justifyContent: 'center',
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexWrap: 'wrap',
  },
  addButton: {
    borderRadius: 10,
    paddingVertical: 5,
    elevation: 3,
    marginTop: 10,
  },
  // Removido playTrailerButton (não mais necessário)
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  snackbar: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    elevation: 6,
  }
});

export default DetailsScreen;
