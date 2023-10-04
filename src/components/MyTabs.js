import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Inicio from './Inicio/Inicio';
import Configuracoes from './Configuracoes/Configuracoes';
import Usuario from './Usuario/Usuario';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Inicio" component={Inicio} />
      <Tab.Screen name="Configurações" component={Configuracoes} />
       <Tab.Screen name="Usuario" component={Usuario} />
    </Tab.Navigator>
  );
}