import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Logo from '../Logo/Logo';

import Button from '../button';


export default function Inicio({ navigation }) {
  const username = 'ana123';
  const password = 'ana123';

  const handleLogin = async () => {
    try {
      navigation.navigate('Tabs');
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

      <View style={styles.btns}>
        <Button onPress={handleLogin} buttonText="Login" />
        <Button onPress={handleCadastro} buttonText="Cadastre-se" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#210054',
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: 'white',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20, // Adicionando margem abaixo do título
  },
  btns: {
    
    width: '80%',
  
  },
});
