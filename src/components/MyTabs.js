import React, { useState, useEffect,  } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import AdicionaDespesa from './AdicionaDespesa/AdicionaDespesa';
import Metricas from './Metricas/Metricas';
import Usuario from './Usuario/Usuario';
import { firebase } from './../firebase/config';
import moment from 'moment';

const Tab = createBottomTabNavigator();

export const handleAddValor = (
  valor,
  selectedCategory,
  todoRef,
  setValor,
  setSelectedCategory,
  setFormattedDates,
  Keyboard
) => {
  console.log('Chamando handleAddValor');
  console.log('valor:', valor);
  console.log('selectedCategory:', selectedCategory);
  if (valor.trim() !== '' && selectedCategory !== '') {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    const newExpense = {
      heading: selectedCategory,
      valor: valor,
      createdAt: timestamp,
      category: selectedCategory,
    };

    todoRef
      .add(newExpense)
      .then(() => {
        setValor('');
        setSelectedCategory('');
        const formattedDate = moment().format('DD/MM/YYYY');
        setFormattedDates((prevDates) => [...prevDates, formattedDate]);
        Keyboard.dismiss();
      })
      .catch((error) => {
        alert(error);
      });
  } else {
    alert('Por favor, preencha todos os campos, incluindo a categoria.');
  }
};

export const deleteTodo = (todoId) => {
  const todoRef = firebase.firestore().collection('todos').doc(todoId);

  return todoRef
    .delete()
    .then(() => {
      console.log('Todo successfully deleted!');
    })
    .catch((error) => {
      console.error('Error deleting todo: ', error);
    });
};
export default function MyTabs() {
  const todoRef = firebase.firestore().collection('todos');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log('todoRef:', todoRef);

    const unsubscribe = todoRef.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
      const newTodos = [];
      querySnapshot.forEach((doc) => {
        const { heading, valor, createdAt } = doc.data();
        newTodos.push({
          id: doc.id,
          heading,
          valor,
          createdAt,
        });
      });
      console.log('Todos:', newTodos);
      setTodos(newTodos);

      // Store newTodos in local storage
    
    });

    return () => unsubscribe();
  }, []);


  return (

    <Tab.Navigator>
      <Tab.Screen
        name="Adicione Despesa"
        options={{
          tabBarIcon: ({ color, size }) => ( 
            <Image
              source={require('../assets/casa.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      >
        {(props) => <AdicionaDespesa {...props}  todoRef={todoRef}/>}
      </Tab.Screen>
      <Tab.Screen
        name="Suas Metricas"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/grafico.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      >
        {(props) => <Metricas {...props} todoRef={todoRef}/>}
      </Tab.Screen>
      <Tab.Screen
        name="Usuario"
        component={Usuario}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/usuario.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}