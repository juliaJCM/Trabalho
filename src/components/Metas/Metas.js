import React, { useState } from 'react';
import { View, FlatList, Text, TextInput, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import MetasItem from './MetasItem';
import MaskedInput from 'react-native-masked-text';
const Metas = () => {
  const [isYearly, setIsYearly] = useState(true);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalAmount, setNewGoalAmount] = useState('');
  const [newGoalDate, setNewGoalDate] = useState('');

  const [yearlyFinancialGoals, setYearlyFinancialGoals] = useState([
    { id: '1', title: 'Save $5000 for vacation', amount: 5000, targetDate: '2023-12-31', isCompleted: false },
    // Add more yearly financial goal data as needed
  ]);

  const [monthlyFinancialGoals, setMonthlyFinancialGoals] = useState([
    { id: '1', title: 'Save $500 for emergency fund', amount: 500, targetDate: '2023-12-31', isCompleted: false },
    // Add more monthly financial goal data as needed
  ]);

  const financialGoalsData = isYearly ? yearlyFinancialGoals : monthlyFinancialGoals;
  const setFinancialGoalsData = isYearly ? setYearlyFinancialGoals : setMonthlyFinancialGoals;

  const addFinancialGoal = () => {
    const newFinancialGoal = {
      id: String(Date.now()),
      title: newGoalTitle,
      amount: parseFloat(newGoalAmount) || 0,
      targetDate: formatDate(newGoalDate),
      isCompleted: false,
    };

    setFinancialGoalsData((prevGoals) => [...prevGoals, newFinancialGoal]);
    setNewGoalTitle('');
    setNewGoalAmount('');
    setNewGoalDate('');
  };

  const onDeleteFinancialGoal = (goalId) => {
    setFinancialGoalsData((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
  };

  const formatDate = (date) => {
    // Formata a data no formato DD-MM-AAAA
    // Supõe que a data inserida já está no formato DD-MM-AAAA
    return date;
  };

  const formatCurrency = (value) => {
    // Formata o valor como moeda brasileira (R$)
    return parseFloat(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };


  return (
    <View>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Yearly</Text>
        <Switch value={isYearly} onValueChange={() => setIsYearly((prev) => !prev)} />
        <Text style={styles.switchLabel}>Monthly</Text>
      </View>

     <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Descrição da meta"
        value={newGoalTitle}
        onChangeText={(text) => setNewGoalTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Valor da Meta (R$)"
        keyboardType="numeric"
        value={formatCurrency(newGoalAmount)}
        onChangeText={(text) => setNewGoalAmount(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Data a ser batida (DD-MM-AAAA)"
        keyboardType="numeric"
        value={newGoalDate}
        onChangeText={(text) => setNewGoalDate(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={addFinancialGoal}>
        <Text style={styles.buttonText}>Add Financial Goal</Text>
      </TouchableOpacity>
    </View>

      <FlatList
        data={financialGoalsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MetasItem
            title={item.title}
            description={`Save $${item.amount} by ${item.targetDate}`}
            isCompleted={item.isCompleted}
            onDelete={() => onDeleteFinancialGoal(item.id)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  formContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#6052b7',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Metas;
