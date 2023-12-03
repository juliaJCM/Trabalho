import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function Logo() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Centraliza horizontalmente
  },
  logo: {
    width: 300,
   marginTop: -120, // Set margin top to 0
    marginBottom: -90, // Set padding top to 0
    resizeMode: 'contain',
  },
});