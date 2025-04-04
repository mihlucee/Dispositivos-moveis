// components/Time.jsx
import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import Jogador from './Jogador';

const Time = ({ time }) => {
  return (
    <View style={styles.timeContainer}>
      <Image source={{ uri: time.imagem }} style={styles.timeImage} />
      <Text style={styles.timeName}> {time.nome} </Text>
      <Text style={styles.timeMascote}> Mascote: {time.mascote}</Text>
      <Text style={styles.timeAnoFundacao}> Fundado em: {time.anoFundacao}</Text>
      <FlatList
        data={time.jogadores}
        renderItem={({ item }) => <Jogador jogador={item} />}
        keyExtractor={(item) => item.nome}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  timeContainer: {
    marginBottom: 20,
    padding: 19,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  timeImage: {
    width: '100%',
    height: 300,
    marginBottom: 25,
  },
  timeName: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  timeMascote: {
    fontSize: 16,
    marginBottom: 5,
  },
  timeAnoFundacao: {
    fontSize: 16,
    marginBottom: 15,
  },
});

export default Time;
