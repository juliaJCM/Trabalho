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

const formatCurrency = (value) => {
  let numericValue = value.replace(/[^0-9]/g, '');

  if (numericValue.length > 2) {
    numericValue = `${numericValue.slice(0, -2)}.${numericValue.slice(-2)}`;
  }

  const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return formattedValue;
};

export default function Usuario() {
  const [rendaFixa, setRendaFixa] = useState([]);
  const [rendaVariavel, setRendaVariavel] = useState([]);
  const [novaRendaVariavel, setNovaRendaVariavel] = useState('');
  const [descricaoRendaVariavel, setDescricaoRendaVariavel] = useState('');

  const handleAddRendaFixa = () => {
    if (rendaFixa.length === 0 && rendaFixa.trim() !== '') {
      setRendaFixa([{ valor: parseFloat(rendaFixa) }]);
    }
  };

const handleAddRendaVariavel = () => {
    if (novaRendaVariavel.trim() !== '' && descricaoRendaVariavel.trim() !== '') {
      setRendaVariavel([
        ...rendaVariavel,
        { valor: parseFloat(novaRendaVariavel), descricao: descricaoRendaVariavel },
      ]);
      setNovaRendaVariavel('');
      setDescricaoRendaVariavel('');
    }
  };


  const handleInputChange = (text, isRendaFixa = true) => {
    const formattedValue = formatCurrency(text);
    isRendaFixa ? setRendaFixa(`R$ ${formattedValue}`) : setNovaRendaVariavel(formattedValue);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/usuario.png')} style={styles.avatar} />
      <Text style={styles.username}>Username</Text>

      {/* Renda Fixa */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Renda Fixa</Text>
        <TextInput
          style={styles.inputRendaFixa}
          placeholder="Digite o valor"
          keyboardType="numeric"
          value={rendaFixa}
          onChangeText={(text) => handleInputChange(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddRendaFixa}>
          <Text style={styles.buttonText}>Adicionar Renda Fixa</Text>
        </TouchableOpacity>
      </View>

      {/* Renda Variável */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Renda Variável</Text>
        <View style={styles.inputVariavel}>
          <View style={styles.inputContainer}>
            <View >
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
          <View style={styles.variavelList}>
            {rendaVariavel.map((item, index) => (
            
                <View key={index} style={styles.listItem}>
                  <View style={{ flex:12 }}>
                    <Text style={styles.textVariavel}>{item.descricao}:</Text>
                  </View>
                  <View style={{ flex: 6}}>
                    <Text style={styles.textVariavelMoney}>R$ {item.valor.toFixed(2)}</Text>
                  </View>                                   
                </View>
              
              
              ))}
            </View>
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#210054',
    padding: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    marginTop: 30,
  },
  username: {
    color: 'white',
    fontSize: 20,
    marginVertical: 10,
  },
  sectionContainer: {
    marginTop: 20,
    width: '100%',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 5,
    color: 'white',
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
    color: 'white',
    backgroundColor: 'transparent',
     fontSize: 13,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'purple',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  
    borderRadius: 5,
    marginVertical: 5,
    flex: 12,

      
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
  variavelList:{
    flexDirection: 'column',
    width:'100%',
    backgroundColor: '#DCDCDC',
    borderRadius: 10,
  
    shadowColor: 'black',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
  },
  inputContainer: {
     width: '100%',
    flexDirection: 'column',

    marginBottom: 10,
    marginRight: 20
  },
  inputVariavel:{
    flexDirection: 'column',
  }
});
