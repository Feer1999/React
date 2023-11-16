import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { format } from 'date-fns'; // Importe a função de formatação da biblioteca date-fns

const FeriadosAnoScreen = ({ onClose }) => {
  const [ano, setAno] = useState('2023'); // O ano padrão é 2023
  const [feriados, setFeriados] = useState([]);

  const getFeriados = async () => {
    try {
      const response = await axios.get(
        `https://brasilapi.com.br/api/feriados/v1/${ano}`
      );
  
      // Adicionar um dia a cada data
      const feriadosComAjuste = response.data.map((feriado) => {
        const eventDate = new Date(feriado.date);
        eventDate.setDate(eventDate.getDate() + 1);
        return { ...feriado, date: eventDate.toISOString().split('T')[0] };
      });
  
      setFeriados(feriadosComAjuste);
    } catch (error) {
      console.error('Erro ao buscar feriados:', error);
    }
  };
  

  useEffect(() => {
    getFeriados();
  }, [ano]);

  // Função para formatar a data no formato brasileiro
  const formatarDataBrasileira = (data) => {
    return format(new Date(data), 'dd/MM/yyyy');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feriados em {ano}</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o ano desejado"
        value={ano}
        onChangeText={(text) => setAno(text)}
        keyboardType="numeric"
      />
      <Button title="Buscar Feriados" onPress={getFeriados} />
      <FlatList
        data={feriados}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <Text>
          <Text style={{ fontWeight: 'bold' }}>{formatarDataBrasileira(item.date)}:</Text> {item.name}
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
});

export default FeriadosAnoScreen;
