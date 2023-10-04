import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import Logo from '../Logo/Logo';
import moment from 'moment';
import 'moment/locale/pt-br';
import Despesa from '../Despesa/Despesa';

export default function AdicionaDespesa() {
  moment.locale('pt-br');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [expensesByMonth, setExpensesByMonth] = useState({});

  const handleAddValor = () => {
    if (valor.trim() !== '' && descricao.trim() !== '') {
      const newExpense = {
        valor,
        descricao,
        data: moment().format('DD/MM/YYYY'),
      };

      const monthKey = moment().format('MMMM YYYY');
      const updatedExpensesByMonth = { ...expensesByMonth };

      if (!updatedExpensesByMonth[monthKey]) {
        updatedExpensesByMonth[monthKey] = [];
      }

      updatedExpensesByMonth[monthKey].push(newExpense);

      setExpensesByMonth(updatedExpensesByMonth);
      setValor('');
      setDescricao('');
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
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

      {Object.keys(expensesByMonth).map((month) => (
        <View key={month}>
          <Text style={styles.monthTitle}>{month}</Text>
          <FlatList
            data={expensesByMonth[month]}
            renderItem={({ item }) => (
              <Despesa expense={item} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      ))}
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
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  button: {
    borderRadius: 10,
  },
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
  },
  cardWide: {
    width: 300,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
});