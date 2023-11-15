import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Logo from '../Logo/Logo';
import { firebase } from '../../firebase/config';

export default function Cadastro({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleCadastro = async () => {
    try {
      if (username && password && email) {
       
        await firebase.auth().createUserWithEmailAndPassword(email, password);

      
        const user = firebase.auth().currentUser;
        await user.updateProfile({
          displayName: username,
        });

        alert('Cadastro realizado com sucesso!');
        navigation.navigate('Inicio');
      } else {
        alert('Por favor, preencha o email, nome de usuário e senha.');
      }
    } catch (error) {
      alert('Erro ao cadastrar usuário: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <Text>Cadastre-se</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: 'black' }]}
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
    backgroundColor: '#EBC725',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
});
