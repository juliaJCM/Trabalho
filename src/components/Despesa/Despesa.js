import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Despesa({ expense }) {
  return (
    <View style={[styles.card, styles.cardWide]}> 
      <Text style={styles.cardText}>Data: {expense.data} </Text>
      <Text style={styles.cardText}>Valor: R$ {expense.valor} </Text>
      <Text style={styles.cardText}>Descrição: {expense.descricao}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginTop: 20,
    alignItems: 'center',
  },
  cardWide: {
    width: 300, 
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
});