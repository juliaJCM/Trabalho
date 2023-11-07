import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Keyboard } from 'react-native';
import Logo from '../Logo/Logo';
import moment from 'moment';
import 'moment/locale/pt-br';
import Despesa from '../Despesa/Despesa';
import { firebase } from '../../firebase/config';

const todoRef = firebase.firestore().collection('todos');

//exlcuir despesa do banco de dados
export const deleteTodo = (todos) => {
    todoRef.doc(todos.id).delete()
  }

export default function GerenciarDespesas() {
  moment.locale('pt-br');
  const [todos, setTodos] = useState([]);
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [expensesByMonth, setExpensesByMonth] = useState({});

  //buscar ou ler os dados do banco
  useEffect(() => {
  todoRef.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
    const todos = [];
    querySnapshot.forEach((doc) => {
      const { heading, valor, createdAt } = doc.data(); // Correção aqui
      todos.push({
        id: doc.id,
        heading,
        valor,
        createdAt,
      });
    });
    setTodos(todos);
  });
}, []);

  //adicionar despesa ao banco de dados
  const handleAddValor = () => {
    //verifica se há texto escrito
    if (valor.trim() !== '' && descricao.trim() !== '') {
      //obtem uma timestamp
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();

      const newExpense = {
        heading: descricao,
        valor: valor,
        createdAt: timestamp,
      };
      todoRef
          .add(newExpense)
          .then(() => {
            //resetar as variaveis
            setDescricao('');
            setValor('');
            Keyboard.dismiss();
          })
           .catch((error) => {
          // mostra uma mensagem de alerta caso ocorra algum erro
          alert(error);
        });
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

      <FlatList
        style={{}}
        data={todos}
        numColumns={1}
        renderItem={({ item }) => (
          <Despesa item={item}/>
        )}
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
