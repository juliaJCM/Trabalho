import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Keyboard,
} from "react-native";
import Logo from "../Logo/Logo";
import Despesa from "../Despesa/Despesa";
import {
  adicionarDespesa,
  obterDespesas,
} from "../../controllers/FirebaseController.js";

export default function AdicionarDespesas() {
  const [despesas, setDespesas] = useState([]);
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await obterDespesas(setDespesas);
    };
    fetchData();
  }, []);

  const handleAdicionarDespesa = () => {
    if (valor.trim() !== "" && descricao.trim() !== "") {
      try {
        adicionarDespesa(descricao, valor);
        setDescricao("");
        setValor("");
        Keyboard.dismiss();
      } catch (erro) {
        console.error(erro);
      }
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
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "black" }]}
        onPress={handleAdicionarDespesa}
      >
        <Text style={{ color: "white" }}>Adicione</Text>
      </TouchableOpacity>

      <FlatList
        style={{}}
        data={despesas}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        renderItem={({ item }) => <Despesa item={item} />}
      />
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
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
});
