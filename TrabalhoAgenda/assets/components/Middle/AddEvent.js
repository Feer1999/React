import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';

const AddEvent = ({ date, visible, onClose, onSave }) => {
  // Estado local para armazenar o texto do evento
  const [eventText, setEventText] = useState('');

  // Manipulador para salvar o evento
  const handleSaveEvent = () => {
    onSave(date, eventText);
    setEventText(''); // Limpa o texto do evento após salvar
    onClose(); // Fecha o modal
  };

  // Converte a data para um objeto Date se for uma string
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  // Adiciona 1 ao dia da data
  dateObj.setDate(dateObj.getDate() + 1);

  // Formata a data no padrão brasileiro
  const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        {/* Texto indicando a data do evento */}
        <Text style={styles.dateText}>Novo evento para {formattedDate}</Text>

        {/* Input para digitar o evento */}
        <TextInput
          style={styles.input}
          placeholder="Digite o evento"
          value={eventText}
          onChangeText={text => setEventText(text)}
        />

        {/* Botões para salvar e voltar */}
        <View style={styles.buttonContainer}>
          <Button title="Salvar" onPress={handleSaveEvent} />
          <Button title="Voltar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '25%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '40%',
  },
});

export default AddEvent;
