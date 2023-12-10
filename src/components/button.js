import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Button ({ onPress, buttonText })  {
  return (
     <TouchableOpacity style={{ ...styles.buttonContainer }} onPress={onPress}>
  <Text style={styles.buttonText}>{buttonText}</Text>
</TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 10,
    flexDirection: 'row',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#6052b7',
  },
  buttonText: {
    flex: 12,
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
});


