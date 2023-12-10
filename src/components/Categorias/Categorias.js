import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import RNPickerSelect from 'react-native-picker-select';
import Despesa from '../Despesa/Despesa';

import { firebase } from '../../firebase/config';
import Animated, { Easing, useAnimatedStyle } from 'react-native-reanimated'; // Add useAnimatedStyle here
import 'moment/locale/pt-br';
import moment from 'moment';

const todoRef = firebase.firestore().collection('despesas');
const rendas = firebase.firestore().collection('todos');

export const deleteTodo = (todos) => {
  todoRef.doc(todos.id).delete();
};

export default function Categorias() {
 const [data, setData] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedInterval, setSelectedInterval] = useState('day');
  const [minExpense, setMinExpense] = useState(0);
  const [maxExpense, setMaxExpense] = useState(0);
  const [minExpenseDate, setMinExpenseDate] = useState('');
  const [maxExpenseDate, setMaxExpenseDate] = useState('');
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [isExpenseGreaterThanIncome, setIsExpenseGreaterThanIncome] = useState(false); // Add this line
  const chartAnimation = useRef(new Animated.Value(0)).current;



  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const formatLabel = (date, interval) => {
    if (interval === 'day') {
      return moment(date).format('DD/MM/YYYY'); // Format for daily interval
    } else if (interval === 'Semana') {
      return `Semana ${moment(date).format('WW/YYYY')}`; // Format for weekly interval
    } else if (interval === 'month') {
      return moment(date).format('MMM-YYYY'); // Format for monthly interval
    }
    return '';
  };
