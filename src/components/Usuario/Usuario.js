import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { firebase } from '../../firebase/config';
import { addRendaFixa, addRendaVariavel, deleteTodo } from '../Funcoes';
import moment from 'moment';

const todoRef = firebase.firestore().collection('todos');

const formatCurrency = (value) => {
  let numericValue = value.replace(/[^0-9]/g, '');

  if (numericValue.length > 2) {
    numericValue = `${numericValue.slice(0, -2)}.${numericValue.slice(-2)}`;
  }

  const formattedValue = parseFloat(numericValue).toFixed(2);

  return formattedValue;
};

export default function Usuario() {
  const [rendaFixa, setRendaFixa] = useState('');
  const [rendaVariavel, setRendaVariavel] = useState([]);
  const [novaRendaVariavel, setNovaRendaVariavel] = useState('');
  const [descricaoRendaVariavel, setDescricaoRendaVariavel] = useState('');
  const [todos, setTodos] = useState([]);
  const [editingRendaFixa, setEditingRendaFixa] = useState(false);

  const handleEditRendaFixa = () => {
    setEditingRendaFixa(true);
  };

  const handleSaveRendaFixa = async () => {
    if (rendaFixa.trim() !== '') {
      try {
        if (editingRendaFixa) {
          // Editar renda fixa existente
          const rendaFixaData = todos.find((item) => item.tipo === 'rendaFixa');
          if (rendaFixaData) {
            await deleteTodo(rendaFixaData.id);
          }
        }
        await addRendaFixa(rendaFixa);
        setRendaFixa('');
        setEditingRendaFixa(false);
      } catch (error) {
        console.error('Error adding/editing fixed income:', error);
      }
    }
  };

  useEffect(() => {
    const loadDataFromFirebase = async () => {
      try {
        const querySnapshot = await todoRef.orderBy('timestamp', 'desc').get();
        const todosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTodos(todosData);
        setRendaVariavel(todosData.filter((item) => item.tipo === 'rendaVariavel'));

        const rendaFixaData = todosData.find((item) => item.tipo === 'rendaFixa');
        if (rendaFixaData) {
          setRendaFixa(rendaFixaData.valor.toString());
          setEditingRendaFixa(false);
        } else {
          setEditingRendaFixa(true);
        }
      } catch (error) {
        console.error('Error loading data from Firebase:', error);
      }
    };

    loadDataFromFirebase();
  }, []);

  const handleAddRendaFixa = async () => {
    if (rendaFixa.trim() !== '') {
      try {
        await addRendaFixa(rendaFixa);
        setRendaFixa('');
      } catch (error) {
        console.error('Error adding fixed income:', error);
      }
    }
  };


  const handleAddRendaVariavel = async () => {
    if (novaRendaVariavel.trim() !== '' && descricaoRendaVariavel.trim() !== '') {
      try {
        await addRendaVariavel(novaRendaVariavel, descricaoRendaVariavel);
        setRendaVariavel([
          ...rendaVariavel,
          { valor: parseFloat(novaRendaVariavel), descricao: descricaoRendaVariavel },
        ]);
        setNovaRendaVariavel('');
        setDescricaoRendaVariavel('');
      } catch (error) {
        console.error('Error adding variable income:', error);
      }
    }
  };

  const handleDeleteRenda = async (id) => {
    try {
      await deleteTodo(id);
      setRendaVariavel(rendaVariavel.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting income:', error);
    }
  };

  const handleInputChange = (text, isRendaFixa = true) => {
    const formattedValue = formatCurrency(text);
    isRendaFixa ? setRendaFixa(formattedValue) : setNovaRendaVariavel(formattedValue.replace('R$', ''));
  };


  return (
    <View style={styles.container}>
     <View style={styles.fundo}>
      <Image source={require('../../assets/usuario.png')} style={styles.avatar} />
      <Text style={styles.username}>Username</Text>

      {/* Renda Fixa */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Renda Fixa</Text>
        {editingRendaFixa ? (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputRendaFixa}
              placeholder="Digite o valor"
              keyboardType="numeric"
              value={rendaFixa}
              onChangeText={(text) => handleInputChange(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleSaveRendaFixa}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setEditingRendaFixa(true)}
          >
            <TextInput
              style={styles.inputRendaFixa}
              placeholder="Renda Fixa"
              keyboardType="numeric"
              editable={false}
              value={`R$ ${rendaFixa}`}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Renda Variável */}
      <View style={styles.sectionContainer}>
       
          <Text style={styles.sectionTitle}>Renda Variável</Text>
            <View style={styles.inputVariavel}>
              <View style={styles.inputContainer}>
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Digite o valor"
                    keyboardType="numeric"
                    value={novaRendaVariavel}
                    onChangeText={(text) => handleInputChange(text, false)}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Digite a descrição"
                    value={descricaoRendaVariavel}
                    onChangeText={(text) => setDescricaoRendaVariavel(text)}
                  />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleAddRendaVariavel}>
                  <Text style={styles.buttonText}>Adicionar</Text>
                </TouchableOpacity>
              </View>
              {/* Renda Variável adicionada */}
              <FlatList
              data={rendaVariavel}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <View key={index} style={styles.listItem}>
                  <View style={{ flex: 12 }}>
                    <Text style={styles.textVariavel}>{item.descricao}:</Text>
                  </View>
                  <View style={{ flex: 6 }}>
                    <Text style={styles.textVariavelMoney}>R$ {item.valor.toFixed(2)}</Text>
                    <TouchableOpacity onPress={() => handleDeleteRenda(item.id)}>
                      <Text style={{ color: 'red', fontSize: 14 }}>Excluir</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              />
            </View>
          </View>
        </View>
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#210054',
    paddingTop: 5,
   
  },
  avatar: {
    width: 30,
    height: 30,
    marginTop: 5,
  },
  fundo:{
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
  username: {
    color: 'black',
    fontSize: 20,
  
  },
  sectionContainer: {
   
    width: '100%',
  },
  sectionTitle: {
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 5,
    color: 'black',
    backgroundColor: 'transparent',
      fontSize: 13,
  },
  inputRendaFixa: {
     width: '100%',
    height: 35,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 5,
    color: 'black',
    backgroundColor: 'transparent',
     fontSize: 13,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#6052b7',
    marginBottom: 10,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },
  listItem: {
    padding: 20,
    flexDirection: 'row',   
      borderBottomWidth: 1,
    borderBottomColor: '#ccc',
      
  },
  textVariavel: {
    fontWeight: 'bold',
    fontSize: 15,
 
   
  },
  textVariavelMoney:{
    color: 'green',
    fontSize: 15,
     fontWeight: 'bold',
  },
  inputContainer: {
     width: '100%',
    flexDirection: 'column',

    marginBottom: 10,
    marginRight: 20
  },
  inputVariavel:{
    flexDirection: 'column',
    color: 'black'
  }
});