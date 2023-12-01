import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import RNPickerSelect from 'react-native-picker-select';
import Despesa from '../Despesa/Despesa';
import 'moment/locale/pt-br';


const Metricas = ({ todoRef }) => {
  const [data, setData] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedExpenses, setSelectedExpenses] = useState([]);

  useEffect(() => {
    const unsubscribe = todoRef.onSnapshot((querySnapshot) => {
      const todos = [];
      querySnapshot.forEach((doc) => {
        const { heading, valor, createdAt } = doc.data();
        todos.push({ heading, valor, createdAt: createdAt.toDate() });
      });

      console.log('Todos:', todos);

      setAllExpenses(todos);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const calcularDespesasPorCategoria = (todos, categoryFilter) => {
      const filteredTodos = todos.filter(
        (item) => !categoryFilter || item.heading === categoryFilter
      );

      console.log('Filtered Todos:', filteredTodos);

      const categories = {};

      filteredTodos.forEach((item) => {
        const category = item.heading;
        const value = parseFloat(
          item.valor.replace('R$', '').replace(',', '')
        );

        if (categories[category]) {
          categories[category].value += value;
        } else {
          categories[category] = { value, data: [] };
        }

        categories[category].data.push({ date: item.createdAt, value });
      });

      const resultData = Object.keys(categories).map((category, index) => ({
        name: category,
        population: categories[category].value,
        data: categories[category].data,
        color: getRandomColor(),
        legendFontColor: 'black',
        legendFontSize: 12,
      }));

      console.log('Result Data:', resultData);

      return resultData;
    };

    setData(calcularDespesasPorCategoria(allExpenses, selectedCategory));
  }, [selectedCategory, allExpenses]);

  useEffect(() => {
    const fetchSelectedExpenses = () => {
      const selectedCategoryExpenses = allExpenses.filter(
        (item) => !selectedCategory || item.heading === selectedCategory
      );
      setSelectedExpenses(selectedCategoryExpenses);
    };

    fetchSelectedExpenses();
  }, [selectedCategory, allExpenses]);


  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

const renderDespesa = (expense, expenseIndex) => (
  <Despesa
    key={expenseIndex}
    item={expense}
    onCategorySelected={(category) => {
      setSelectedCategory(category);
    }}
    onDateSelected={(date) => {
      setFormattedDates((prevDates) => [
        ...prevDates,
        { date, expense },
      ]);
    }}
  />
);

   const formatDate = (dateString) => {
      try {
        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
       
          return 'Data inválida';
        }

    
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);

        return `${day}/${month}/${year}`;
      } catch (error) {
        console.error('Error formatting date:', error);
        return 'Erro ao formatar data';
      }
    };
  return (
    <View style={styles.container}>

      <RNPickerSelect
        onValueChange={(value) => setSelectedCategory(value)}
        items={[
          { label: 'Todas as Categorias', value: '' },
          ...[...new Set(allExpenses.map(item => item.heading))].map((category) => ({ label: category, value: category })),
        ]}
        style={pickerSelectStyles}
        value={selectedCategory}
      />
   
      <View style={styles.chartContainer}>
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
                data={data.find((categoryData) => categoryData.name === selectedCategory)?.data || []}
                numColumns={1}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item: expense, index: expenseIndex }) => renderDespesa(expense, expenseIndex)}
              />
            </View>
          </View>
        
        )}
      </View>
    </View>
  );
};


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 40,
    marginTop: 10,
    borderWidth: 1,
    padding: 5,
    color: 'black',
    backgroundColor: 'transparent',
  },
  inputAndroid: {
   width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 40,
    marginTop: 10,
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
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  chartContainer: {
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    height: 800,
    width: 330,
    alignItems: 'center',
    marginTop: 30,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  expensesContainer: {
    width: 300,
    marginTop: 20,
      backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  expensesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  expensesItem: {
    
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 14,
    color: '#666',
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  expenseDate: {
    fontSize: 14,
    color: '#444',
  },
  expenseValue: {
    fontSize: 14,
    color: '#222',
  },
});

export default Metricas;