const calcularDespesasPorSemana = (todos, categoryFilter) => {
  const filteredTodos = todos.filter(
    (item) => item.heading && (!categoryFilter || item.heading === categoryFilter)
  );

  const weeks = {};

  filteredTodos.forEach((item) => {
    const createdAtDate = item.createdAt && item.createdAt.toDate
      ? moment(item.createdAt.toDate()).toDate()
      : item.createdAt instanceof Date
      ? item.createdAt
      : new Date();

    // Calculate the week number in a 30-day month
    const week = Math.ceil(moment(createdAtDate).dayOfYear() / 7);

    const value = typeof item.valor === 'string' ? parseFloat(item.valor.replace('R$', '').replace(',', '')) : 0;

    if (weeks[week]) {
      weeks[week] += value;
    } else {
      weeks[week] = value;
    }
  });

  const currentYear = moment().year();

  const resultData = Object.keys(weeks).map((week) => {
    const startDate = moment().startOf('year').add(week - 1, 'weeks').format('DD/MMM');
    const endDate = moment().startOf('year').add(week, 'weeks').subtract(1, 'day').format('DD/MMM');
    return {
      name: `${startDate} - ${endDate}`, // Format the week label
      population: weeks[week],
      color: getRandomColor(),
      legendFontColor: 'black',
      legendFontSize: 12,
    };
  });

  return resultData;
};


  const calcularDespesasPorMes = (todos, categoryFilter) => {
    const filteredTodos = todos.filter(
      (item) => item.heading && (!categoryFilter || item.heading === categoryFilter)
    );

    const months = {};

    filteredTodos.forEach((item) => {
      const createdAtDate = item.createdAt && item.createdAt.toDate
        ? moment(item.createdAt.toDate()).toDate()
        : item.createdAt instanceof Date
          ? item.createdAt
          : new Date();

      const month = moment(createdAtDate).format('YYYY-MM');

      const value = typeof item.valor === 'string' ? parseFloat(item.valor.replace('R$', '').replace(',', '')) : 0;

      if (months[month]) {
        months[month] += value;
      } else {
        months[month] = value;
      }
    });

     const resultData = Object.keys(months).map((month) => ({
      name: formatLabel(moment(month).toDate(), selectedInterval),
      population: months[month],
      color: getRandomColor(),
      legendFontColor: 'black',
      legendFontSize: 12,
    }));

    return resultData;
  };

  const calcularDespesasPorDia = (todos, categoryFilter) => {
    const filteredTodos = todos.filter(
      (item) => item.heading && (!categoryFilter || item.heading === categoryFilter)
    );

    const days = {};

    filteredTodos.forEach((item) => {
      const createdAtDate = item.createdAt && item.createdAt.toDate
        ? moment(item.createdAt.toDate()).toDate()
        : item.createdAt instanceof Date
          ? item.createdAt
          : new Date();

      const day = moment(createdAtDate).format('YYYY-MM-DD');

      const value = typeof item.valor === 'string' ? parseFloat(item.valor.replace('R$', '').replace(',', '')) : 0;

      if (days[day]) {
        days[day] += value;
      } else {
        days[day] = value;
      }
    });

    const resultData = Object.keys(days).map((day) => ({
      name: formatLabel(moment(day).toDate(), selectedInterval),
      population: days[day],
      color: getRandomColor(),
      legendFontColor: 'black',
      legendFontSize: 12,
      
    }));

    return resultData;
  };

  const filtrarPorCategoria = (todos) => {
    if (!selectedCategory) {
      return todos;
    } else {
      return todos.filter((item) => {
        return item.heading && item.heading.toLowerCase() === selectedCategory.toLowerCase();
      });
    }
  };
 useEffect(() => {
    const fetchIncomeData = () => {
      const unsubscribeRendas = rendas.onSnapshot((querySnapshot) => {
        let totalIncomeValue = 0;
        querySnapshot.forEach((doc) => {
          const { tipo, valor, timestamp } = doc.data();
          // Assuming timestamp is a valid date
          const createdAtDate = moment(timestamp.toDate());
          const currentMonth = moment().startOf('month');
          if (tipo === 'rendaFixa' && createdAtDate.isSameOrAfter(currentMonth)) {
            totalIncomeValue += parseFloat(valor);
          }
        });
        setTotalIncome(totalIncomeValue);
      });

      return () => unsubscribeRendas();
    };

    fetchIncomeData();
  }, []);

  useEffect(() => {
    setIsExpenseGreaterThanIncome(totalExpenses > totalIncome);
  }, [totalExpenses, totalIncome]);
  
  useEffect(() => {
    const unsubscribe = todoRef.onSnapshot((querySnapshot) => {
      const todos = [];
      let totalExpensesValue = 0; // Adicionado para rastrear despesas totais
      querySnapshot.forEach((doc) => {
        const { heading, valor, createdAt } = doc.data();
        const createdAtDate = createdAt && createdAt.toDate ? moment(createdAt.toDate()).toDate() : null;

        todos.push({ heading, valor, createdAt: createdAtDate });

        // Adicionado para calcular as despesas totais
        totalExpensesValue += parseFloat(valor.replace('R$', '').replace(',', ''));
      });

      setAllExpenses(todos);
      setTotalExpenses(totalExpensesValue);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
 const fetchSelectedExpenses = () => {
    const filteredTodos = filtrarPorCategoria(allExpenses);

    let expensesData;
    if (selectedInterval === 'Semana') {
      expensesData = calcularDespesasPorSemana(filteredTodos, selectedCategory);
    } else if (selectedInterval === 'month') {
      expensesData = calcularDespesasPorMes(filteredTodos, selectedCategory);
    } else {
      expensesData = calcularDespesasPorDia(filteredTodos, selectedCategory);
    }

    // Calculate minimum and maximum expenses and their corresponding dates
    let minExpenseValue = Number.POSITIVE_INFINITY;
    let maxExpenseValue = Number.NEGATIVE_INFINITY;
    let minExpenseDateValue = '';
    let maxExpenseDateValue = '';

    expensesData.forEach((item) => {
      if (item.population < minExpenseValue) {
        minExpenseValue = item.population;
        minExpenseDateValue = item.name;
      }
      if (item.population > maxExpenseValue) {
        maxExpenseValue = item.population;
        maxExpenseDateValue = item.name;
      }
    });

    // Set minimum and maximum expenses and their corresponding dates in the state
    setMinExpense(minExpenseValue);
    setMaxExpense(maxExpenseValue);
    setMinExpenseDate(minExpenseDateValue);
    setMaxExpenseDate(maxExpenseDateValue);

    // Set data for the pie chart
    setData(expensesData);

    // Set total expenses for the category
    const totalCategoryExpenses = expensesData.reduce((total, item) => total + item.population, 0);
    setTotalExpenses(totalCategoryExpenses);
  };


    fetchSelectedExpenses();
  }, [selectedCategory, allExpenses, selectedInterval]);
const animatedStyle = useAnimatedStyle(() => {
  return {
    transform: [{ rotate: `${chartAnimation.value * 360}deg` }],
    transformOrigin: 'center center', // Adicione esta linha para definir a origem da rotação
  };
});


  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
              style={[styles.intervalButton, selectedInterval === 'day' && styles.selectedButton]}
              onPress={() => setSelectedInterval('day')} >
              <Text>Dia</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={[styles.intervalButton, selectedInterval === 'Semana' && styles.selectedButton]}
              onPress={() => setSelectedInterval('Semana')}>
              <Text>Semana</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={[styles.intervalButton, selectedInterval === 'month' && styles.selectedButton]}
              onPress={() => setSelectedInterval('month')}>
              <Text>Mês</Text>
          </TouchableOpacity>
          
        </View>

        <RNPickerSelect
          onValueChange={(value) => setSelectedCategory(value)}
          items={[
            { label: 'Todas as Categorias', value: '' },
            ...[...new Set(allExpenses.map((item) => item.heading))].map((category) => ({ label: category, value: category })),
          ]}
          style={pickerSelectStyles}
          value={selectedCategory}
        />

        <Text style={styles.title}>Categoria {selectedCategory}</Text>
        <View style={styles.grafico}>
          <Animated.View style={animatedStyle}>
           <PieChart
              data={data}
              width={300}
              height={200}
              chartConfig={{
                backgroundGradientFrom: '#1E2923',
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              radius="100%"
              rotation={2}
              circumference={360}
              animation={{
                animateRotate: true,
                animateScale: true,
              }}
            />
             <View style={styles.doughnutCenter}>
    <Text style={styles.somaTotalText}>R$ {totalExpenses.toFixed(2)}</Text>
  </View>
          </Animated.View>
          <View style={styles.infoMinMax}>
            <View style={styles.valueMaxMin}>
              <Text style={styles.expensesLabel}>Gasto Mínimo:</Text>
              <Text style={styles.expensesMinMax}>{minExpense.toFixed(2)}</Text>
              <Text>{minExpenseDate}</Text>
            </View>
            <View style={styles.valueMaxMin}>
              <Text style={styles.expensesLabel}>Gasto Máximo:</Text>
              <Text style={styles.expensesMinMax}>{maxExpense.toFixed(2)}</Text>
              <Text>{maxExpenseDate}</Text>
            </View>
          </View>
           
        </View>
       

        {selectedCategory && (
          <View style={styles.expensesContainer}>
           
            <View style={styles.listDespesas}>
              <FlatList
                data={filtrarPorCategoria(allExpenses)}
                numColumns={1}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item }) => (
                  <Despesa
                    item={item}
                    onCategorySelected={(category) => {
                      setSelectedCategory(category);
                    }}
                    onDateSelected={(date) => {
                      // handle date selection if needed
                    }}
                  />
                )}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
}


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
    paddingTop: 5,
   
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
   doughnutCenter: {
    position: 'absolute',
    top: '23%', // Ajuste a posição vertical conforme necessário
    left: '12%', // Ajuste a posição horizontal conforme necessário
    width: '37%', // Ajuste o tamanho do círculo branco conforme necessário
    height: '55%',
    borderRadius: 200,
    backgroundColor: '#F0F0F0',
  },
    somaTotalText: {
    position: 'absolute',
    top: '40%', // Ajuste a posição vertical conforme necessário
    left: '12%', // Ajuste a posição horizontal conforme necessário
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6052b7',
  },
  chartContainer: {
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
  },
  expensesContainer: {
    width: '100%',
    marginTop: 5,
      backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 10,
   
  },

  listDespesas:{

  },
   buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  intervalButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '33%',
  },

  selectedButton: {
    backgroundColor: '#6052b7',
    color: 'white',
    
  },
  expensesLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
  },
  infoMinMax:{
    flexDirection: 'row',
    
      justifyContent: 'space-between',
  },
  valueMaxMin:{
    flexDirection: 'column',
    alignItems:'center',
  },
  expensesMinMax: {
    fontSize: 15,
    color: 'black',
    marginTop: 5,
  },
});


