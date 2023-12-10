import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { firebase } from '../../firebase/config';
import MetricasDespesas from './MetricasDespesas'; // Adjust the path based on your folder structure
import MetricasMetas from './MetricasMetas'; // Adjust the path based on your folder structure

const metas = firebase.firestore().collection('metas');

const Metricas = () => {
  const [selectedMonths, setSelectedMonths] = useState('lastSixMonths'); // Initialize with 'lastSixMonths'

  return (
    <View style={styles.container}>
      <View style={styles.fundo}>
        <View style={styles.select}>
          {/* Componente de seleção */}
         <RNPickerSelect
  style={pickerSelectStyles}
  onValueChange={(value) => setSelectedMonths(String(value))}
  items={[
    { label: '6 Primeiros Meses', value: 'firstSixMonths' },
    { label: '6 Últimos Meses', value: 'lastSixMonths' },
  ]}
  placeholder={{ label: 'Selecione os meses', value: null }}
/>

        </View>
        <View style={styles.containerGrafico}>
      
          <MetricasDespesas selectedMonths={selectedMonths} />

          <MetricasMetas />
        </View>
      </View>
    </View>
  );
};


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    width: 360,
    height: 50,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
   
    width: '90%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#210054',
    padding: 30,
  },

  containerGrafico:{
    flexDirection: 'column',
    alignContent:'center',
    alignItems: 'center'
  },
  select: {
    flex: 12,
    alignItems: 'center'
  },
});

export default Metricas;
