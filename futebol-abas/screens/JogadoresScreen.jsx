import React from 'react';
import { View, FlatList, Image, Text, StyleSheet } from 'react-native';

const jogadores = [
{

    nome: "Joaquín Piquerez",
    numero: 22,
    imagem: "https://www.ogol.com.br/img/jogadores/new/29/32/452932_joaquin_piquerez__20240426200408.png"

},
{
    
    nome: "Raphael Veiga",
    numero: 23,
    imagem: "https://www.zerozero.pt/img/jogadores/new/06/15/470615_raphael_veiga_20240426201221.png"

},
{

    nome: "Weverton",
    numero: 21,
    imagem: "https://www.ogol.com.br/img/jogadores/new/36/64/53664_weverton_20240426195632.png"

},
{

    nome: "Gustavo Gómez",
    numero: 15,
    imagem: "https://www.ogol.com.br/img/jogadores/new/53/35/175335_gustavo_gomez_20240426200622.png"

},
{
    
    nome: "Estevão",
    numero: 41,
    imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcXrvSevTko6-9K5zhphSFuS4fWibAZGT8TA&s"
}
];

const JogadoresScreen = () => {
    const renderItem = ({ item }) => (
    <View style={styles.card}>
        <Image source={{ uri: item.imagem }} style={styles.image} />
        <Text style={styles.nome}>{item.nome}</Text>
        <Text>Número: {item.numero}</Text>
        
    </View>

);

return (
<FlatList
data={jogadores}
keyExtractor={(item, index) => index.toString()}
renderItem={renderItem}
contentContainerStyle={styles.container}
/>

);
};

const styles = StyleSheet.create({
    container: {
        padding: 10, backgroundColor: '#f5fff5'

},

card: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 2
},

image: {
    
    width: 100, height: 100, borderRadius: 50
},

nome: {
    fontWeight: 'bold', fontSize: 16, marginTop: 5

}
});

export default JogadoresScreen;