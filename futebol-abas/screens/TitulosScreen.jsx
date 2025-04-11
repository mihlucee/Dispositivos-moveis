import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

const titulos = [
{
    nome: "Campeonato Brasileiro",
    anos: [1960, 1967, 1969, 1972, 1973, 1993, 1994, 2016, 2018, 2022, 2023]
},

{
    nome: "Copa Libertadores da América",
    anos: [1999, 2020, 2021]
},

{
    nome: "Copa do Brasil",
    anos: [1998, 2012, 2015, 2020]
},

{
    nome: "Supercopa do Brasil",
    anos: [2023]
}
];

const TitulosScreen = () => {
    const renderItem = ({ item }) => (
    <View style={styles.card}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text>{item.anos.join(', ')}</Text>
    </View>

);

return (
<FlatList
data={titulos}
keyExtractor={(item, index) => index.toString()}
renderItem={renderItem}
contentContainerStyle={styles.container}
/>
);
};

const styles = StyleSheet.create({
    container: {
        padding: 10, backgroundColor: '#f0fff0'
},

card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2
},

nome: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5
}
});

export default TitulosScreen;