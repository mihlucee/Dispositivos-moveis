import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';

export default function ListaProdutosScreen({ navigation, route }) {
  const { categoria } = route.params;
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({ title: `Categoria: ${categoria}` }); // título dinâmico

    async function fetchProdutos() {
      try {
        setLoading(true);
        const response = await axios.get(`https://dummyjson.com/products/category/${categoria}`);
        setProdutos(response.data.products);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProdutos();
  }, [categoria, navigation]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Produto', { idProduto: item.id })}
    >
      <Card style={styles.card} elevation={3}>
        <Card.Cover source={{ uri: item.thumbnail }} />
        <Card.Content>
          <Title>{item.title}</Title>
          <Paragraph numberOfLines={2} ellipsizeMode="tail">
            {item.description}
          </Paragraph>
          <Paragraph style={styles.price}>R$ {item.price}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={produtos}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingBottom: 30,
  },
  card: {
    marginBottom: 12,
  },
  price: {
    marginTop: 6,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2e7d32',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

