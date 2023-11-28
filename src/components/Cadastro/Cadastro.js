import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import { cadastrarUsuario } from "../../controllers/FirebaseController";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleCadastrarUsuario = async () => {
    if (nome.trim() !== "" && email.trim() !== "" && senha.trim() !== "") {
      try {
        await cadastrarUsuario(nome, email, senha);
        setNome("");
        setEmail("");
        setSenha("");
        Keyboard.dismiss();
      } catch (erro) {
        console.error(erro);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={(text) => setNome(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry
        value={senha}
        onChangeText={(text) => setSenha(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleCadastrarUsuario}>
        <Text style={{ color: "white" }}>Cadastrar</Text>
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
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 5,
  },
  button: {
    backgroundColor: "black",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
});
