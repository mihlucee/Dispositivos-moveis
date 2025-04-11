import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const EscudoScreen = () => {
    const time = {
        nome: "Palmeiras",
        escudo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Palmeiras_logo.svg/800px-Palmeiras_logo.svg.png"

};


return (
<View style={styles.container}>
    <Text style={styles.nome}>{time.nome}</Text>
    <Image source={{ uri: time.escudo }} style={styles.image} />
    
</View>

);
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#e6f2e6'

},

    image: { 
        width: 200, 
        height: 200, 
        resizeMode: 'contain'

},


    nome: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#006437',
        marginBottom: 20
    }

});

export default EscudoScreen;