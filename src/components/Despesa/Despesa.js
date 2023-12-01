import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { deleteTodo } from '../AdicionaDespesa/AdicionaDespesa';
import moment from 'moment';

export default function Despesa({ item, onCategorySelected, onDateSelected }) {
  const formattedDate = item && item.createdAt ? moment(item.createdAt.toDate()).format('DD/MM/YYYY') : '';

 
  const handleCategorySelection = (category) => {
    onCategorySelected(category);
   
    onDateSelected(formattedDate);
  };

  return (
    <TouchableOpacity onPress={() => handleCategorySelection(item.heading)}>
      <View style={[styles.card, styles.cardWide]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 12, alignItems: 'center' }}>
          <View style={{ flex: 6, alignItems: 'flex-start' }}>
            <Text style={styles.cardCategory}>{item && item.heading}</Text>
            <Text style={styles.cardText}>{formattedDate}</Text>
          </View>
          <View style={{ flex: 4, alignItems: 'flex-start' }}>
            <Text style={{ color: 'red' }}>{item && item.valor}</Text>
          </View>
          <View style={{ flex: 4, alignItems: 'flex-end' }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => deleteTodo(item)}
            >
              <Text style={styles.buttonText}>Deletar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
     backgroundColor: '#DCDCDC',
    padding: 20,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 20,
    flexDirection: 'row',
    // Adicione a sombra na parte inferior
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1, // 
   
  
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
  button: {
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  
    backgroundColor: '#250939',
 
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
  cardWide: {
    width: '100%',
  },
});
