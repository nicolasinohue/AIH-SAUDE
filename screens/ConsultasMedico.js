import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const mockConsultas = [
  { id: '1', paciente: 'João Santos', data: '2024-05-20', hora: '10:00' },
  { id: '2', paciente: 'Maria Silva', data: '2024-05-21', hora: '11:00' },
];

function ConsultasMedico() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consultas Atribuídas:</Text>
      <FlatList
        data={mockConsultas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.consultaItem}>
            <Text>Paciente: {item.paciente}</Text>
            <Text>Data: {item.data}</Text>
            <Text>Hora: {item.hora}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#cfe1e2',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  consultaItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
});

export default ConsultasMedico;
