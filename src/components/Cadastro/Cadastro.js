import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Logo from '../Logo/Logo';
import { firebase } from '../../firebase/config';
import Button from '../button';

export default function Cadastro({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleCadastro = async () => {
  try {
    console.log('Tentando cadastrar usuário...');
    if (username && password && email) {
      console.log('Informações preenchidas. Criando usuário...');
      
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      
      const userId = userCredential.user.uid;
        await firebase.database().ref(`users/${userId}`).set({
          username: username,
          email: email,
        });

        const user = firebase.auth().currentUser;
        await user.updateProfile({
          displayName: username,
        });

      console.log('Cadastro realizado com sucesso!');
      alert('Cadastro realizado com sucesso!');
      navigation.navigate('Inicio');
    } else {
      console.log('Campos não preenchidos.');
      alert('Por favor, preencha o email, nome de usuário e senha.');
    }
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error.message);
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
        <View style={styles.btns}>
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
  btns: {
    
    width: '80%',
  
  },
});
