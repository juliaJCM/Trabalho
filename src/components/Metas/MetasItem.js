import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MetasItem = ({ id, title, valor, valorAtual, onUpdateValorAtual, onDelete }) => {
  const [updatedValue, setUpdatedValue] = useState('');
  const [editMode, setEditMode] = useState(false);

  const handleUpdatePress = () => {
    setEditMode(true);
  };

  const handleSavePress = () => {
    if (updatedValue.trim() !== '') {
      const updatedValueNumber = parseFloat(updatedValue);
      if (!isNaN(updatedValueNumber)) {
        onUpdateValorAtual(id, updatedValueNumber);
        setUpdatedValue('');
        setEditMode(false);
      } else {
        Alert.alert('Valor Inválido', 'Por favor, insira um valor numérico válido.');
      }
    } else {
      setEditMode(false);
    }
  };

  const handleDeletePress = () => {
    onDelete();
  };

  const isCompleted = valorAtual >= parseFloat(valor);

  return (
    <View style={styles.container}>
      <View style={styles.metaInfoIcons}>
        <View style={styles.metaInfo}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.valor}>Valor: {valor}</Text>
          <Text style={styles.valorAtual}>Valor Atual: {valorAtual}</Text>
          <ProgressBar
            progress={Math.min(valorAtual / parseFloat(valor), 1)}
            color={isCompleted ? Colors.green500 : Colors.purple500}
            style={styles.progressBar}
          />
        </View>

        <View style={styles.iconsContainer}>
          {!editMode ? (
            <TouchableOpacity style={styles.icon} onPress={handleUpdatePress} disabled={isCompleted}>
              <Icon name="edit" size={30} color={isCompleted ? '#999999' : 'green'} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.icon} onPress={handleSavePress} disabled={isCompleted}>
              <Icon name="save" size={30} color={isCompleted ? '#999999' : 'blue'} />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.icon} onPress={handleDeletePress} disabled={isCompleted}>
            <Icon name="delete" size={30} color={isCompleted ? '#999999' : 'black'} />
          </TouchableOpacity>
        </View>
      </View>

      {editMode && (
        <TextInput
          style={styles.input}
          placeholder="Novo Valor"
          keyboardType="numeric"
          value={updatedValue}
          onChangeText={(text) => setUpdatedValue(text)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 4,
  },
  metaInfoIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  valor: {
    marginTop: 8,
  },
  valorAtual: {
    marginTop: 4,
  },
  progressBar: {
    marginTop: 8,
  },
  iconsContainer: {
    flexDirection: 'column',
    marginTop: 8,
    justifyContent: 'space-between',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    marginBottom: 8,
    padding: 8,
  },
});

export default MetasItem;
