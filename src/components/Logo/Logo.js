import React from 'react';
import { View, Text, Image } from 'react-native';

export default function Logo() {
  return (
    <View>
       <Image
        source={require('assets/logo.png')}
        style={{ width: 50, height: 50 }}
      />
    </View>
  );
}