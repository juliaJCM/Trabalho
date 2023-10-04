import { View, Text, StyleSheet } from 'react-native';

export default function Metricas() {
  return (
    <View style={styles.container}>
      <Text>Metricas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD700',
  },
});
