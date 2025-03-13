import React, { useState, useEffect } from 'react';
import { View, Button, Text, FlatList, Alert } from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';

const BluetoothPrint = () => {
  const [deviceList, setDeviceList] = useState([]);
  const [connected, setConnected] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    // Bluetooth'u etkinleştir ve cihazları listele
    BluetoothSerial.enable()
      .then(() => {
        BluetoothSerial.list()
          .then(devices => {
            setDeviceList(devices);
          })
          .catch(err => console.error(err));
      })
      .catch(err => {
        Alert.alert('Bluetooth etkinleştirilemedi', err.message);
      });
  }, []);

  const connectToDevice = async (deviceId) => {
    try {
      await BluetoothSerial.connect(deviceId);
      setConnected(true);
      setSelectedDevice(deviceId);
      Alert.alert('Bağlantı başarılı!', `Cihaza bağlandınız: ${deviceId}`);
    } catch (error) {
      console.error('Bağlantı hatası:', error);
      Alert.alert('Bağlantı hatası', error.message);
    }
  };

  const sendPrintData = async () => {
    if (connected && selectedDevice) {
      const data = 'Merhaba, bu bir test baskısıdır!';
      await BluetoothSerial.write(data)
        .then(() => {
          Alert.alert('Başarılı', 'Veri başarıyla gönderildi');
        })
        .catch((err) => {
          Alert.alert('Hata', 'Yazdırma işlemi başarısız oldu.');
        });
    } else {
      Alert.alert('Hata', 'Lütfen önce bir yazıcıya bağlanın.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Bluetooth Cihazları:</Text>
      <FlatList
        data={deviceList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Button
            title={`Bağlan ${item.name}`}
            onPress={() => connectToDevice(item.id)}
          />
        )}
      />
      <Button title="Yazıcıya Veri Gönder" onPress={sendPrintData} />
    </View>
  );
};

export default BluetoothPrint;



// const BluetoothPrint = () => {
//   const [deviceList, setDeviceList] = useState([]);
//   const [connected, setConnected] = useState(false);
//   const [selectedDevice, setSelectedDevice] = useState(null);

//   useEffect(() => {
//     BluetoothSerial.enable()
//       .then(() => BluetoothSerial.list())
//       .then(devices => setDeviceList(devices))
//       .catch(err => Alert.alert('Bluetooth Error', err.message));
//   }, []);

//   const connectToDevice = async (deviceId) => {
//     try {
//       await BluetoothSerial.connect(deviceId);
//       setConnected(true);
//       setSelectedDevice(deviceId);
//     } catch (error) {
//       Alert.alert('Connection Error', error.message); // Daha iyi hata yönetimi
//     }
//   };

//   const sendPrintData = async () => {
//     if (connected && selectedDevice) {
//       const data = 'Merhaba, bu bir test baskısıdır!';
//       try {
//         await BluetoothSerial.write(data);
//         Alert.alert('Başarılı', 'Veri yazıcıya başarıyla gönderildi.');
//       } catch (error) {
//         Alert.alert('Gönderim Hatası', error.message);
//       }
//     } else {
//       Alert.alert('Bağlantı Hatası', 'Yazıcıya bağlanın lütfen');
//     }
//   };

//   return (
//     <View>
//       <Text>Bluetooth Cihazları:</Text>
//       {deviceList.map(device => (
//         <Button
//           key={device.id}
//           title={`Bağlan ${device.name}`}
//           onPress={() => connectToDevice(device.id)}
//         />
//       ))}
//       <Button title="Yazıcıya Gönder" onPress={sendPrintData} />
//     </View>
//   );
// };

