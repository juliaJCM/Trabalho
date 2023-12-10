import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Bar } from 'react-native-pathjs-charts';
import { firebase } from '../../firebase/config';

const despesasCollection = firebase.firestore().collection('despesas');

export default function MetricasDespesas ({ selectedMonths }) {
  const [data, setData] = useState([]);
  const [somaPorMes, setSomaPorMes] = useState({});
  const [somaTotal, setSomaTotal] = useState(0);

  const getMonthName = (monthNumber) => {
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dez'
    ];
    return monthNames[monthNumber - 1];
  };

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const firstDayOfYear = new Date(currentYear, 0, 1);
    const lastDayOfYear = new Date(currentYear, 11, 31);

    let query = despesasCollection;

    if (selectedMonths === 'firstSixMonths') {
      query = query.where('createdAt', '>=', firstDayOfYear).where('createdAt', '<=', new Date(currentYear, 6, 1));
    } else if (selectedMonths === 'lastSixMonths') {
      query = query.where('createdAt', '>=', new Date(currentYear, 6, 1)).where('createdAt', '<=', lastDayOfYear);
    }

    if (selectedMonths === null) {
      selectedMonths = 'lastSixMonths';
    }

    query.get().then((querySnapshot) => {
      const despesasData = [];

      querySnapshot.forEach((doc) => {
        const despesa = doc.data();
        despesasData.push(despesa);
      });

      const somaPorMesTemp = {};
      despesasData.forEach((despesa) => {
        const data = new Date(despesa.createdAt.toDate());
        const mes = data.getMonth() + 1;
        const valor = parseFloat(despesa.valor.replace('R$ ', '').replace(',', '.'));

        if (!somaPorMesTemp[mes]) {
          somaPorMesTemp[mes] = 0;
        }

        somaPorMesTemp[mes] += valor;
      });

      const total = Object.values(somaPorMesTemp).reduce((acc, curr) => acc + curr, 0);
      setSomaTotal(total);
      setSomaPorMes(somaPorMesTemp);

      const meses = Object.keys(somaPorMesTemp);
      const valores = meses.map((mes) => somaPorMesTemp[mes]);

      const chartData = [
        valores.map((value, index) => ({
          v: value,
          name: getMonthName(parseInt(meses[index], 10)),
        })),
      ];

      setData(chartData);
    });
  }, [selectedMonths]);

  const options = {
    width: 200,
    height: 150,
    margin: {
      top: 20,
      left: 25,
      bottom: 30,
      right: 20
    },
    color: '#6052b7',
    gutter: 1,
    animate: {
      type: 'oneByOne',
      duration: 200,
      fillTransition: 3
    },
    axisX: {
      showAxis: true,
      showLines: false,
      showLabels: true,
      showTicks: false,
      zeroAxis: false,
      orient: 'bottom',
      label: {
        fontFamily: 'sans-serif',
        fontSize: 15,
        fontWeight: true,
        fill: '#6052b7',
      
      }
    },
    axisY: {
      showAxis: true,
      showLines: false,
      showLabels: true,
      showTicks: false,
      zeroAxis: false,
      orient: 'left',
      label: {
        fontFamily: 'sans-serif',
        fontSize: 8,
        fontWeight: true,
        fill: '#6052b7'
      }
    }
  };

  const getMaxMonth = (monthsData) => {
    const maxMonth = Object.keys(monthsData).reduce((a, b) => monthsData[a] > monthsData[b] ? a : b);
    return maxMonth;
  };

  const getMinMonth = (monthsData) => {
    const minMonth = Object.keys(monthsData).reduce((a, b) => monthsData[a] < monthsData[b] ? a : b);
    return minMonth;
  };

  return (
    <View>
    
      {data.length === 0 ? (
        <Text style={styles.loadingText}>Carregando...</Text>
      ) : (
        <>
    
        <View style={styles.containerGrafico}>
       
          <View style={styles.chart}>
              <Bar data={data} options={options} accessorKey="v" />
          </View>
         
          <View style={styles.somasInfo} >
              <Text style={styles.somaTotal}>Total: R$ {somaTotal.toFixed(2)}</Text>
              <Text style={styles.mesMaisGasto}>
                Mais gasto: {getMonthName(parseInt(getMaxMonth(somaPorMes), 10))}
              </Text>
              <Text style={styles.mesMenosGasto}>
                Menos gasto: {getMonthName(parseInt(getMinMonth(somaPorMes), 10))}
              </Text>

              {Object.keys(somaPorMes).map((mes) => (
                <Text key={mes} style={styles.somaPorMes}><Text style={styles.mesName}> {getMonthName(parseInt(mes, 10))}:</Text>
                  R$ {somaPorMes[mes].toFixed(2)}
                </Text>
              ))}
          </View>
        </View>
          
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chart: {
    marginTop: 50,
  },
  loadingText: {
    fontSize: 12,
    marginVertical: 10,
    color: '#6052b7',
  },
  somaTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#6052b7',
    flexDirection: 'column'
  },
  mesName: {
    fontWeight: 'bold',
    fontSize: 10,
  }, 
  somasInfo: {
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    marginLeft: -20,
    fontSize: 10,
  },
  somaPorMes: {
    marginVertical: 5,
    color: '#000',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    fontSize: 10,
  },  
  mesMaisGasto: {
    fontSize: 11,
  },
  mesMenosGasto: {
    fontSize: 11,
  },
   containerGrafico:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10, 
    padding: 15, 
    marginTop: 20, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
   }
});


