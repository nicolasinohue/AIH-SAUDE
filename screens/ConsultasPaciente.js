import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';

const apiWeb = axios.create({
  baseURL: "https://tdsr-d6c6c-default-rtdb.firebaseio.com/"
});
const CONSULTAS_RESOURCE = "/consultas.json";

function ConsultasPaciente({ navigation }) {
  const [consultas, setConsultas] = useState([]);

  const onLerDados = async () => {
    try {
      const response = await apiWeb.get(CONSULTAS_RESOURCE);
      const data = response.data ? Object.keys(response.data).map(key => ({ id: key, ...response.data[key] })) : [];
      setConsultas(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onExcluirConsulta = async (id) => {
    try {
      await apiWeb.delete(`/consultas/${id}.json`);
      onLerDados(); // Atualiza a lista após a exclusão
      alert('Sucesso', 'Consulta excluída com sucesso.');
    } catch (error) {
      console.error(error);
      alert('Erro', 'Erro ao excluir a consulta.');
    }
  };

  const onEditarConsulta = (consulta) => {
    navigation.navigate('Editar Consulta', { consulta });
  };

  useEffect(() => {
    onLerDados();
  }, []);

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onLerDados}>
        <Text style={styles.buttonText}>Atualizar Consultas</Text>
      </Pressable>
      <Text style={styles.title}>Minhas Consultas:</Text>
      <FlatList
        data={consultas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.consultaItem}>
            <Text>Data: {item.data}</Text>
            <Text>Tipo: {item.tipo}</Text>
            <Text>Médico(a): {item.nomeMedico}</Text>
            <View style={styles.icons}>
              <Entypo 
                name="edit" 
                size={20} 
                color="blue" 
                onPress={() => onEditarConsulta(item)} 
              />
              <Entypo 
                name="trash" 
                size={20} 
                color="red" 
                onPress={() => onExcluirConsulta(item.id)} 
              />
            </View>
          </View>
        )}
      />
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  consultaItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'left',
  },
  icons: {
    marginTop: 5,
    flexDirection: 'row',
    width: 60,
    justifyContent: 'space-between',
  },
  button: {
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 4,
    backgroundColor: '#000000',
    borderColor: '#DEB887',
    borderWidth: 2
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }
});

export default ConsultasPaciente;