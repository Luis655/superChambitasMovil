
import React, { useState, useEffect } from 'react';
import { View, Button, Alert, StyleSheet, FlatList, Text, Animated, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import FloatingSection, { jobData2 } from '../components/sectionModalMap';
import MapViewDirections from 'react-native-maps-directions'
import { Drawer, FAB  } from 'react-native-paper';
import { useAuth } from '../../auth/contextAuth';
import { useLocation } from '../../customHooks/useLocation';
const workerLogo = require('../../../assets/logoconosuperchambitas-removebg-preview.png')
const HomeWorker = ({type}) => {

  const { state, dispatch } = useAuth();
  const [active, setActive] = useState('');
 
  const [isActive, setIsActive] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [imageLoaded1, setImageLoaded1] = useState(false);
  const [imageLoaded2, setImageLoaded2] = useState(false);
  const {location} = useLocation()
  
  console.log(state.user)
  console.log(state.token)
  console.log(state.type)


  const iniciarRuta = (lat, lng) => {
    // console.log(lat, lng)
    // Lógica para obtener la posición (latitud y longitud) del marcador
    // Esto podría provenir de la geolocalización del dispositivo o cualquier otra fuente
    const newMarkerPosition = {
      latitude: lat,
      longitude: lng,
    };

    setMarkerPosition(newMarkerPosition);
  };
  
  // const [isChatModalVisible, setIsChatModalVisible] = useState(false);
  // const toggleChatModal = () => {
  //   setIsChatModalVisible(!isChatModalVisible);
  // };
  const [isFloatingSectionVisible, setIsFloatingSectionVisible] = useState(false);
  const toggleFloatingSection = () => {
    setIsFloatingSectionVisible(!isFloatingSectionVisible);
  };
  const activarTrabajo = (trabajo) => {
    Alert.alert(`${!isActive ? "Te mostraras como activo hacia los usuarios" : "Ya no seras visible para los usuarios"}`, '¿Aceptar?', [
      { text: 'Aceptar', onPress: () => {
        toggleFloatingSection()
        setIsActive(!isActive) } },
      { text: 'Cancelar', onPress: () => console.log('Cancelado'), style: 'cancel' },
    ]);
  };
  
  return (
    <View style={styles.container}>
      {location ? (
        <MapView style={styles.map} initialRegion={{ ...location, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }} >
          <Marker key={location} coordinate={location} title='Tu ubicación' description='Aquí estas' >
          <Image
          source={workerLogo}
          style={{ width: 60, height: 60, marginTop: imageLoaded1 ? 9 : 0 }} 
          onLoad={() => setImageLoaded1(true)}
        />          
        </Marker>
          {state.type == '2' && jobData2.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.latlng}
              title={marker.jobType}
              description={marker.address}
              //image={require('./persona.png')}
              style={{ width: 3, height: 3 }} // Ajusta el tamaño del marcador según tus necesidades
              image={workerLogo}
            />
          ))}
         {markerPosition && <MapViewDirections
            origin={location}
            destination={markerPosition}
            apikey=''  
            strokeWidth={3}
          />
         }
        {markerPosition && <Marker  coordinate={markerPosition}>
        <Image
          source={workerLogo}
          style={{ width: 60, height: 60, marginTop: imageLoaded2 ? 9 : 0 }}
          onLoad={() => setImageLoaded2(true)}
        />                              
        </Marker>
        }
        </MapView>
      ) : (<MapView style={styles.map} />
      )}

<FAB
    icon="plus"
    style={styles.fab}
    onPress={toggleFloatingSection}
    
  />
      {/*<TouchableOpacity style={styles.floatingButton} onPress={toggleFloatingSection}>
        <Text style={styles.floatingButtonText}>{ state.type == '1' ? 'Buscar chamba' : 'Ver más'}</Text>
      </TouchableOpacity>*/}
      <FloatingSection
        visible={isFloatingSectionVisible}
        onClose={toggleFloatingSection}
        isActive={isActive}
        onSearchJobs={() => {
          activarTrabajo()
        }}
        aceptarTrabajo={(lat, lng) => {
          iniciarRuta(lat, lng)
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    //right: 'auto',
    alignSelf: 'center',
    bottom: 20,
    backgroundColor: '#F5AF19'
  },
  container: {
    flex: 1,
    height:'100%'

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
    height: "100%"
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
