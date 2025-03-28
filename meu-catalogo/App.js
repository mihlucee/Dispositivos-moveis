import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Filme from './componentes/filme.js';
import Serie from './componentes/Serie.js';

const listaFilmes = [
{
nome: "Viva a vida é uma festa",
ano: 2018,
diretor: "Adrian Molina, Lee Unkrich",
tipo: "Animação",
capa: "https://br.web.img3.acsta.net/pictures/17/12/07/11/33/0502209.jpg"
},
{
nome: "Ilha do Medo",
ano: 2010,
diretor: "Martin Scorsese",
tipo: "Suspense",
capa: "https://s3.amazonaws.com/assets.caixabelasartes.com.br/wp-content/uploads/2016/03/ILHA-DO-MEDO.jpg"
}
];

const listaSeries = [
{
nome: "Supernatural",
ano: 2005,
diretor: "Eric Kripke",
temporadas: 15,
capa: "https://images.justwatch.com/poster/196617225/s718/sobrenatural.jpg"
},
{
nome: "Smallville: As Aventuras do Superboy",
ano: 2001,
diretor: "David Nutter",
temporadas: 10,
capa: "https://a-static.mlcdn.com.br/800x560/smallville-4a-temporada-completa-6-dvds-warner/oliststore/mgl1kcikd84dpli2/c52a557cbafdbdb9a0788872272b3a55.jpeg"
}
];

export default function App() {
return (
<ScrollView style={styles.container}>
<Text style={styles.titulo}> Catálogo de Filmes e Séries </Text>

<Text style={styles.subtitulo}> Filmes</Text>
{listaFilmes.map((filme, index) => (
<Filme key={index} {...filme} />
))}

<Text style={styles.subtitulo}> Séries</Text>
{listaSeries.map((serie, index) => (
<Serie key={index} {...serie} />
))}
</ScrollView>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#B0E0E6',
paddingTop: 75,
paddingHorizontal: 10
},
titulo: {
fontSize: 24,
fontWeight: 'bold',
textAlign: 'center',
marginBottom: 20
},
subtitulo: {
fontSize: 20,
fontWeight: 'bold',
textAlign: 'center',
marginTop: 15
}
});
