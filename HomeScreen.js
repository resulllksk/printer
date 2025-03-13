import React from 'react';
import { View, Button, Text } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Ana Sayfa</Text>
      <Button
        title="Bluetooth Yazıcıya Git"
        onPress={() => navigation.navigate('BluetoothPrint')}
      />
    </View>
  );
};

export default HomeScreen;
