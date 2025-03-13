import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function DetalhesProcedimento() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Procedimento</Text>
      <Text>Informações sobre o procedimento escolhido:</Text>
      <img src={"procurando-procedimento.png"} alt='imagem' style={{height:280, width:280}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAEBD7'
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default DetalhesProcedimento;