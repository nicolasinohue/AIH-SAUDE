import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image, ToastAndroid } from 'react-native';
import axios from 'axios';

const apiWeb = axios.create({
  baseURL: "https://tdsr-d6c6c-default-rtdb.firebaseio.com/"
});
const LOGIN_RESOURCE = "/dados_login.json";

function EsqueciSenha({ navigation }) {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userId, setUserId] = useState(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleFindUser = async () => {
    if (!validateEmail(email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    try {
      const response = await apiWeb.get(LOGIN_RESOURCE);
      const users = response.data;

      if (!users) {
        alert("Nenhum usuário encontrado.");
        return;
      }

      const userEntry = Object.entries(users).find(([key, user]) => user.email === email);

      if (userEntry) {
        setUserId(userEntry[0]);
        alert("Usuário encontrado. Insira a nova senha.");
      } else {
        alert("E-mail não encontrado.");
      }
    } catch (error) {
      alert("Erro ao buscar usuário: " + error.message);
    }
  };

  const handleChangePassword = async () => {
    if (!validatePassword(newPassword)) {
      alert("A senha deve ter pelo menos 8 caracteres e incluir pelo menos um caractere especial.");
      return;
    }

    if (userId) {
      try {
        await apiWeb.patch(`/dados_login/${userId}.json`, { password: newPassword });
        alert("Senha alterada com sucesso!");
        navigation.navigate('Login');
      } catch (error) {
        alert("Erro ao alterar senha: " + error.message);
      }
    } else {
      alert("Busque o usuário primeiro.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: "login-register.png" }} style={{ height: 150, width: 150 }} />
      <Text style={styles.title}>Esqueci a Senha</Text>
      <Text style={styles.subtitle}>Insira seu e-mail para alterar a senha</Text>

      <Text style={styles.campoTitle}>Campo E-Mail:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o e-mail..."
        value={email}
        onChangeText={setEmail}
      />

      <Pressable style={styles.button} onPress={handleFindUser}>
        <Text style={styles.buttonText}>Buscar Usuário</Text>
      </Pressable>

      {userId && (
        <>
          <Text style={styles.campoTitle}>Nova Senha:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a nova senha..."
            secureTextEntry
            maxLength={20}
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <Pressable style={styles.button} onPress={handleChangePassword}>
            <Text style={styles.buttonText}>Alterar Senha</Text>
          </Pressable>
        </>
      )}
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
    marginTop: 5,
    marginRight: 130,
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
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 4,
    backgroundColor: 'black',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  }
});

export default EsqueciSenha;