import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ToastAndroid } from 'react-native';
import axios from 'axios';

const apiWeb = axios.create({
  baseURL: "https://tdsr-d6c6c-default-rtdb.firebaseio.com/"
});
const CONSULTAS_RESOURCE = "/consultas.json";

function AgendamentoConsulta({ navigation }) {
  const [dataConsulta, setDataConsulta] = useState('');
  const [tipo, setTipo] = useState('');
  const [nomeMedico, setNomeMedico] = useState('');

  const agendarConsulta = async () => {
    if (dataConsulta && tipo && nomeMedico) {
      try {
        await apiWeb.post(CONSULTAS_RESOURCE, {
          data: dataConsulta,
          tipo: tipo,
          nomeMedico : nomeMedico,
        });
        ToastAndroid.show('Consulta agendada com sucesso!', ToastAndroid.LONG);
        navigation.navigate('Consultas');
      } catch (error) {
        ToastAndroid.show('Erro ao agendar consulta!', ToastAndroid.LONG);
      }
    } else {
      ToastAndroid.show('Preencha todos os campos!', ToastAndroid.LONG);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendamento de consultas</Text>
      <Text style={styles.subTitle}>Data Consulta:</Text>
      <TextInput
        style={styles.input}
        placeholder="Data da consulta..."
        value={dataConsulta}
        onChangeText={setDataConsulta}/>

      <Text style={styles.subTitle}>Tipo Consulta</Text>
      <TextInput
        style={styles.input}
        placeholder="Tipo da consulta..."
        value={tipo}
        onChangeText={setTipo}/>
        
      <Text style={styles.subTitle}>Nome Médico</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do médico..."
        value={nomeMedico}
        onChangeText={setNomeMedico}/>

      <Pressable style={styles.button} onPress={agendarConsulta}>
        <Text style={styles.buttonText}>Agendar consulta</Text>
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
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20
  },
  subTitle: {
    marginRight: 135,
    fontSize: 15,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
  },
  button: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 4,
    backgroundColor: '#000000',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }
});

export default AgendamentoConsulta;