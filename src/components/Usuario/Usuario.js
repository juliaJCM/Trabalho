import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function Usuario() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/usuario.png')}
        style={{ width: 50, height: 50 }}
      />
      <Text>Conta do usuário!</Text>
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
});
