import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { deleteTodo } from "../../controllers/FirebaseController";
import moment from "moment";

export default function Despesa({ item }) {
  const formattedDate =
    item && item.createdAt
      ? moment(item.createdAt.toDate()).format("DD/MM/YYYY")
      : "";

  return (
    <View style={[styles.card, styles.cardWide]}>
      <Text style={styles.cardText}>Data: {formattedDate}</Text>
      <Text style={styles.cardText}>Descrição: {item && item.heading} </Text>
      <Text style={styles.cardText}>Valor: R${item && item.valor} </Text>
      <Button title="Excluir" onPress={() => deleteTodo(item)} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginTop: 20,
    alignItems: "center",
  },
  cardWide: {
    width: 300,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
