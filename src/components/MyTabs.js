import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import AdicionaDespesa from './AdicionaDespesa/AdicionaDespesa';
import Metricas from './Metricas/Metricas';
import Usuario from './Usuario/Usuario';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Adicione Despesa"
        component={AdicionaDespesa}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('assets/casa.png')} 
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Suas Metricas"
        component={Metricas}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('assets/grafico.png')} 
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Usuario"
        component={Usuario}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('assets/usuario.png')} 
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}