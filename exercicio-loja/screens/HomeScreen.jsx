import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategorias() {
      try {
        setLoading(true);
        const response = await axios.get('https://dummyjson.com/products/category-list');
        setCategorias(response.data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategorias();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ListaProdutos', { categoria: item })}
    >
      <Card style={styles.card} elevation={3}>
        <Card.Content>
          <Title style={styles.title}>{item.toUpperCase()}</Title>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={categorias}
      keyExtractor={(item, index) => String(index)}
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
    backgroundColor: '#1976d2',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

