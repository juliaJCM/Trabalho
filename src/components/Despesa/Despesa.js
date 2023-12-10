import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { deleteTodo } from '../AdicionaDespesa/AdicionaDespesa';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

export default function Despesa({ item, onCategorySelected, onDateSelected }) {

  const createdAtDate = item && item.createdAt && item.createdAt.toDate
    ? moment(item.createdAt.toDate()).format('DD/MM/YYYY')
    : item && item.createdAt instanceof Date
      ? moment(item.createdAt).format('DD/MM/YYYY')
      : '';

  const handleCategorySelection = (category) => {
    onCategorySelected(category);
    onDateSelected(createdAtDate);
  };

  return (
    <TouchableOpacity onPress={() => handleCategorySelection(item.heading)}>
      <View style={[styles.card, styles.cardWide]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 12, alignItems: 'center' }}>
        <View style={{ flex:  3, alignItems: 'flex-start' }}>
          {item && item.icon && <Ionicons name={item.icon} size={30} color="black" />}

        </View>
          <View style={{ flex: 7, alignItems: 'flex-start' }}>
            <Text style={styles.cardCategory}>{item && item.heading}</Text>
            <Text style={styles.cardText}>{createdAtDate}</Text>
          </View>
          <View style={{ flex: 5, alignItems: 'flex-start' }}>
            <Text style={{ color: 'red' }}>{item && item.valor}</Text>
          </View>
          <View style={{ flex:3, alignItems: 'flex-end' }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => deleteTodo(item)}
            >
              <Ionicons name="trash-bin" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cardText: {
    fontSize: 12,
    marginBottom: 5,
  },
  cardCategory: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
});
