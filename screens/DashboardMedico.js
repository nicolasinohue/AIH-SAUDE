import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';

function DashboardMedico({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={{uri:"doctors-dashboard.png"}} style={{height:250, width:250}}/>
      <Text style={styles.title}>Dashboard do Médico</Text>

      <Pressable style={styles.button} onPress={() => navigation.navigate('Consultas Medico')}>
      <Text style={styles.buttonText}>Visualizar suas Consultas</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => navigation.navigate('Upload Receita')}>
        <Text style={styles.buttonText}>Upload de Receita</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cfe1e2'
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  button:{
    marginTop:10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 4,
    backgroundColor: 'black',
  },
  buttonText:{
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default DashboardMedico;
