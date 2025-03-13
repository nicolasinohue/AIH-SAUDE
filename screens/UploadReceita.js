import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ToastAndroid } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

function UploadReceita() {
  const [file, setFile] = useState(null);
  const [descricao, setDescricao] = useState('');

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      setFile(result);
    }
  };

  const handleUpload = () => {
    if (file) {
      ToastAndroid.show('Sucesso no upload do arquivo:', file.name, ToastAndroid.LONG);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload de Receita(s)</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        placeholder="Insira a descrição aqui..."
        value={descricao}
        onChangeText={setDescricao}
      />

      <Pressable style={styles.button} onPress={pickDocument}> <Text style={styles.buttonText}>Selecionar Arquivo(s)</Text> </Pressable>
      <Pressable style={styles.button} onPress={handleUpload}> <Text style={styles.buttonText}>Fazer Upload da Receita</Text> </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#cfe1e2'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 50,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
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

export default UploadReceita;
