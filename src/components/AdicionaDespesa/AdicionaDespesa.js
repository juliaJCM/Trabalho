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
import { firebase } from '../../firebase/config';
import RNPickerSelect from 'react-native-picker-select';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importe o Ionicons
import { handleAddValor } from '../Funcoes/Funcoes';
import Button from '../button';

moment.locale('pt-br');

const todoRef = firebase.firestore().collection('despesas');

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

const GerenciarDespesas = () => {
  const [todos, setTodos] = useState([]);
  const [valor, setValor] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [monthlyTotalDespesas, setMonthlyTotalDespesas] = useState({});
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [formattedDates, setFormattedDates] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [availableDays, setAvailableDays] = useState([]);

  useEffect(() => {
    const unsubscribe = todoRef.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
      const todos = [];
      querySnapshot.forEach((doc) => {
        const { heading, valor, createdAt, icon } = doc.data();
        todos.push({
          id: doc.id,
          heading,
          valor,
          createdAt,
          icon,
        });
      });
      setTodos(todos);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    calcularTotalDespesas();
  }, [todos, selectedMonth, selectedDay]);

  useEffect(() => {
    if (selectedMonth) {
      const daysInMonth = moment().month(selectedMonth).daysInMonth();
      const daysArray = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
      setAvailableDays(daysArray);
    } else {
      setAvailableDays([]);
    }
  }, [selectedMonth]);

  const calcularTotalDespesas = () => {
    const despesasFiltradas = filtrarPorMes();

    const total = despesasFiltradas.reduce((acc, item) => {
      return acc + parseFloat(item.valor.replace('R$', '').replace(',', ''));
    }, 0);

    setMonthlyTotalDespesas({ total });
  };

  const filtrarPorDia = (despesas, selectedMonth, selectedDay) => {
    if (!selectedDay) {
      return despesas;
    }

    return despesas.filter((item) => {
      const diaDaDespesa = moment(item.createdAt.toDate()).format('D');
      return diaDaDespesa === selectedDay;
    });
  };

  const filtrarPorMes = () => {
    const despesasFiltradasPorDia = filtrarPorDia(todos, selectedMonth, selectedDay);

    if (!selectedMonth) {
      const despesasUltimos30Dias = despesasFiltradasPorDia.filter((item) => {
        const dataAtual = moment();
        const dataDespesa = moment(item.createdAt?.toDate());
        const diasDiferenca = dataAtual.diff(dataDespesa, 'days');
        return dataDespesa && diasDiferenca <= 30;
      });

      return despesasUltimos30Dias;
    } else {
      return despesasFiltradasPorDia.filter((item) => {
        const mesDaDespesa = moment(item.createdAt.toDate()).format('MMMM');
        const normalizedMesDaDespesa = mesDaDespesa.toLowerCase();
        return normalizedMesDaDespesa === selectedMonth.toLowerCase();
      });
    }
  };

const adicionarValor = () => {
  // Mapeamento entre categorias e ícones
  const categoryIcons = {
    'Moradia': 'home',
    'Transporte': 'car',
    'Mercado': 'cart',
    'Lazer': 'football',
    'Compras Online': 'bag-check',
    'Seguro': 'shield-checkmark',
    'Alimentação': 'fast-food',
    'Farmácia': 'medkit',
    'Streaming': 'radio',
    'Outros': 'ellipsis-horizontal', // Adicione ícone padrão para 'Outros'
  };

  // Obtém o ícone correspondente à categoria selecionada
  const selectedIcon = categoryIcons[selectedCategory] || 'ellipsis-horizontal';

  // Chama a função handleAddValor com o ícone incluído
  handleAddValor(valor, selectedCategory, selectedIcon, todoRef, setValor, setSelectedCategory, setFormattedDates, Keyboard);
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

  return (
    <View style={styles.container}>
      <View style={styles.containerAdc}>
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

              <Button
                onPress={adicionarValor}
                buttonText="Adicione"
              />

              <TouchableOpacity style={styles.closeButton} onPress={closeExpenseForm}>
                <Ionicons name="times-circle" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <Button
          onPress={toggleAddingExpense}
          buttonText="Adicione"
        />

        <View style={styles.pickerContainer}>
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

          <RNPickerSelect
            placeholder={{ label: 'Filtrar por dia', value: '' }}
            items={[
              ...availableDays.map((day) => ({ label: day, value: day })),
            ]}
            onValueChange={(itemValue) => setSelectedDay(itemValue)}
            style={{ ...pickerSelectStylesMonth }}
          />
        </View>

        <View style={styles.listDespesa}>
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

          {Object.entries(monthlyTotalDespesas).map(([month, total]) => (
            <Text key={month} style={styles.totalDespesasText}>
              Total ({month}): R$ {total.toFixed(2)}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};
export default GerenciarDespesas;


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
    width: 150,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,

    marginTop: 20,
    marginBottom: 10,
    borderWidth: 1,
    padding: 5,
    color: 'black',
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

  containerAdc: {
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
  listDespesa:{
    flex:12,
    width: '100%'
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


  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },


  closeButton: {
    borderRadius: 50,
    backgroundColor: '#6052b7',
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
    width: 300, 
  },
  pickerContainer:{
    flexDirection:'row',
    alignContent:'center',
    alignItems: 'center,'
  }, 
   buttonContainer: {
    borderRadius: 10,
    flexDirection: 'row',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#6052b7',
  },
  buttonText: {
    flex: 12,
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
   
});
