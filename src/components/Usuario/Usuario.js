import React from 'react';
import { View, Text, Image } from 'react-native';

export default function Usuario() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={require('assets/usuario.png')}
        style={{ width: 50, height: 50 }}
      />
      <Text>Conta do usuário!</Text>
    </View>
  );
}