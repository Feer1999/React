import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const TextEditor = ({ menuOption, onTextSave, onClose }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (text.trim() === '') {
      setError(`Insira ${menuOption}`);
    } else {
      setError('');
      onTextSave(menuOption, text);
      onClose();
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <View style={styles.modalContainer}>
        <View style={styles.buttonOptions}>
        <Text style={styles.modalTitle}>{menuOption}</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Digite seu texto"
          value={text}
          onChangeText={(text) => {
            setText(text);
            setError('');
          }}
        />
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}
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
