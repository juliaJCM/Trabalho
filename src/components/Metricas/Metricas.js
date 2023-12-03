import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity  } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import RNPickerSelect from 'react-native-picker-select';
import Despesa from '../Despesa/Despesa';
import 'moment/locale/pt-br';
import moment from 'moment';


export default function Metricas({ todoRef }) {
  const [data, setData] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedInterval, setSelectedInterval] = useState('year'); // Add this line


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

      const week = moment(createdAtDate).format('YYYY-[W]WW');

      const value = typeof item.valor === 'string' ? parseFloat(item.valor.replace('R$', '').replace(',', '')) : 0;

      if (weeks[week]) {
        weeks[week] += value;
      } else {
        weeks[week] = value;
      }
    });

    const resultData = Object.keys(weeks).map((week) => ({
      name: formatLabel(moment(week, 'YYYY-WW').toDate(), selectedInterval),
      population: weeks[week],
      color: getRandomColor(),
      legendFontColor: 'black',
      legendFontSize: 12,
    }));

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
    const unsubscribe = todoRef.onSnapshot((querySnapshot) => {
      const todos = [];
      querySnapshot.forEach((doc) => {
        const { heading, valor, createdAt } = doc.data();
        const createdAtDate = createdAt && createdAt.toDate ? moment(createdAt.toDate()).toDate() : null;

        todos.push({ heading, valor, createdAt: createdAtDate });
      });

      setAllExpenses(todos);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchSelectedExpenses = () => {
      const filteredTodos = filtrarPorCategoria(allExpenses);

      if (selectedInterval === 'Semana') {
        const weeklyData = calcularDespesasPorSemana(filteredTodos, selectedCategory);
        setData(weeklyData);
      } else if (selectedInterval === 'month') {
        const monthlyData = calcularDespesasPorMes(filteredTodos, selectedCategory);
        setData(monthlyData);
      } else {
        const dailyData = calcularDespesasPorDia(filteredTodos, selectedCategory);
        setData(dailyData);
      }
    };

    fetchSelectedExpenses();
  }, [selectedCategory, allExpenses, selectedInterval]);

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <View style={styles.buttonContainer}>
       <TouchableOpacity
  style={[styles.intervalButton, selectedInterval === 'day' && styles.selectedButton]}
  onPress={() => setSelectedInterval('day')}
>
  <Text>Dia</Text>
</TouchableOpacity>
<TouchableOpacity
  style={[styles.intervalButton, selectedInterval === 'Semana' && styles.selectedButton]}
  onPress={() => setSelectedInterval('Semana')}
>
  <Text>Semana</Text>
</TouchableOpacity>
<TouchableOpacity
  style={[styles.intervalButton, selectedInterval === 'month' && styles.selectedButton]}
  onPress={() => setSelectedInterval('month')}
>
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

        <Text style={styles.title}>Despesas por categoria</Text>
        <PieChart
          data={data}
          width={300}
          height={200}
          doughnut={true}
          chartConfig={{
            backgroundGradientFrom: "#1E2923",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#08130D",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2,
            barPercentage: 0.5,
            useShadowColorFromDataset: false,
            style: {
              borderRadius: 16,
            },
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />

        {selectedCategory && (
          <View style={styles.expensesContainer}>
            <Text style={styles.expensesTitle}>Despesas para a categoria: {selectedCategory}</Text>
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
  expensesTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
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
    width: '33%'
  },
  selectedButton: {
    backgroundColor: '#6052b7',
    color: 'white',
    
  },
});


