import React, { useState } from 'react';
import { View, Button, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { format, zonedTimeToUtc } from 'date-fns-tz';
import AddEvent from './AddEvent';
import Menu from './Menu/menu';

// Configuração de localização para português
LocaleConfig.locales['pt'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Agt', 'Set.', 'Out.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'],
  today: "Hoje"
};

LocaleConfig.defaultLocale = 'pt';

const CalendarApp = () => {
  // Estados do componente
  const [selected, setSelected] = useState(''); // Armazena a data selecionada no calendário
  const [isAddEventModalVisible, setAddEventModalVisible] = useState(false); // Controla a visibilidade do modal de adição de eventos
  const [events, setEvents] = useState({}); // Armazena os eventos marcados no calendário
  const [showEvents, setShowEvents] = useState(false); // Controla a visibilidade da lista de eventos

  // Manipulador de pressionar um dia no calendário
  const handleDayPress = day => {
    setSelected(day.dateString);
    setAddEventModalVisible(true);
  };

  // Manipulador para salvar um evento
  const handleSaveEvent = (date, eventText) => {
    const timeZone = 'America/Sao_Paulo';
    const adjustedDate = zonedTimeToUtc(date, timeZone);
    const markedDate = {};
    markedDate[adjustedDate.toISOString().slice(0, 10)] = {
      selected: true,
      disableTouchEvent: true,
      selectedDotColor: 'orange',
      eventText,
    };
    setEvents(prevEvents => ({
      ...prevEvents,
      ...markedDate,
    }));
    setAddEventModalVisible(false);
  };

  // Manipulador para excluir um evento
  const handleDeleteEvent = date => {
    const updatedEvents = { ...events };
    delete updatedEvents[date];
    setEvents(updatedEvents);
  };

  // Alternar visibilidade da lista de eventos
  const toggleEventList = () => {
    setShowEvents(!showEvents);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        {/* Componente de menu */}
        <Menu style={{ alignItems: 'relative' }}/>

        {/* Componente de calendário */}
        <Calendar
          style={{ width: 390 }}
          onDayPress={handleDayPress}
          markedDates={events}
          theme={{
            'stylesheet.calendar.header': {
              header: {
                backgroundColor: '#febfbf',
                alignItems: 'center'
              },
              monthText: {
                fontSize: 20,
                fontWeight: 'bold',
              },
              dayNamesShort: {
                fontWeight: 'bold',
              }
            },
          }}
        />

        {/* Botão para mostrar/ocultar eventos */}
        <View>
          <Button title="Eventos Marcados" onPress={toggleEventList} />
        </View>

        {/* Lista de eventos marcados */}
        {showEvents && (
          <View>
            {Object.entries(events).map(([date, eventData]) => {
              const eventDate = new Date(date);
              eventDate.setDate(eventDate.getDate() + 1);
              return (
                <View key={date}>
                  <Text>
                    <Text style={{ fontWeight: 'bold' }}>Data: </Text> {format(eventDate, 'dd/MM/yyyy')},{' '}
                    <Text style={{ fontWeight: 'bold' }}>Evento: </Text> {eventData.eventText}
                  </Text>
                  {/* Botão para excluir um evento */}
                  <TouchableOpacity onPress={() => handleDeleteEvent(date)}>
                    <Text style={{ color: 'red' }}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}

        {/* Componente para adicionar eventos */}
        <AddEvent
          date={selected}
          visible={isAddEventModalVisible}
          onClose={() => setAddEventModalVisible(false)}
          onSave={handleSaveEvent}
        />
      </View>
    </ScrollView>
  );
};

// Estilos do componente
const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default CalendarApp;
