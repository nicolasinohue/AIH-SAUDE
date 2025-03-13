import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';

function DashboardPaciente({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={{uri:"dashboard-icon.png",}} style={{height:180, width:280, marginBottom:20}}/>
      <Text style={styles.title}>Dashboard do Paciente</Text>
      <Text style={styles.subTitle}>Selecione uma das opções:</Text>

      <Pressable style={styles.button} onPress={() => navigation.navigate('Detalhes Procedimento')}>
        <Text style={styles.buttonText}>Detalhes Procedimento</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => navigation.navigate('Agendamento')}>
        <Text style={styles.buttonText}>Agendar Consulta</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => navigation.navigate('Consultas')}>
        <Text style={styles.buttonText}>Minhas Consultas</Text>
      </Pressable>
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
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 15,
  },
  button:{
    marginTop:10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 4,
    backgroundColor: 'black',
  },
  buttonText:{
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }
});

export default DashboardPaciente;