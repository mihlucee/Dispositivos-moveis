// screens/FavoritesScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import { Appbar, Card, Text, Button, IconButton, Dialog, Portal, useTheme } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { getMoviesAndSeries, deleteMovieOrSerie } from '../data/AsyncStorageService';

// Calcula a largura de cada item para ter 2 colunas com algum espaçamento
const { width } = Dimensions.get('window');
const NUM_COLUMNS = 2; // Definindo o número de colunas como uma constante
const ITEM_WIDTH = (width / NUM_COLUMNS) - 24; // (Largura da tela / 2 colunas) - (margem total por item)

const FavoritesScreen = ({ navigation }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const theme = useTheme();

  // Função para carregar os itens favoritos (do AsyncStorage)
  const loadFavoriteItems = async () => {
    const data = await getMoviesAndSeries();
    setFavoriteItems(data);
  };

  // Recarrega os favoritos sempre que a tela for focada
  useFocusEffect(
    useCallback(() => {
      loadFavoriteItems();
      return () => {};
    }, [])
  );

  // Função para confirmar a exclusão
  const confirmDelete = (item) => {
    setItemToDelete(item);
    setShowDialog(true);
  };

  // Função para deletar um filme/série dos favoritos (e do AsyncStorage)
  const handleDelete = async () => {
    if (itemToDelete) {
      const success = await deleteMovieOrSerie(itemToDelete.id);
      if (success) {
        loadFavoriteItems(); // Recarrega a lista após a exclusão
      } else {
        console.log('Erro ao deletar o item favorito.');
      }
      setShowDialog(false);
      setItemToDelete(null);
    }
  };

  const renderItem = ({ item }) => (
    <Card style={[styles.card, { backgroundColor: theme.colors.cardBackground }]} onPress={() => navigation.navigate('DetalhesFavoritos', { item })}>
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
      <View style={styles.cardActionsContainer}>
        <IconButton
          icon="pencil"
          size={20}
          color={theme.colors.primary}
          // CORREÇÃO AQUI: Navegando para 'EditarFavoritos' em vez de 'Cadastrar'
          onPress={() => navigation.navigate('EditarFavoritos', { item, isEditing: true })}
          style={styles.actionButton}
        />
        <IconButton
          icon="delete"
          size={20}
          color={theme.colors.error}
          onPress={() => confirmDelete(item)}
          style={styles.actionButton}
        />
      </View>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.primary, elevation: 2 }}>
        <Appbar.Content title="Meus Favoritos" titleStyle={{ fontSize: 24, color: theme.colors.buttonText }} />
      </Appbar.Header>

      {favoriteItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text variant="headlineMedium" style={{ color: theme.colors.text }}>Nenhum item favorito encontrado.</Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.text }}>Adicione filmes/séries da aba "Explorar" ou "Minha Lista".</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={NUM_COLUMNS}
          key={NUM_COLUMNS.toString()}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.row}
        />
      )}

      {/* Diálogo de confirmação de exclusão */}
      <Portal>
        <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)} style={{ borderRadius: theme.roundness }}>
          <Dialog.Title style={{ color: theme.colors.text }}>Confirmar Exclusão</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium" style={{ color: theme.colors.text }}>
              Tem certeza que deseja excluir "{itemToDelete?.title}" dos seus favoritos?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDialog(false)} labelStyle={{ color: theme.colors.text }}>Cancelar</Button>
            <Button onPress={handleDelete} labelStyle={{ color: theme.colors.error }}>Confirmar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  cardActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingBottom: 4,
  },
  actionButton: {
    margin: 0,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default FavoritesScreen;
