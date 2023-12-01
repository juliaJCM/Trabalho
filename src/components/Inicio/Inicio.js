import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Logo from '../Logo/Logo';
import { firebase } from '../../firebase/config';

export default function Inicio({ navigation }) {
  const username = 'ana123';
  const password = 'ana123';

  const handleLogin = async () => {
    try {
        navigation.navigate('Tabs');

      // if (username && password) {
      //   // await firebase.auth().signInWithEmailAndPassword(username, password);
      
      // } else {
      //   alert('Por favor, preencha o nome de usuário e senha.');
      // }

    } catch (error) {
      alert('Erro ao fazer login: ' + error.message);
    }
  };

  const handleCadastro = () => {
    navigation.navigate('Cadastro');
  };

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.title}>Seja Bem-Vindo</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário ou Email"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: 'purple' }]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.text}>Não tem uma conta?</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: 'purple' }]}
        onPress={handleCadastro}
      >
        <Text style={styles.buttonText}>Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
     backgroundColor: '#210054',
    color: 'white'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: 'white'
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginVertical: 10,
    color: 'white'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  
  },
  text: {
    marginTop: 100,
    color: 'white'
  },
  title:{
    fontSize: 18,
     fontWeight: 'bold',
     color: 'white'
  }
});
