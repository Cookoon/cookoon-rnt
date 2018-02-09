import { AppRegistry } from 'react-native';
import App from './src/screens/App';
import ErrorScreen from './src/screens/Error';
import AuthenticationScreen from './src/screens/Authentication';

AppRegistry.registerComponent('CookoonRNT', () => App);
AppRegistry.registerComponent('ErrorScreen', () => ErrorScreen);
AppRegistry.registerComponent(
  'AuthenticationScreen',
  () => AuthenticationScreen
);
