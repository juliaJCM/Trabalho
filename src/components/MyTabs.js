import React, { useState, useEffect,  } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import AdicionaDespesa from './AdicionaDespesa/AdicionaDespesa';
import Metricas from './Metricas/Metricas';
import Usuario from './Usuario/Usuario';
import { firebase } from './../firebase/config';

const Tab = createBottomTabNavigator();

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