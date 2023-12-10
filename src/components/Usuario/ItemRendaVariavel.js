import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ItemRendaVariavel = ({ item, onDelete }) => {
  return (
    <View style={styles.card}>
      <View >
        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{item.descricao}:</Text>
        <Text style={{ color: 'green', fontSize: 15, fontWeight: 'bold' }}>R$ {item.valor.toFixed(2)}</Text>
      </View>
      <View >
        <TouchableOpacity
             onPress={() => onDelete(item.id)}
            >
            <Ionicons name="trash-bin" size={30} color="black" />
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default ItemRendaVariavel;

const styles = StyleSheet.create({
  card: {
    padding: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', 

    justifyContent: 'space-between', 
    flex: 12, 
    alignItems: 'center'
  },
})