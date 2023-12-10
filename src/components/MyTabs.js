import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AdicionaDespesa from './AdicionaDespesa/AdicionaDespesa';
import Categorias from './Categorias/Categorias';
import Usuario from './Usuario/Usuario';
import Metricas from './Metricas/Metricas';
import Metas from './Metas/Metas';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChartPie, faBullseye, faChartSimple  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

// Adicione os ícones que você precisa à biblioteca
library.add(faChartPie, faBullseye, faChartSimple );

// ...


const Tab = createBottomTabNavigator();

export default function MyTabs() {

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Despesas"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/casa.png')}
              style={{ width: size, height: size, tintColor: '#6052b7' }}
            />
          ),
        }}
      >
        {(props) => (
          <AdicionaDespesa
        
          />
        )}
      </Tab.Screen>
    <Tab.Screen
  name="Categorias"
  options={{
    tabBarIcon: ({ color, size }) => (
         <FontAwesomeIcon icon={faChartPie} style={{ color: '#6052b6' }} size={size} />

    ),
  }}
>
  {(props) => <Categorias {...props} />}
    </Tab.Screen>
        <Tab.Screen
            name="Metas"
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesomeIcon icon="bullseye" size={size} color={'#6052b6'} />
              ),
            }}
          >
          {(props) => <Metas {...props} />}
    </Tab.Screen>
<Tab.Screen 
  name="Metricas"
  options={{
    tabBarIcon: ({ color, size }) => (
  <FontAwesomeIcon icon={faChartSimple} beat style={{ color: "#6052b7" }} />
    ),
  }}
>
  {(props) => <Metricas {...props} />}
</Tab.Screen>


       <Tab.Screen
        name="Minha conta"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={size} color="#6052b7" style={{ tintColor: color }} />
          ),
        }}
      >
        {(props) => <Usuario {...props} />}
      </Tab.Screen>
      
     
    </Tab.Navigator>
  );
}