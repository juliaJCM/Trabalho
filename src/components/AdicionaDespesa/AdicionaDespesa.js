import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Keyboard,
} from 'react-native';
import Logo from '../Logo/Logo';
import moment from 'moment';
import 'moment/locale/pt-br';
import Despesa from '../Despesa/Despesa';
import Metricas from '../Metricas/Metricas';
import { firebase } from '../../firebase/config';
import RNPickerSelect from 'react-native-picker-select';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { handleAddValor } from '../Funcoes';

const todoRef = firebase.firestore().collection('todos');

export const deleteTodo = (todos) => {
  todoRef.doc(todos.id).delete();
};

const formatCurrency = (value) => {
  let numericValue = value.replace(/[^0-9]/g, '');

  if (numericValue.length > 2) {
    numericValue = `${numericValue.slice(0, -2)}.${numericValue.slice(-2)}`;
  }

  const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return formattedValue;
};

export default function GerenciarDespesas({todoRef}) {
  moment.locale('pt-br');
  const [todos, setTodos] = useState([]);
  const [valor, setValor] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [isAddingExpense, setIsAddingExpense] = useState(false);

  const [formattedDates, setFormattedDates] = useState([]);


  useEffect(() => {
    const unsubscribe = todoRef.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
      const todos = [];
      querySnapshot.forEach((doc) => {
        const { heading, valor, createdAt } = doc.data();
       todos.push({
          id: doc.id,
          heading,
          valor,
          createdAt,
        }); 
      });
      setTodos(todos);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    calcularTotalDespesas();
  }, [todos]);

  const calcularTotalDespesas = () => {
    const despesasUltimos30Dias = todos.filter((item) => {
      const dataAtual = moment();
      const dataDespesa = moment(item.createdAt?.toDate());
      return dataDespesa && dataAtual.diff(dataDespesa, 'days') <= 30;
    });

    const total = despesasUltimos30Dias.reduce((acc, item) => {
      return acc + parseFloat(item.valor.replace('R$', '').replace(',', ''));
    }, 0);

    setTotalDespesas(total);
  };

  const filtrarPorMes = () => {
    if (selectedMonth === '') {
      return todos;
    } else {
      return todos.filter((item) => {
        const mesDaDespesa = moment(item.createdAt.toDate()).format('MMMM');
        return mesDaDespesa === selectedMonth;
      });
    }
  };

  const adicionarValor = () => {
     handleAddValor(valor, selectedCategory, todoRef, setValor, setSelectedCategory, setFormattedDates, Keyboard);
  };


  const handleInputChange = (text) => {
    const formattedValue = formatCurrency(text);
    setValor(`R$ ${formattedValue}`);
  };

  const toggleAddingExpense = () => {
    setIsAddingExpense(!isAddingExpense);
  };

  const closeExpenseForm = () => {
    setIsAddingExpense(false);
  };
 <Metricas formattedDates={formattedDates} />
  return (
    <View style={styles.container}>
      <Logo />

      {isAddingExpense && (
        <View style={styles.overlay}>
          <View style={styles.inputsDespesa}>
            <TextInput
              style={styles.input}
              placeholder="Adicione o valor da despesa:"
              keyboardType="numeric"
              value={valor}
              onChangeText={handleInputChange}
            />

            <RNPickerSelect
              placeholder={{ label: 'Selecione a categoria', value: '' }}
              items={[
                { label: 'Moradia', value: 'Moradia' },
                { label: 'Transporte', value: 'Transporte' },
                { label: 'Mercado', value: 'Mercado' },
                { label: 'Lazer', value: 'Lazer' },
                { label: 'Compras Online', value: 'Compras Online' },
                { label: 'Seguro', value: 'Seguro' },
                { label: 'Alimentação', value: 'Alimentação' },
                { label: 'Farmácia', value: 'Farmácia' },
                { label: 'Streaming', value: 'Streaming' },
                { label: 'Outros', value: 'Outros' },
              ]}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              style={pickerSelectStyles}
            />

            <TouchableOpacity style={styles.addDespesa} onPress={adicionarValor}>
              <Text style={styles.buttonText}>Adicione</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={closeExpenseForm}>
              <FontAwesomeIcon name="times-circle" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.linhaAdc}>
        <RNPickerSelect
          placeholder={{ label: 'Filtrar por mês', value: '' }}
          items={[
            { label: 'Janeiro', value: 'Janeiro' },
            { label: 'Fevereiro', value: 'Fevereiro' },
            { label: 'Março', value: 'Março' },
            { label: 'Abril', value: 'Abril' },
            { label: 'Maio', value: 'Maio' },
            { label: 'Junho', value: 'Junho' },
            { label: 'Julho', value: 'Julho' },
            { label: 'Agosto', value: 'Agosto' },
            { label: 'Setembro', value: 'Setembro' },
            { label: 'Outubro', value: 'Outubro' },
            { label: 'Novembro', value: 'Novembro' },
            { label: 'Dezembro', value: 'Dezembro' },
          ]}
          onValueChange={(itemValue) => setSelectedMonth(itemValue)}
          style={{ ...pickerSelectStylesMonth }}
        />
        <TouchableOpacity style={styles.addButton} onPress={toggleAddingExpense}>
          <FontAwesomeIcon
            name={isAddingExpense ? 'times-circle' : 'plus-circle'}
            size={30}
            color="white"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.listDespesas}>
        <FlatList
          data={filtrarPorMes()}
          numColumns={1}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
    <Despesa
      item={item}
      onCategorySelected={(category) => {
        setSelectedCategory(category);
      }}
      onDateSelected={(date) => {
      
        setFormattedDates((prevDates) => [
          ...prevDates,
          { date, item }, 
        ]);
      }}
    />
  )}
