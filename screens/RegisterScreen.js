import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image, ToastAndroid } from 'react-native';
import axios from 'axios';

const apiWeb = axios.create({
  baseURL: "https://tdsr-d6c6c-default-rtdb.firebaseio.com/"
});
const LOGIN_RESOURCE = "/dados_login.json";

function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    if (!validatePassword(password)) {
      alert("A senha deve ter pelo menos 8 caracteres e incluir pelo menos um caractere especial.");
      return;
    }

    try {
      const response = await apiWeb.get(LOGIN_RESOURCE);
      const existingUsers = response.data;

      const emailExists = Object.values(existingUsers).some(user => user.email === email);

      if (emailExists) {
        alert("Este e-mail já está registrado. Tente um diferente.");
        return;
      }

      const registerResponse = await apiWeb.post(LOGIN_RESOURCE, { email, password });
      if (registerResponse.status === 200) {
        alert("Sucesso", "Registro realizado com sucesso!");
        navigation.navigate('Login');
      } else {
        alert("Erro ao registrar. Tente novamente.");
      }
    } catch (error) {
      alert("Erro ao registrar: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{uri:"login-register.png"}} style={{height:180, width:180}}/>
      <Text style={styles.title}>Registro AIH Saúde</Text>
      <Text style={styles.subtitle}>Registre-se para continuar...</Text>

      <Text style={styles.campoTitle}>Campo E-Mail:</Text>
      <TextInput
        style={styles.input}
        autoFocus={true}
        placeholder="Digite o e-mail..."
        value={email}
        onChangeText={setEmail}/>

      <Text style={styles.campoTitle}>Campo Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a senha..."
        secureTextEntry
        maxLength={20}
        value={password}
        onChangeText={setPassword}/>

      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Enviar registro ao sistema</Text>
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
    fontWeight: 'bold',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 20
  },
  campoTitle: {
    marginTop:5,
    marginRight:130,
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
  button:{
    marginTop:10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 4,
    backgroundColor: 'black',
  },
  button2:{
    marginTop:150,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 20,
    backgroundColor: '#2F4F4F',
  },
  buttonText:{
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonText2:{
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  }
});

export default RegisterScreen;