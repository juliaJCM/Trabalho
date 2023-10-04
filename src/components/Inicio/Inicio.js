import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Logo from '../Logo/Logo';
export default function Inicio({ navigation }) {
  return (
    <View style={styles.container}>
    <Logo></Logo>
      <Text>Seja Bem-Vindo</Text>
      <Button
        title="Comece Aqui"
        onPress={() => navigation.navigate('Tabs')}
        style={styles.button}
        color="black"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD700',
  },
  button: {
  borderRadius: 40,
  
  },
})