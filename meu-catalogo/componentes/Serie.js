import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Serie = ({ nome, ano, diretor, temporadas, capa }) => {
return (
<View style={styles.container}>
<Image source={{ uri: capa }} style={styles.imagem} />
<Text style={styles.titulo}>{nome} ({ano})</Text>
<Text>Diretor: {diretor}</Text>
<Text>Temporadas: {temporadas}</Text>
</View>
);
};

const styles = StyleSheet.create({
container: {
margin: 10,
padding: 10,
borderWidth: 1,
borderRadius: 5,
borderColor: '#ddd',
backgroundColor: '#fff',
alignItems: 'center',
},
imagem: {
width: 100,
height: 150,
marginBottom: 10,
},
titulo: {
fontSize: 16,
fontWeight: 'bold',
}
});

export default Serie;