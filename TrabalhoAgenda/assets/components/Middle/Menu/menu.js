// Importa as bibliotecas e componentes necessários
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextEditor from './TextEditor';
import LinkInput from './LinkInput';
import FeriadosAnoScreen from './FeriadosAnoScreen';

// Componente funcional Menu
const Menu = () => {
  // Estados para gerenciar a exibição do menu e das modais
  const [selectedOption, setSelectedOption] = useState(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [menuOption, setMenuOption] = useState(null);
  const [isTextEditorVisible, setIsTextEditorVisible] = useState(false);
  const [isLinkInputVisible, setIsLinkInputVisible] = useState(false);
  const [textData, setTextData] = useState({});
  const [completedTexts, setCompletedTexts] = useState({});
  const [showIcons, setShowIcons] = useState({});

  // Função para deletar um texto concluído
  const handleDeleteCompletedText = (key) => {
    const newCompletedTexts = { ...completedTexts };
    delete newCompletedTexts[key];
    setCompletedTexts(newCompletedTexts);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setIsMenuVisible(false);
  };

  // Função para selecionar uma opção no menu
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    const newShowIcons = { ...showIcons };
    options.forEach((opt) => {
      newShowIcons[opt.label] = opt.label === option;
    });
    setShowIcons(newShowIcons);
  };

  // Função para lidar com o clique em um ícone
  const handleIconClick = (option) => {
    setMenuOption(option.label || option);
    setIsMenuVisible(true);
  };

  // Função para selecionar uma opção no menu modal
  const handleMenuOptionSelect = (menuOption) => {
    if (menuOption === 'Texto') {
      setIsTextEditorVisible(true);
    } else if (menuOption === 'Links') {
      setIsLinkInputVisible(true);
    } else {
      setIsMenuVisible(false);
      setSelectedOption(menuOption);
    }
  };

  // Função para salvar texto do TextEditor
  const handleTextSave = (option, text) => {
    const newTextData = { ...textData };
    if (!newTextData[option]) {
      newTextData[option] = [];
    }
    newTextData[option].push(text);
    setTextData(newTextData);
    setIsTextEditorVisible(false);
  };

  // Função para deletar texto de uma opção
  const handleDeleteText = (option, index) => {
    const newTextData = { ...textData };
    newTextData[option].splice(index, 1);
    setTextData(newTextData);
  };

  // Função para mover texto para "Concluídos"
  const handleCompleteText = (option, index) => {
    const textToMove = textData[option][index];
    handleDeleteText(option, index);
    if (option !== 'Concluídos') {
      setCompletedTexts({ ...completedTexts, [new Date().toISOString()]: { option, text: textToMove } });
    }
  };

  // Função para abrir um link
  const handleOpenLink = (link) => {
    if (link) {
      Linking.openURL(link)
        .catch((error) => {
          console.error(`Erro ao abrir o link: ${error}`);
        });
    }
  };

  // Opções do menu
  const options = [
    { label: 'Tópicos de Estudos', icon: 'plus' },
    { label: 'Materiais de Estudo', icon: 'plus' },
    { label: 'Objetivos', icon: 'plus' },
    { label: 'Concluídos' },
    { label: 'Feriados' }, 
  ];

  // Renderização do componente
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Renderiza as opções do menu em duas linhas */}
      <View style={styles.dropdownContainer}>
        {/* Primeira linha de opções do menu */}
        <View style={styles.optionsRow}>
          {/* Mapeia e exibe as primeiras três opções do menu */}
          {options.slice(0, 3).map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleOptionSelect(option.label || option)}
              style={[
                styles.option,
                option.label === selectedOption ? styles.selectedOption : null,
              ]}
            >
              <Text>{option.label || option}</Text>
              {/* Renderiza o ícone se disponível e se a opção estiver selecionada */}
              {option.icon && showIcons[option.label] && (
                <TouchableOpacity onPress={() => handleIconClick(option)}>
                  <Icon name={option.icon} size={16} style={{ marginRight: 15 }} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))}
        </View>
        {/* Segunda linha de opções do menu */}
        <View style={styles.optionsRow}>
          {/* Mapeia e exibe as opções restantes do menu */}
          {options.slice(3).map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleOptionSelect(option.label || option)}
              style={[
                styles.option,
                option.label === selectedOption ? styles.selectedOption : null,
              ]}
            >
              <Text>{option.label || option}</Text>
              {/* Renderiza o ícone se disponível e se a opção estiver selecionada */}
              {option.icon && showIcons[option.label] && (
                <TouchableOpacity onPress={() => handleIconClick(option)}>
                  <Icon name={option.icon} size={16} style={{ marginRight: 15 }} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* Exibe a opção selecionada */}
      {selectedOption && (
        <View style={{ marginTop: 20 }}>
          <Text >Você selecionou: {selectedOption}</Text>
        </View>
      )}
  
      {/* Renderiza o componente FeriadosAnoScreen quando a opção "Feriados" é selecionada */}
      {selectedOption === 'Feriados' && (
        <FeriadosAnoScreen />
      )}

      {/* Modal do menu */}
      <Modal
        visible={isMenuVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsMenuVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.buttonOptions}>
            <Text style={styles.modalTitle}>{selectedOption}</Text>
            <TouchableOpacity style={styles.modalOption} onPress={() => handleMenuOptionSelect('Texto')}>
              <Text>Texto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={() => handleMenuOptionSelect('Links')}>
              <Text>Links</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={handleCloseModal}>
              <Text>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal do TextEditor */}
      {isTextEditorVisible && (
        <TextEditor
          menuOption={menuOption}
          onTextSave={handleTextSave}
          onClose={() => setIsTextEditorVisible(false)}
        />
      )}

      {/* Modal do LinkInput */}
      {isLinkInputVisible && (
        <LinkInput
        menuOption={menuOption}
        onClose={() => setIsLinkInputVisible(false)}
        onSave={(link) => handleTextSave(menuOption, link)}
      />
      )}

      {/* Renderiza textos da opção selecionada, permitindo exclusão, marcação como concluído e abertura de links */}
      {selectedOption !== 'Concluídos' && textData[selectedOption] && textData[selectedOption].map((text, index) => (
        <View key={index} style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
          <Icon
            name="trash"
            size={16}
            style={{ marginRight: 15 }}
            onPress={() => handleDeleteText(selectedOption, index)}
          />
          <Icon
            name="check"
            size={16}
            style={{ marginRight: 15 }}
            onPress={() => handleCompleteText(selectedOption, index)}
          />
          {optionIsLink(text) && (
            <TouchableOpacity onPress={() => handleOpenLink(text)}>
              <Icon
                name="external-link"
                size={16}
              />
            </TouchableOpacity>
          )}
          <Text>
            <Text style={{ fontWeight: 'bold' }}>{selectedOption}: </Text> {text}
          </Text>
        </View>
      ))}

      {/* Renderiza textos concluídos, permitindo exclusão */}
      {selectedOption === 'Concluídos' && Object.keys(completedTexts).length > 0 && (
        <View style={{ marginTop: 20 }}>
          {Object.keys(completedTexts).map((key, index) => (
            <View key={key} style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
              <Icon
                name="trash"
                size={16}
                style={{ marginRight: 15 }}
                onPress={() => handleDeleteCompletedText(key)}
              />
              <Text>
              <Text style={{ fontWeight: 'bold' }}>{completedTexts[key].option}: </Text> {completedTexts[key].text}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

// Função auxiliar para verificar se uma opção é um link
function optionIsLink(option) {
  return option.startsWith('http://') || option.startsWith('https://');
}

// Estilos para o componente
const styles = StyleSheet.create({
  dropdownContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  optionsRow: {
    flexDirection: 'row',
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: 'lightblue',
  },
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
  modalOption: {
    padding: 15,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  buttonOptions: {
    backgroundColor: 'rgba(185, 255, 241, 0.7)',
    borderRadius: 8,
    width: 250,
    marginBottom: 15,
    alignItems: 'center',
  },
});

export default Menu;
