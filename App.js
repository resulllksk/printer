import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';  // Make sure this component exists
import BluetoothPrint from './BluetoothPrint';  // Import your BluetoothPrint component

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Home Screen' }} 
        />
        <Stack.Screen 
          name="BluetoothPrint" 
          component={BluetoothPrint} 
          options={{ title: 'Bluetooth Print' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
