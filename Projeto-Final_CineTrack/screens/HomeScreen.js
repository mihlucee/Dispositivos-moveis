import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, FlatList, StyleSheet, Dimensions, ScrollView, ActivityIndicator, ImageBackground } from 'react-native';
import { Appbar, Card, Text, Button, IconButton, Dialog, Portal, useTheme } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { getMoviesAndSeries, deleteMovieOrSerie } from '../data/AsyncStorageService';
import { getPopularMovies } from '../api/TmdbService';
import { Ionicons } from '@expo/vector-icons';


const { width } = Dimensions.get('window');
const HORIZONTAL_ITEM_WIDTH = width * 0.4; 
const MAIN_CAROUSEL_HEIGHT = width * 0.6; 

const MovieCardHorizontal = ({ item, theme, navigation, detailsScreenName = 'Detalhes' }) => (
  <Card style={[homeStyles.horizontalCard, { backgroundColor: theme.colors.cardBackground }]} onPress={() => navigation.navigate(detailsScreenName, { item })}>
    {item.poster_path ? (
      <Card.Cover
        source={{ uri: item.poster_path }}
        style={[homeStyles.horizontalCardCover, { backgroundColor: theme.colors.placeholder }]}
        resizeMode="cover"
      />
    ) : (
      <View style={[homeStyles.noImageContainerHorizontal, { backgroundColor: theme.colors.placeholder }]}>
        <Text style={homeStyles.noImageText}>Pôster não disponível</Text>
      </View>
    )}
    <Card.Content style={homeStyles.horizontalCardContent}>
      <Text variant="titleSmall" numberOfLines={2} style={homeStyles.horizontalCardTitle}>{item.title}</Text>
      <Text variant="bodySmall" style={homeStyles.horizontalCardSubtitle}>{item.year}</Text>
    </Card.Content>
  </Card>
);

const MainCarouselItem = ({ item, theme, navigation }) => (
  <ImageBackground
    source={{ uri: item.poster_path }}
    style={[homeStyles.mainCarouselBackground, { width: width }]}
    resizeMode="cover" 
  >
    <View style={homeStyles.mainCarouselOverlay}>
      <Text variant="headlineMedium" numberOfLines={2} style={[homeStyles.mainCarouselTitle, { color: theme.colors.buttonText }]}>
        {item.title}
      </Text>
      <Text variant="bodyMedium" numberOfLines={2} style={[homeStyles.mainCarouselSubtitle, { color: theme.colors.buttonText }]}>
        {item.description || 'Uma história imperdível.'}
      </Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Explorar', { screen: 'DetalhesExplorar', params: { item } })}
        icon="play"
        style={[homeStyles.mainCarouselButton, { backgroundColor: theme.colors.primary }]}
        labelStyle={{ color: theme.colors.buttonText, fontWeight: 'bold' }}
      >
        Ver Detalhes
      </Button>
    </View>
  </ImageBackground>
);


