import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const TextEditor = ({ menuOption, onTextSave, onClose }) => {
  // Estado local para armazenar o texto
  const [text, setText] = useState('');
  // Estado local para armazenar mensagens de erro
  const [error, setError] = useState('');

  // Manipulador para salvar o texto
  const handleSave = () => {
    // Verifica se o texto está vazio
    if (text.trim() === '') {
      setError(`Insira ${menuOption}`);
    } else {
      setError(''); // Limpa mensagens de erro
      onTextSave(menuOption, text); // Chama a função de salvar texto
      onClose(); // Fecha o modal
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <View style={styles.modalContainer}>
        <View style={styles.buttonOptions}>
          {/* Título do modal */}
          <Text style={styles.modalTitle}>{menuOption}</Text>

          {/* Input para inserir texto */}
          <TextInput
            style={styles.textInput}
            placeholder="Digite seu texto"
            value={text}
            onChangeText={(text) => {
              setText(text);
              setError('');
            }}
          />

          {/* Exibe a mensagem de erro, se houver */}
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}

          {/* Botões de salvar e fechar */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={onClose}>
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Estilos do componente
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    width: '75%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  backButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  buttonOptions: {
    backgroundColor: '#f0abff',
    borderRadius: 8,
    width: 250,
    height: 180,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default TextEditor;
