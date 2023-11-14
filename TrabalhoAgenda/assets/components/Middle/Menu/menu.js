import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextEditor from './TextEditor';
import LinkInput from './LinkInput';
import FeriadosAnoScreen from './FeriadosAnoScreen';

const Menu = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [menuOption, setMenuOption] = useState(null);
  const [isTextEditorVisible, setIsTextEditorVisible] = useState(false);
  const [isLinkInputVisible, setIsLinkInputVisible] = useState(false);
  const [textData, setTextData] = useState({});
  const [completedTexts, setCompletedTexts] = useState({});
  const [showIcons, setShowIcons] = useState({});
  

  const handleDeleteCompletedText = (key) => {
    const newCompletedTexts = { ...completedTexts };
    delete newCompletedTexts[key];
    setCompletedTexts(newCompletedTexts);
  };

  const handleCloseModal = () => {
    setIsMenuVisible(false);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    const newShowIcons = { ...showIcons };
    options.forEach((opt) => {
      newShowIcons[opt.label] = opt.label === option;
    });
    setShowIcons(newShowIcons);
  };

  const handleIconClick = (option) => {
    setMenuOption(option.label || option);
    setIsMenuVisible(true);
  };

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

  const handleTextSave = (option, text) => {
    const newTextData = { ...textData };
    if (!newTextData[option]) {
      newTextData[option] = [];
    }
    newTextData[option].push(text);
    setTextData(newTextData);
    setIsTextEditorVisible(false);
  };

  const handleDeleteText = (option, index) => {
    const newTextData = { ...textData };
    newTextData[option].splice(index, 1);
    setTextData(newTextData);
  };

  const handleCompleteText = (option, index) => {
    const textToMove = textData[option][index];
    handleDeleteText(option, index);
    if (option !== 'Concluídos') {
      setCompletedTexts({ ...completedTexts, [new Date().toISOString()]: { option, text: textToMove } });
    }
  };

  const handleOpenLink = (link) => {
    if (link) {
      Linking.openURL(link)
        .catch((error) => {
          console.error(`Erro ao abrir o link: ${error}`);
        });
    }
  };
  

  const options = [
    { label: 'Tópicos de Estudos', icon: 'plus' },
    { label: 'Materiais de Estudo', icon: 'plus' },
    { label: 'Objetivos', icon: 'plus' },
    { label: 'Concluídos' }, // Move "Concluídos" to a new line
    { label: 'Feriados' }, // Move "Feriados" to a new line
  ];

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.dropdownContainer}>
        <View style={styles.optionsRow}>
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
              {option.icon && showIcons[option.label] && (
                <TouchableOpacity onPress={() => handleIconClick(option)}>
                  <Icon name={option.icon} size={16} style={{ marginRight: 15 }} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.optionsRow}>
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
              {option.icon && showIcons[option.label] && (
                <TouchableOpacity onPress={() => handleIconClick(option)}>
                  <Icon name={option.icon} size={16} style={{ marginRight: 15 }} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {selectedOption && (
        <View style={{ marginTop: 20 }}>
          <Text >Você selecionou: {selectedOption}</Text>
        </View>
      )}

      {selectedOption === 'Feriados' && (
        <FeriadosAnoScreen />
      )}

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

      {isTextEditorVisible && (
        <TextEditor
          menuOption={menuOption}
          onTextSave={handleTextSave}
          onClose={() => setIsTextEditorVisible(false)}
        />
      )}

      <Modal
        visible={isLinkInputVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsLinkInputVisible(false)}
      >
        <LinkInput
          menuOption={menuOption}
          onClose={() => setIsLinkInputVisible(false)}
          onSave={(link) => handleTextSave(menuOption, link)}
        />
      </Modal>

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

function optionIsLink(option) {
  return option.startsWith('http://') || option.startsWith('https://');
}

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
