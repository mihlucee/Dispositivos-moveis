import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, ActivityIndicator, Button } from 'react-native-paper';
import axios from 'axios';

export default function ProdutoScreen({ route, navigation }) {
  const { idProduto } = route.params;
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduto() {
      try {
        setLoading(true);
        const response = await axios.get(`https://dummyjson.com/products/${idProduto}`);
        setProduto(response.data);
        navigation.setOptions({ title: response.data.title });
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduto();
  }, [idProduto, navigation]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  if (!produto) {
    return (
      <View style={styles.loadingContainer}>
        <Paragraph>Produto não encontrado.</Paragraph>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card>
        <Card.Cover source={{ uri: produto.images[0] }} />
        <Card.Content>
          <Title>{produto.title}</Title>
          <Paragraph style={styles.description}>{produto.description}</Paragraph>
          <Paragraph style={styles.price}>Preço: R$ {produto.price}</Paragraph>
          <Paragraph>Categoria: {produto.category}</Paragraph>
          <Paragraph>Marca: {produto.brand}</Paragraph>
          <Paragraph>Avaliação: {produto.rating}</Paragraph>
          <Paragraph>Estoque: {produto.stock}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => alert('Produto adicionado ao carrinho!')}>
            Comprar
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingBottom: 30,
  },
  description: {
    marginTop: 8,
  },
  price: {
    marginTop: 12,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#2e7d32',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

