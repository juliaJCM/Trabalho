import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { firebase } from '../../firebase/config';

const metasCollection = firebase.firestore().collection('metas');

const MetricasMetas = () => {
  const [completeMetas, setCompleteMetas] = useState([]);
  const [incompleteMetas, setIncompleteMetas] = useState([]);

  useEffect(() => {
    let query = metasCollection;
    query.get().then((querySnapshot) => {
      const completedMetasArray = [];
      const incompleteMetasArray = [];

      querySnapshot.forEach((doc) => {
        const meta = doc.data();

        if (meta.completed === true) {
          completedMetasArray.push(meta);
        } else {
          incompleteMetasArray.push(meta);
        }
      });

      setCompleteMetas(completedMetasArray);
      setIncompleteMetas(incompleteMetasArray);
    });
  }, []);

  const getChartData = () => {
    const totalMetas = completeMetas.length + incompleteMetas.length;
    const completedPercentage = (completeMetas.length / totalMetas) * 100;
    const incompletePercentage = (incompleteMetas.length / totalMetas) * 100;

    return [
      {
        name: 'Concluídas',
        population: completedPercentage,
        color: '#6052b7',
        legendFontColor: 'black', 
      },
      {
        name: 'Não Concluídas',
        population: incompletePercentage,
        color: '#4C4192',
        legendFontColor: 'black',
      },
    ];
  };

  const options = {
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <View>
      <View style={styles.metaInfoContainer}>
      <View>
      <Text>Metricas Metas</Text>
      </View>

        <PieChart
          data={getChartData()}
          width={300}
          height={200}
          chartConfig={options}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      </View>
      <View style={styles.doughnutCenter}>
        <Text style={styles.somaTotalText}>
          {completeMetas.length + incompleteMetas.length}  Metas
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  metaInfoContainer: {
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
    width: 370,
  },
  doughnutCenter: {
    alignItems: 'center',
    marginTop: 10,
  },
  somaTotalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
   doughnutCenter: {
    position: 'absolute',
    top: '35%', // Ajuste a posição vertical conforme necessário
    left: '17%', // Ajuste a posição horizontal conforme necessário
    width: '33%', // Ajuste o tamanho do círculo branco conforme necessário
    height: '45%',
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
});

export default MetricasMetas;
