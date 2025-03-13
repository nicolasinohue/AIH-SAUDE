import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, Image } from 'react-native';
import axios from 'axios';

const apiWeb = axios.create({
  baseURL: "https://tdsr-d6c6c-default-rtdb.firebaseio.com/"
});

function EditarConsulta({ route, navigation }) {
  const { consulta } = route.params;
  const [dataConsulta, setDataConsulta] = useState(consulta.data);
  const [tipo, setTipo] = useState(consulta.tipo);
  const [nomeMedico, setNomeMedico] = useState(consulta.nomeMedico);

  const onSalvarEdicao = async () => {
    try {
      await apiWeb.put(`/consultas/${consulta.id}.json`, {
        data: dataConsulta,
        tipo: tipo,
        nomeMedico: nomeMedico
      });
      Alert.alert('Sucesso', 'Consulta editada com sucesso.');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao editar a consulta.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Consulta</Text>
      <TextInput
        style={styles.input}
        placeholder="Data da consulta..."
        value={dataConsulta}
        onChangeText={setDataConsulta}
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo da consulta..."
        value={tipo}
        onChangeText={setTipo}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome do médico..."
        value={nomeMedico}
        onChangeText={setNomeMedico}
      />
      <Pressable style={styles.button} onPress={onSalvarEdicao}>
        <Text style={styles.buttonText}>Salvar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FAEBD7',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    width: '100%',
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

export default EditarConsulta;