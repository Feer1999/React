import { StyleSheet, View } from 'react-native';
import CalendarApp from './assets/components/Middle/index';

export default function App() {
  return (
      <CalendarApp/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
