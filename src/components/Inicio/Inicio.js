import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Logo from "../Logo/Logo";
import { loginUser } from "../../controllers/FirebaseController";

export default function Inicio({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await loginUser(username, password);
      navigation.navigate("Tabs");
    } catch (error) {
      alert("Erro ao fazer login: " + error.message);
    }
  };

  const handleCadastro = () => {
    navigation.navigate("Cadastro");
  };

  return (
    <View style={styles.container}>
      <Logo />
      <Text>Seja Bem-Vindo</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário ou Email"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "black" }]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.text}>Não tem uma conta?</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "black" }]}
        onPress={handleCadastro}
      >
        <Text style={styles.buttonText}>Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EBC725",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
  text: {
    marginTop: 100,
  },
});
