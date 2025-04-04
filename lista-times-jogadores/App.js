import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-native-paper';
import { FlatList, View, StyleSheet } from 'react-native';
import Time from './Componentes/Time';

const times = [
  {
    nome: "Palmeiras",
    anoFundacao: 1914,
    mascote: "Porco",
    imagem: "https://www.palmeiras.com.br/wp-content/uploads/2019/08/bandeira.jpg",
    jogadores: [
      { nome: "Dudu", numero: 7, imagem: "https://i.pinimg.com/474x/72/96/9b/72969b2d84fb0ab80f31b571267f142f.jpg" },
      { nome: "Rony", numero: 10, imagem: "https://i.pinimg.com/236x/c9/3d/82/c93d82c6592ece32d02c4b7b8d10806f.jpg" },
      { nome: "Gustavo Gómez", numero: 15, imagem: "https://i.pinimg.com/474x/6f/c6/55/6fc655734d82e5dfe73d6a6364a2e5c9.jpg" },
      { nome: "Weverton", numero: 1, imagem: "https://i.pinimg.com/474x/98/15/b2/9815b2742d1d3f1733e8bf556f8132f1.jpg" },
      { nome: "Raphael Veiga", numero: 23, imagem: "https://i.pinimg.com/474x/94/6a/d6/946ad6271c4771121792f110591c9ff7.jpg" },
    ],
  },
  {
    nome: "Flamengo",
    anoFundacao: 1895,
    mascote: "Urubu",
    imagem: "https://img.nsctotal.com.br/wp-content/uploads/2023/04/Flamengo-944x531.png",
    jogadores: [
      { nome: "Gabriel Barbosa", numero: 9, imagem: "https://i.pinimg.com/474x/1d/9f/5d/1d9f5de58831c9913f925a7155bdc7da.jpg" },
      { nome: "Arrascaeta", numero: 14, imagem: "https://i.pinimg.com/474x/cf/ad/d9/cfadd92de5e581ac5505e3d325f8b9b2.jpg" },
      { nome: "Everton Ribeiro", numero: 7, imagem: "https://i.pinimg.com/236x/39/1a/27/391a275fb7e0b018f2900f0f9fc9331b.jpg" },
      { nome: "David Luiz", numero: 23, imagem: "https://i.pinimg.com/474x/98/79/9b/98799b86107a87b79dc9b15cf778fa4a.jpg" },
      { nome: "Pedro", numero: 21, imagem: "https://i.pinimg.com/474x/79/e6/18/79e6185649fa3667b3ed3beef3e1ae94.jpg" },
    ],
  },
  
  {
    nome: "Corinthians",
    anoFundacao: 1910,
    mascote: "Mosqueteiro",
    imagem: "https://cdn.meutimao.com.br/_upload/forumtopico/2022/05/26/escudo_2.jpg",
    jogadores: [
      { nome: "Cássio", numero: 12, imagem: "https://i.pinimg.com/474x/49/8b/3a/498b3ac42d968a8c922768cb0d60aeed.jpg" },
      { nome: "Fagner", numero: 23, imagem: "https://i.pinimg.com/236x/27/07/c4/2707c483af98483a99778aa0fa771384.jpg" },
      { nome: "Renato Augusto", numero: 8, imagem: "https://i.pinimg.com/236x/bb/3e/82/bb3e820b7e132499c288e150e18cc642.jpg" },
      { nome: "Yuri Alberto", numero: 9, imagem: "https://i.pinimg.com/474x/7d/bd/e0/7dbde00eb2ef3c90d0b04265d36e948b.jpg" },
      { nome: "Róger Guedes", numero: 10, imagem: "https://i.pinimg.com/236x/be/1e/98/be1e98923926d8078594c5e8856f3f7f.jpg" },
    ],
  },
  {
    nome: "Atlético Mineiro",
    anoFundacao: 1908,
    mascote: "Galo",
    imagem: "https://pbs.twimg.com/media/EJDYU8TWwAA-d29.jpg",
    jogadores: [
      { nome: "Hulk", numero: 7, imagem: "https://i.pinimg.com/474x/ff/9b/38/ff9b384ca6fd51ce56afbdfe14e5b67d.jpg" },
      { nome: "Nacho Fernández", numero: 26, imagem: "https://i.pinimg.com/474x/63/fa/af/63faaf414f6278f7187f73bad233ccf2.jpg" },
      { nome: "Everson", numero: 22, imagem: "https://i.pinimg.com/236x/2d/2f/f8/2d2ff8cad95ac498721d23269ba9540c.jpg" },
      { nome: "Keno", numero: 11, imagem: "https://i.pinimg.com/236x/6b/1c/c2/6b1cc2d9050291b69b7e6b3be1341a8a.jpg" },
      { nome: "Jair", numero: 8, imagem: "https://i.pinimg.com/236x/f8/55/29/f8552940089ced07181f7cbff4d6b7f7.jpg" },
    ],
  },
];

export default function App() {
  return (
    <Provider>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <FlatList
          data={times}
          renderItem={({ item }) => <Time time={item} />}
          keyExtractor={(item) => item.nome}
        />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
  },
});
