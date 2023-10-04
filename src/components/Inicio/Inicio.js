import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import Logo from '../Logo/Logo';

export default function Inicio() {
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [expenses, setExpenses] = useState([]);

  const handleAddValor = () => {
    if (valor.trim() !== '' && descricao.trim() !== '') {
      const newExpense = {
        valor,
        descricao,
      };
      setExpenses([...expenses, newExpense]);
      setValor('');
      setDescricao('');
    }
  };

  return (
    <View style={styles.container}>
      <Logo></Logo>
      <Text style={styles.title}>Adicione sua despesa!</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o valor"
        keyboardType="numeric"
        value={valor}
        onChangeText={(text) => setValor(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite a descrição"
        value={descricao}
        onChangeText={(text) => setDescricao(text)}
      />
      <Button
        title="Adicione"
        onPress={handleAddValor}
        color="black"
        style={styles.button}
      />
      {expenses.length > 0 && (
        <FlatList
          data={expenses}
          renderItem={({ item }) => (
            <View style={styles.expenseContainer}>
              <Text style={styles.expenseText}>
                Valor: {item.valor}
              </Text>
              <Text style={styles.expenseText}>
                Descrição: {item.descricao}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
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
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 5,
  },
  expenseContainer: {
    marginVertical: 10,
  },
  expenseText: {
    fontSize: 16,
  },
  button: {
    borderRadius: 10, 
  },
});