const HomeScreen = ({ navigation }) => {
  const [myMoviesAndSeries, setMyMoviesAndSeries] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [errorPopular, setErrorPopular] = useState(null);

  const [mainCarouselMovies, setMainCarouselMovies] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);

  const flatListRef = useRef(null);

  const [showDialog, setShowDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const theme = useTheme();

  const loadMyData = async () => {
    const data = await getMoviesAndSeries();
    setMyMoviesAndSeries(data.sort((a, b) => b.id - a.id));
  };

  const loadPopularData = useCallback(async () => {
    setLoadingPopular(true);
    setErrorPopular(null);
    try {
      const data = await getPopularMovies();
      setMainCarouselMovies(data.slice(0, 5));
      setPopularMovies(data.slice(5));
    } catch (err) {
      setErrorPopular('Não foi possível carregar filmes populares.');
      console.error('Erro ao carregar filmes populares na HomeScreen:', err);
    } finally {
      setLoadingPopular(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadMyData();
      loadPopularData();
      return () => {};
    }, [loadPopularData])
  );

  const confirmDelete = (item) => {
    setItemToDelete(item);
    setShowDialog(true);
  };

  const handleDelete = async () => {
    if (itemToDelete) {
      const success = await deleteMovieOrSerie(itemToDelete.id);
      if (success) {
        loadMyData();
      } else {
        console.log('Erro ao deletar o item.');
      }
      setShowDialog(false);
      setItemToDelete(null);
    }
  };

  const onViewRef = useRef((info) => {
    if (info.viewableItems.length > 0) {
      setActiveSlide(info.viewableItems[0].index || 0);
    }
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <View style={[homeStyles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.primary, elevation: 2 }}>
        <Appbar.Content title="CineTrack" titleStyle={{ fontSize: 24, color: theme.colors.buttonText }} />
        <Appbar.Action icon="plus" color={theme.colors.buttonText} onPress={() => navigation.navigate('Cadastrar', { isEditing: false })} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={homeStyles.scrollViewContent}>
        {loadingPopular ? (
          <View style={[homeStyles.mainCarouselContainer, homeStyles.horizontalListLoading]}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        ) : errorPopular ? (
          <View style={[homeStyles.mainCarouselContainer, homeStyles.emptySectionContainer]}>
            <Text variant="bodyMedium" style={{ color: theme.colors.error }}>{errorPopular}</Text>
            <Button onPress={loadPopularData} mode="text" labelStyle={{ color: theme.colors.primary }}>
              Tentar Novamente
            </Button>
          </View>
        ) : (
          <View style={homeStyles.mainCarouselWrapper}>
            <FlatList
              ref={flatListRef}
              data={mainCarouselMovies}
              keyExtractor={(item) => item.id + '-main-carousel'}
              renderItem={({ item }) => (
                <MainCarouselItem item={item} theme={theme} navigation={navigation} />
              )}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onViewableItemsChanged={onViewRef.current}
              viewabilityConfig={viewConfigRef.current}
              contentContainerStyle={homeStyles.mainCarouselContent}
            />
            
            <View style={homeStyles.paginationDotsContainer}>
              {mainCarouselMovies.map((_, index) => (
                <View
                  key={index}
                  style={[
                    homeStyles.paginationDot,
                    { backgroundColor: index === activeSlide ? theme.colors.primary : theme.colors.placeholder },
                  ]}
                />
              ))}
            </View>
          </View>
        )}

        <View style={homeStyles.section}>
          <View style={homeStyles.sectionHeader}>
            <Text variant="titleLarge" style={[homeStyles.sectionTitle, { color: theme.colors.text }]}>
              Minha Lista
            </Text>
            <Button
              mode="text"
              onPress={() => navigation.navigate('Favoritos')}
              labelStyle={{ color: theme.colors.primary, fontSize: 14 }}
            >
              Ver Tudo
            </Button>
          </View>
          {myMoviesAndSeries.length === 0 ? (
            <View style={homeStyles.emptySectionContainer}>
              <Text variant="bodyMedium" style={{ color: theme.colors.text }}>Sua lista está vazia.</Text>
              <Text variant="bodySmall" style={{ color: theme.colors.text }}>Adicione um item no Cadastro ou explore.</Text>
            </View>
          ) : (
            <FlatList
              data={myMoviesAndSeries}
              keyExtractor={(item) => item.id + '-my-list'}
              renderItem={({ item }) => (
                <MovieCardHorizontal item={item} theme={theme} navigation={navigation} detailsScreenName="Detalhes" />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={homeStyles.horizontalListContent}
            />
          )}
        </View>
        {popularMovies.length > 0 && (
          <View style={homeStyles.section}>
            <View style={homeStyles.sectionHeader}>
              <Text variant="titleLarge" style={[homeStyles.sectionTitle, { color: theme.colors.text }]}>
                Mais Populares
              </Text>
              <Button
                mode="text"
                onPress={() => navigation.navigate('Explorar', { screen: 'Populares' })}
                labelStyle={{ color: theme.colors.primary, fontSize: 14 }}
              >
                Ver Tudo
              </Button>
            </View>
            <FlatList
              data={popularMovies}
              keyExtractor={(item) => item.id + '-more-popular'}
              renderItem={({ item }) => (
                <MovieCardHorizontal item={item} theme={theme} navigation={navigation} detailsScreenName="DetalhesExplorar" />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={homeStyles.horizontalListContent}
            />
          </View>
        )}

      </ScrollView>

      <Portal>
        <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)} style={{ borderRadius: theme.roundness }}>
          <Dialog.Title style={{ color: theme.colors.text }}>Confirmar Exclusão</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium" style={{ color: theme.colors.text }}>
              Tem certeza que deseja excluir "{itemToDelete?.title}"?
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

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  mainCarouselWrapper: {
    height: MAIN_CAROUSEL_HEIGHT,
    marginBottom: 20,
    elevation: 5,
  },
  mainCarouselContent: {

  },
  mainCarouselBackground: {
    height: MAIN_CAROUSEL_HEIGHT,
    justifyContent: 'flex-end',
  },
  mainCarouselOverlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
    paddingBottom: 30,
  },
  mainCarouselTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  mainCarouselSubtitle: {
    marginBottom: 15,
  },
  mainCarouselButton: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  paginationDotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },

  section: {
    marginTop: 15,
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  horizontalListContent: {
    paddingHorizontal: 8,
  },
  horizontalCard: {
    width: HORIZONTAL_ITEM_WIDTH,
    marginHorizontal: 8,
    borderRadius: 12,
    elevation: 3,
    overflow: 'hidden',
  },
  horizontalCardCover: {
    height: HORIZONTAL_ITEM_WIDTH * 1.5,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  noImageContainerHorizontal: {
    height: HORIZONTAL_ITEM_WIDTH * 1.5,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
    padding: 5,
  },
  horizontalCardContent: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  horizontalCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  horizontalCardSubtitle: {
    fontSize: 11,
    color: '#666',
  },
  emptySectionContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  horizontalListLoading: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: MAIN_CAROUSEL_HEIGHT,
  },
});

export default HomeScreen;
