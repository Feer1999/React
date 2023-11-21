import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { format } from 'date-fns'; // Importa a função de formatação da biblioteca date-fns

// Componente funcional FeriadosAnoScreen
const FeriadosAnoScreen = ({ onClose }) => {
  // Estados para gerenciar o ano e a lista de feriados
  const [ano, setAno] = useState('2023'); // O ano padrão é 2023
  const [feriados, setFeriados] = useState([]);

  // Função assíncrona para obter a lista de feriados do ano
  const getFeriados = async () => {
    try {
      // Chama a API para obter os feriados do ano especificado
      const response = await axios.get(
        `https://brasilapi.com.br/api/feriados/v1/${ano}`
      );
  
      // Adiciona um dia a cada data para ajustar a exibição
      const feriadosComAjuste = response.data.map((feriado) => {
        const eventDate = new Date(feriado.date);
        eventDate.setDate(eventDate.getDate() + 1);
        return { ...feriado, date: eventDate.toISOString().split('T')[0] };
      });
  
      // Define a lista de feriados no estado
      setFeriados(feriadosComAjuste);
    } catch (error) {
      console.error('Erro ao buscar feriados:', error);
    }
  };
  
  // Efeito para chamar a função de obter feriados quando o ano é alterado
  useEffect(() => {
    getFeriados();
  }, [ano]);

  // Função para formatar a data no formato brasileiro
  const formatarDataBrasileira = (data) => {
    return format(new Date(data), 'dd/MM/yyyy');
  };

  // Renderização do componente
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feriados em {ano}</Text>
      {/* Campo de entrada para o ano desejado */}
      <TextInput
        style={styles.input}
        placeholder="Digite o ano desejado"
        value={ano}
        onChangeText={(text) => setAno(text)}
        keyboardType="numeric"
      />
      {/* Botão para buscar os feriados */}
      <Button title="Buscar Feriados" onPress={getFeriados} />
      {/* Lista de feriados exibida com FlatList */}
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

// Estilos para o componente
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