/>
        <View style={styles.separator} />
        <Text style={styles.totalDespesasText}>
          Total (últimos 30 dias): R$ {totalDespesas.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}
const pickerSelectStyles = StyleSheet.create({
  input: {},
  inputIOS: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,

    marginBottom: 10,
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

    marginBottom: 10,
    borderWidth: 1,
    padding: 5,
    color: 'black',
    backgroundColor: 'white',
  },
});

const pickerSelectStylesMonth = StyleSheet.create({
  input: {},
  inputIOS: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,

    marginTop: 20,
    marginBottom: 10,
    borderWidth: 1,
    padding: 5,
    color: 'white',
    backgroundColor: 'transparent',
  },
  inputAndroid: {
    width: 163,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 20,
    marginBottom: 10,
    borderWidth: 1,
    padding: 5,
    color: 'white',
    backgroundColor: 'transparent',
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#210054',
    color: 'white',
    paddingTop: 20, // Adicione um padding superior
  },

  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  listDespesas: {
    backgroundColor: '#DCDCDC',
    borderRadius: 10,
    marginBottom: 15,
    width: '90%',
    flex: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Apenas para Android
  },
  separator: {
    borderBottomColor: '#A9A9A9',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  totalDespesasText: {
    color: 'black',
    fontSize: 13,

    textAlign: 'center',
    fontWeight: 'bold',

    padding: 10,
    paddingTop: 0,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'white',
    borderBottomWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 5,
    color: 'white',
    backgroundColor: 'transparent',
  },

  addButton: {
    borderRadius: 50,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    marginLeft: 100,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  addDespesa: {
    borderRadius: 10,
    width: '50%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'purple',
    color: 'white',
  },

  linhaAdc: {
    flexDirection: 'row',
  },

  closeButton: {
    borderRadius: 50,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    marginTop: 30,
  },

  inputsDespesa: {
    backgroundColor: '#210054',
    alignItems: 'center',
    padding: 30,
    borderRadius: 10,
    width: 300, // Ajuste conforme necessário
  },
});
