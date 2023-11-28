import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MyTabs from "./components/MyTabs";
import Inicio from "./components/Inicio/Inicio";
import Cadastro from "./components/Cadastro/Cadastro";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen
          name="Inicio"
          component={Inicio}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Tabs"
          component={MyTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
