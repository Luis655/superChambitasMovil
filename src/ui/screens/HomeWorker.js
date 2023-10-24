
import React, { useState, useEffect } from 'react';
import { View, Button, Alert, StyleSheet, FlatList, Text, Animated, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import FloatingSection from '../components/sectionModalMap';
import * as Location from 'expo-location';
import { PermissionsAndroid } from 'react-native';



const HomeWorker = () => {


  const [location, setLocation] = useState(null);

  useEffect(() => {
    requestLocationPermission()

  }, []);
  const [isChatModalVisible, setIsChatModalVisible] = useState(false);

  const toggleChatModal = () => {
    setIsChatModalVisible(!isChatModalVisible);
  };
  const [isFloatingSectionVisible, setIsFloatingSectionVisible] = useState(false);

  const toggleFloatingSection = () => {
    setIsFloatingSectionVisible(!isFloatingSectionVisible);
  };
  const [trabajos, setTrabajos] = useState(['Trabajo 1', 'Trabajo 2', 'Trabajo 3']);
  const [scrollY] = useState(new Animated.Value(0));

  const buscarTrabajo = () => {

    Alert.alert('Buscando trabajo....');
  };

  const seleccionarTrabajo = (trabajo) => {
    Alert.alert(`Has seleccionado ${trabajo}`, '¿Aceptar?', [
      { text: 'Aceptar', onPress: () => console.log('Trabajo aceptado') },
      { text: 'Cancelar', onPress: () => console.log('Trabajo rechazado'), style: 'cancel' },
    ]);
  };

  const activarTrabajo = (trabajo) => {
    Alert.alert(`Te mostraras como activo hacia los usuarios`, '¿Aceptar?', [
      { text: 'Aceptar', onPress: () => console.log('Activado') },
      { text: 'Cancelar', onPress: () => console.log('Cancelado'), style: 'cancel' },
    ]);
  };

  const cargarMasTrabajos = () => {
    const nuevosTrabajos = ['Nuevo Trabajo 1', 'Nuevo Trabajo 2', 'Nuevo Trabajo 3'];
    setTrabajos([...trabajos, ...nuevosTrabajos]);
  };
  const cardData = {
    name: 'Juan Pérez',
    jobType: 'Plomero',
    price: '$50',
    imageUri: 'https://1.bp.blogspot.com/_EZ16vWYvHHg/S7ipNUpJfzI/AAAAAAAAJnA/OvBcbs5fPP8/s1600/www.BancodeImagenesGratuitas.com-Jirafas-1000x-1.jpg',
    address: '123 Calle Principal, Ciudad',
    description: 'Reparación de tuberías y grifos en el baño.',
  };


  async function requestLocationPermission() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permiso para acceder a la ubicación denegado');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("hola" + " " + location);
      const { latitude, longitude } = location.coords;
      setLocation({ latitude, longitude });
    } catch (err) {
      console.warn("pito error " + err);
    }
  }

  return (
    <View style={styles.container}>
      {location ? (
        <MapView style={styles.map} initialRegion={{ ...location, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}>
          <Marker coordinate={location} />
        </MapView>
      ) : (<MapView style={styles.map} />
      )}
      <TouchableOpacity style={styles.floatingButton} onPress={toggleFloatingSection}>
        <Text style={styles.floatingButtonText}>Buscar chamba</Text>
      </TouchableOpacity>
      <FloatingSection
        visible={isFloatingSectionVisible}
        onClose={toggleFloatingSection}
        onSearchJobs={() => {

          activarTrabajo()
        }}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 30,
    marginLeft: 50,
    width: '70%'
  },
  floatingButtonText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 20,
  },
  map: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
});

export default HomeWorker;



/*import React from 'react';
import { View, Text } from 'react-native';
import Card from '../components/Card'; // Asegúrate de importar el componente Card desde la ubicación correcta
import foto from './persona.png'
const App = () => {
  // Datos de ejemplo para el componente Card
  const cardData = {
    name: 'Juan Pérez',
    jobType: 'Plomero',
    price: '$50',
    imageUri: 'https://1.bp.blogspot.com/_EZ16vWYvHHg/S7ipNUpJfzI/AAAAAAAAJnA/OvBcbs5fPP8/s1600/www.BancodeImagenesGratuitas.com-Jirafas-1000x-1.jpg',
    address: '123 Calle Principal, Ciudad',
    description: 'Reparación de tuberías y grifos en el baño.',
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Card {...cardData} />
    </View>
  );
};

export default App;
*/