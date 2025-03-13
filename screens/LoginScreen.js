import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image, ToastAndroid } from 'react-native';
import axios from 'axios';

const apiWeb = axios.create({
  baseURL: "https://tdsr-d6c6c-default-rtdb.firebaseio.com/"
});
const LOGIN_RESOURCE = "/dados_login.json";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('paciente'); // 'paciente' ou 'medico'

  const handleLogin = async () => {
    try {
      const response = await apiWeb.get(LOGIN_RESOURCE);
      const users = response.data;
      const user = Object.values(users).find(user => user.email === email && user.password === password);

      if (user) {
        alert("Login realizado com sucesso!");
        navigation.navigate(userType === 'paciente' ? 'Paciente' : 'Medico');
      } else {
        alert("E-mail ou senha incorretos.");
      }
    } catch (error) {
      alert("Erro ao realizar login: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{uri:"login-register.png"}} style={{height:150, width:150}}/>
      <Text style={styles.title}>Login AIH Saúde</Text>
      <Text style={styles.campoTitle}>Campo E-Mail:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o e-mail..."
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.campoTitle}>Campo Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a senha..."
        secureTextEntry
        maxLength={20}
        value={password}
        onChangeText={setPassword}
      />

      <Pressable onPress={() => navigation.navigate('EsqueciSenha')}>
        <Text style={{fontSize:15, fontWeight:'bold'}}>Esqueci a Senha...</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Pressable style={styles.button2} onPress={() => navigation.navigate('Registro')}>
        <Text style={styles.buttonText}>Registre-se</Text>
      </Pressable>

      <Pressable style={styles.button2} onPress={() => setUserType(userType === 'paciente' ? 'medico' : 'paciente')}>
        <Text style={styles.buttonText}>{`Trocar perfil para: ${userType === 'paciente' ? 'medico' : 'paciente'}`}</Text>
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
    paddingVertical: 8,
    paddingHorizontal: 50,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  button2:{
    marginTop:10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 4,
    backgroundColor: '#2F4F4F',
  },
  buttonText:{
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default LoginScreen;