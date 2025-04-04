// components/Jogador.jsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Jogador = ({ jogador }) => {
  return (
    <View style={styles.jogadorContainer}>
      <Image source={{ uri: jogador.imagem }} style={styles.jogadorImage} />
      <Text style={styles.jogadorNome}>{jogador.nome}</Text>
      <Text style={styles.jogadorNumero}> Número: {jogador.numero}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  jogadorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
  },
  jogadorImage: {
    width: 60,
    height: 60,
    borderRadius: 25,
    marginRight: 10,
  },
  jogadorNome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  jogadorNumero: {
    fontSize: 16,
    color: '#555',
  },
});

export default Jogador;
