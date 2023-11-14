import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Linking, StyleSheet, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';

const LinkInput = ({ menuOption, onClose, onSave }) => {
  const [link, setLink] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  

  useEffect(() => {
    // Focar no campo de texto ao montar o componente
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleOpenLink = () => {
    if (link) {
      const formattedLink = link.startsWith('http://') || link.startsWith('https://') ? link : `http://${link}`;
      Linking.openURL(formattedLink)
        .catch((error) => {
          console.error(`Erro ao abrir o link: ${error}`);
        });
    }
  };

  const handleSaveLink = () => {
    if (isValidLink(link)) {
      setError('');
      const formattedLink = `${link.substring(0, 20)}\n${link.substring(20, 50)}`;
      onSave( formattedLink);
      setLink('');
    } else {
      setError('Insira um link válido');
    }
  };
 

  const isValidLink = (inputLink) => {
    const pattern = /^(https?:\/\/).+/i;
    return pattern.test(inputLink);
  };

  return (
        <View style={styles.modalContainer}>
          <View style={styles.buttonOptions}>
            <Text style={styles.modalTitle}>{menuOption}</Text>
            <TextInput
              style={styles.input}
              ref={inputRef} // Referência para o campo de texto
              placeholder="Insira o link aqui"
              value={link}
              onChangeText={(text) => {
                setLink(text);
                setError('');
              }}
            />
            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : null}
            <TouchableOpacity style={styles.button} onPress={handleOpenLink}>
              <Text style={styles.buttonText}>Abrir Link</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveLink}>
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.backButton} onPress={onClose}>
                <Text style={styles.buttonText}>Voltar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
 
  );
};

const styles = StyleSheet.create({
  buttonOptions: {
    backgroundColor: 'rgba(185, 255, 241, 0.7)',
    borderRadius: 8,
    width: 300,
    marginBottom: 15,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LinkInput;
