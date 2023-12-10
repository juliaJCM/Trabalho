import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Keyboard,
  Alert,
  Modal,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import MetasItem from './MetasItem';
import { TextInputMask } from 'react-native-masked-text';
import { firebase } from '../../firebase/config';
import RNPickerSelect from 'react-native-picker-select';
import { Colors } from 'react-native-paper';
import Button from '../button';

const Metas = () => {
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalAmount, setNewGoalAmount] = useState('');
  const [newGoalDate, setNewGoalDate] = useState('');
  const [financialGoalsData, setFinancialGoalsData] = useState([]);
  const [completedGoalsData, setCompletedGoalsData] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [showAddMetaFields, setShowAddMetaFields] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const todoRef = firebase.firestore().collection('metas');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await todoRef.get();
        const goals = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setFinancialGoalsData(goals);
      } catch (error) {
        console.error('Error fetching financial goals: ', error);
      }
    };

    fetchData();
  }, []);

  const handleAddValor = () => {
    setShowAddMetaFields(true);
    setModalVisible(true);
  };

  const handleAddMeta = async () => {
    const dateGoal = moment(newGoalDate, 'DD/MM/YYYY', true);

    if (
      newGoalTitle.trim() !== '' &&
      newGoalAmount.trim() !== '' &&
      dateGoal.isValid()
    ) {
      const db = firebase.firestore();
      try {
        // Remove R$, substitui vírgulas e pontos por nada
        const numericAmount = newGoalAmount.replace(/[^\d]/g, '');

        const newGoal = {
          title: newGoalTitle,
          valor: numericAmount,
          valorAtual: '0',
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          dataMeta: dateGoal.toDate(),
        };

        const docRef = await db.collection('metas').add(newGoal);

        setFinancialGoalsData((prevGoals) => [...prevGoals, { id: docRef.id, ...newGoal }]);
        setNewGoalTitle('');
        setNewGoalAmount('');
        setNewGoalDate('');
        Keyboard.dismiss();
        setShowAddMetaFields(false);
        setModalVisible(false);
      } catch (error) {
        console.error('Error adding financial goal: ', error);
        alert('Erro ao adicionar meta financeira. Por favor, tente novamente.');
      }
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  };

  const onDeleteFinancialGoal = (metasId) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza de que deseja excluir esta meta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => handleDeleteConfirmed(metasId),
        },
      ],
      { cancelable: false }
    );
  };

  const handleDeleteConfirmed = async (metasId) => {
    try {
      await todoRef.doc(metasId).delete();
      setFinancialGoalsData((prevGoals) => prevGoals.filter((goal) => goal.id !== metasId));
    } catch (error) {
      console.error('Error deleting financial goal: ', error);
    }
  };

  const handleUpdateValorAtual = async (metasId, updatedValorAtual) => {
    try {
      const updatedGoals = financialGoalsData.map((goal) =>
        goal.id === metasId
          ? {
              ...goal,
              valorAtual: updatedValorAtual,
              completed: goal.valor <= updatedValorAtual,
            }
          : goal
      );

      setFinancialGoalsData(updatedGoals);

      if (updatedValorAtual >= financialGoalsData.find((goal) => goal.id === metasId).valor) {
        setCompletedGoalsData((prevCompletedGoals) => [
          ...prevCompletedGoals,
          financialGoalsData.find((goal) => goal.id === metasId),
        ]);
      } else {
        setCompletedGoalsData((prevCompletedGoals) =>
          prevCompletedGoals.filter((goal) => goal.id !== metasId)
        );
      }

      await todoRef.doc(metasId).update({
        valorAtual: updatedValorAtual,
        completed: updatedValorAtual >= financialGoalsData.find((goal) => goal.id === metasId).valor,
      });
    } catch (error) {
      console.error('Error updating valorAtual: ', error);
      alert('Erro ao atualizar o valor atual. Por favor, tente novamente.');
    }
  };

  const handleViewCompletedGoals = () => {
    if (filterType === 'completed') {
      setCompletedGoalsData(financialGoalsData.filter((goal) => goal.completed));
    } else if (filterType === 'toBeCompleted') {
      setCompletedGoalsData(financialGoalsData.filter((goal) => !goal.completed));
    } else {
      setCompletedGoalsData([]);
    }
  };

  useEffect(() => {
    handleViewCompletedGoals();
  }, [filterType, financialGoalsData]);

  const setFormattedDate = (text) => {
    setNewGoalDate(text);
  };

  const setFormattedAmount = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');

    if (numericValue.length > 2) {
      const formattedAmount = `R$ ${numericValue.slice(0, -2)}.${numericValue.slice(-2)}`;
      setNewGoalAmount(formattedAmount);
    } else {
      const formattedAmount = `R$ ${numericValue}`;
      setNewGoalAmount(formattedAmount);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.fundo}>
        <View style={styles.formContainer}>
          <Button onPress={handleAddValor} buttonText="Adicionar Meta" />

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {showAddMetaFields && (
                  <>
                    <Text style={styles.sectionTitle}>Descrição da meta</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Descrição da meta"
                      value={newGoalTitle}
                      onChangeText={(text) => setNewGoalTitle(text)}
                    />
                    <Text style={styles.sectionTitle}>Valor da Meta (R$)</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Valor da Meta (R$)"
                      keyboardType="numeric"
                      value={newGoalAmount}
                      onChangeText={(text) => setFormattedAmount(text)}
                    />
                    <Text style={styles.sectionTitle}>Data (DD/MM/YYYY)</Text>
                    <TextInputMask
                      style={styles.input}
                      placeholder="Data (DD/MM/YYYY)"
                      type={'datetime'}
                      options={{
                        format: 'DD/MM/YYYY',
                      }}
                      value={newGoalDate}
                      onChangeText={setFormattedDate}
                    />
                    <Button onPress={handleAddMeta} buttonText="Adicionar Meta" />
                  </>
                )}
              </View>
            </View>
          </Modal>

          <RNPickerSelect
            onValueChange={(value) => setFilterType(value)}
            items={[
              { label: 'Todas as Metas', value: 'all' },
              { label: 'Metas Batidas', value: 'completed' },
              { label: 'Metas a serem Batidas', value: 'toBeCompleted' },
            ]}
            style={pickerSelectStyles}
            value={filterType}
          />
        </View>

        <View style={styles.listaMetas}>
          <FlatList
            data={financialGoalsData.filter((goal) => {
              if (filterType === 'completed') {
                return goal.completed;
              } else if (filterType === 'toBeCompleted') {
                return !goal.completed;
              }
              return true;
            })}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <MetasItem
                id={item.id}
                title={item.title}
                valor={item.valor}
                valorAtual={item.valorAtual}
                onUpdateValorAtual={handleUpdateValorAtual}
                onDelete={() => onDeleteFinancialGoal(item.id)}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    borderWidth: 1,
    padding: 5,
    color: 'black',
    backgroundColor: 'transparent',
  },
  inputAndroid: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    borderWidth: 1,
    padding: 5,
    color: 'black',
    backgroundColor: 'transparent',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#210054',
  },
  formContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
    width: '100%',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'input',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 5,
    color: 'black',
    backgroundColor: 'transparent',
  },
  fundo: {
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    height: '95%',
    width: '90%',
    alignItems: 'center',
    marginTop: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
    shadowRadius: 2,
  },
  listaMetas: {
    flex: 12,
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    elevation: 5,
    width: '90%'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default Metas;
