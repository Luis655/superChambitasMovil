
import React, { useState, useEffect } from 'react';
import { View, Button, Alert, StyleSheet, FlatList, Text, Animated, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import FloatingSection, { jobData2 } from '../components/sectionModalMap';
import * as Location from 'expo-location';
import { PermissionsAndroid } from 'react-native';
import MapViewDirections from 'react-native-maps-directions'
import { Drawer, FAB  } from 'react-native-paper';
import { useAuth } from '../../auth/contextAuth';
const workerLogo = require('../../../assets/logoconosuperchambitas-removebg-preview.png')
const HomeWorker = ({type}) => {

  const { state, dispatch } = useAuth();
  const [active, setActive] = useState('');
  const [location, setLocation] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [imageLoaded1, setImageLoaded1] = useState(false);
  const [imageLoaded2, setImageLoaded2] = useState(false);

  const markers = [
    {
      title: "Plaza Grande",
      description: "Hermosa plaza en el centro de Mérida",
      latlng: {
        latitude: 20.967115,
        longitude: -89.624540
      }
    },
    {
      title: "Catedral de San Ildefonso",
      description: "Impresionante catedral en el corazón de Mérida",
      latlng: {
        latitude: 20.967522,
        longitude: -89.624362
      }
    },
    {
      title: "Paseo de Montejo",
      description: "Avenida famosa por su arquitectura y monumentos",
      latlng: {
        latitude: 20.998279,
        longitude: -89.616896
      },
    },
    {
      title: "Hacienda Teya",
      description: "Hermosa hacienda restaurante en Mérida",
      latlng: {
        latitude: 20.946212,
        longitude: -89.624259
      }
    },
    {
      title: "Gran Museo del Mundo Maya",
      description: "Museo dedicado a la cultura maya",
      latlng: {
        latitude: 21.012815,
        longitude: -89.609241
      }
    },
    {
      title: "Zoológico Animaya",
      description: "Zoológico en Mérida para toda la familia",
      latlng: {
        latitude: 20.988544,
        longitude: -89.639463
      }
    },
    {
      title: "Paseo Verde",
      description: "Parque con áreas verdes en Mérida",
      latlng: {
        latitude: 20.984653,
        longitude: -89.636006
      }
    },
    {
      title: "Museo Fernando García Ponce-Macay",
      description: "Museo de arte contemporáneo en Mérida",
      latlng: {
        latitude: 20.972809,
        longitude: -89.624515
      }
    },
    {
      title: "Hacienda Santa Cruz",
      description: "Hacienda restaurante en las afueras de Mérida",
      latlng: {
        latitude: 20.932241,
        longitude: -89.558464
      }
    },
    {
      title: "Plaza Altabrisa",
      description: "Centro comercial en Mérida",
      latlng: {
        latitude: 21.013978,
        longitude: -89.622282
      }
    },
    {
      title: "Parque de Las Américas",
      description: "Parque con actividades recreativas",
      latlng: {
        latitude: 20.999695,
        longitude: -89.634453
      }
    },
    {
      title: "Centro de Convenciones Siglo XXI",
      description: "Lugar para eventos y convenciones en Mérida",
      latlng: {
        latitude: 20.998374,
        longitude: -89.623304
      }
    },
    {
      title: "Paseo 60",
      description: "Zona de restaurantes y entretenimiento",
      latlng: {
        latitude: 20.967544,
        longitude: -89.629577
      }
    },
    {
      title: "Parque Zoológico del Centenario",
      description: "Zoológico en el Parque Centenario de Mérida",
      latlng: {
        latitude: 20.972979,
        longitude: -89.622817
      }
    },
    {
      title: "Museo de la Ciudad de Mérida",
      description: "Museo de historia local",
      latlng: {
        latitude: 20.970049,
        longitude: -89.621282
      }
    },
    {
      title: "Parque de Santa Lucía",
      description: "Parque en el centro de Mérida",
      latlng: {
        latitude: 20.971800,
        longitude: -89.625776
      }
    },
    {
      title: "Hacienda San José",
      description: "Hacienda hotel y restaurante",
      latlng: {
        latitude: 20.996849,
        longitude: -89.642686
      }
    },
    {
      title: "Casa Montejo",
      description: "Casa histórica en el centro de Mérida",
      latlng: {
        latitude: 20.971558,
        longitude: -89.624572
      }
    },
    {
      title: "Parque Centenario",
      description: "Parque con áreas verdes y monumentos",
      latlng: {
        latitude: 20.971119,
        longitude: -89.622399
      }
    }
  ];
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
    Alert.alert(`${!isActive ? "Te mostraras como activo hacia los usuarios" : "Ya no seras visible para los usuarios"}`, '¿Aceptar?', [
      { text: 'Aceptar', onPress: () => {
        toggleFloatingSection()
        setIsActive(!isActive) } },
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
      let location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      setLocation({ latitude, longitude });
    } catch (err) {
      console.warn("pito error " + err);
    }
  }
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
