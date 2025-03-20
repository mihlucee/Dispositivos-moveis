import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, ScrollView, Alert} from 'react-native';

export default function App() {
  // Exibir alerta
  const exibirAlerta = () => {
    Alert.alert("Gol do Raphael Veiga!");
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <StatusBar style="auto" />
  
  {/* Nome do Jogador */}
<Text style={styles.nome}>Raphael Veiga</Text>

{/* Informações do Jogador */}
<Text style={styles.info}>
Raphael Veiga é um meio-campista do Palmeiras, conhecido por sua
habilidade, finalização e qualidade nas cobranças de pênalti.
</Text>

{/* Imagens do Jogador */}
<Image
source={{ uri: "https://i.pinimg.com/736x/fa/7b/c7/fa7bc7b8274069286fb237634e3b0933.jpg" }}
style={styles.imagem}
/>
<Image
source={{ uri: "https://i.pinimg.com/474x/4f/c7/d1/4fc7d1c137a9c4a62ed00aa631a60bc9.jpg" }}
style={styles.imagem}
/>
<Image
source={{ uri: "https://i.pinimg.com/474x/99/79/68/997968eb01e8603ea1ad9e2aa5668f9f.jpg" }}
style={styles.imagem}
/>
<Image
source={{ uri: "https://i.pinimg.com/474x/43/be/2a/43be2ac10fc1d95002308916a9217773.jpg" }}
style={styles.imagem}
/>
<Image
source={{ uri: "https://i.pinimg.com/236x/51/81/57/5181579625125b1fdf38e73d62afbf25.jpg" }}
style={styles.imagem}
/>


<Button title="GOL!" onPress={exibirAlerta} />
    </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: "#96f3a9",
  padding: 20,
  paddingTop: 60,
  },
  nome: {
  fontSize: 28,
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: 10,
  },
  info: {
  fontSize: 18,
  textAlign: "center",
  marginBottom: 20,
  },
  imagem: {
  width: "100%",
  height: 400,
  resizeMode: "cover",
  marginBottom: 15,
  borderRadius: 20,
  },
  });
