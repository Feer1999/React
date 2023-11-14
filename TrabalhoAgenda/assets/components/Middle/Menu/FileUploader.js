import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';

<FileUploader selectedMenuOption={selectedMenuOption} />

const FileUploader = ({ selectedMenuOption }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleSelectFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setSelectedFile(result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // Seleção de arquivo cancelada
      } else {
        throw err;
      }
    }
  };

  const handleUploadFile = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', {
        uri: selectedFile.uri,
        type: selectedFile.type,
        name: selectedFile.name,
      });

      try {
        // Substitua a URL abaixo pela URL do seu servidor de upload
        const response = await axios.post('URL_DO_SEU_SERVIDOR_DE_UPLOAD', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        // O upload foi bem-sucedido
        setUploadMessage('Upload bem-sucedido: ' + response.data);
      } catch (error) {
        // Trate erros de upload aqui
        setUploadMessage('Erro no upload: ' + error.message);
      }
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedMenuOption}</Text> {/* Título com o nome da opção */}
      <TouchableOpacity style={styles.selectButton} onPress={handleSelectFile}>
        <Text>Selecionar Arquivo</Text>
      </TouchableOpacity>
      {selectedFile && (
        <View style={styles.selectedFileContainer}>
          <Text>Arquivo Selecionado: {selectedFile.name}</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={handleUploadFile}>
            <Text>Upload</Text>
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.uploadMessage}>{uploadMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  selectedFileContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  uploadButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  uploadMessage: {
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default FileUploader;
