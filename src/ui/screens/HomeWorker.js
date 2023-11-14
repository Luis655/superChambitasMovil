
import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet, FlatList, Text, Animated, TouchableOpacity, Image, PanResponder } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import FloatingSection, { jobData2 } from '../components/sectionModalMap';
import MapViewDirections from 'react-native-maps-directions'
import { Drawer, FAB, Button  } from 'react-native-paper';
import { useAuth } from '../../auth/contextAuth';
import { useLocation } from '../../customHooks/useLocation';
import Icon from 'react-native-vector-icons/FontAwesome';

const workerLogo = require('../../../assets/logoconosuperchambitas-removebg-preview.png')

const menuWidth = 250;
const hiddenPosition = -menuWidth - 50;
const HomeWorker = ({type}) => {

  const { state, dispatch } = useAuth();
  const [active, setActive] = useState('');
 
  const [isActive, setIsActive] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [imageLoaded1, setImageLoaded1] = useState(false);
  const [imageLoaded2, setImageLoaded2] = useState(false);
  const { location, status, errorMsg, requestLocationPermission } = useLocation();
  
  // console.log(state.user)
  // console.log(state.token)
  // console.log(state.type)


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
  



  //MENU 

  const [pan] = useState(new Animated.ValueXY({ x: hiddenPosition, y: 0 }));
  const [isOpen, setIsOpen] = useState(false);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      if ((gestureState.dx > 0 && pan.x._value.x >= hiddenPosition) || (gestureState.dx < 0 && pan.x._value.x <= 0)) {
        pan.setValue({ x: gestureState.dx, y: 0 });
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > 50) {
        openDrawer();
      } else if (gestureState.dx < -50) {
        closeDrawer();
      } else {
        resetPosition();
      }
    },
  });

  const openclosedrawer = () =>{
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }

  const openDrawer = () => {
    Animated.timing(pan.x, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsOpen(true);
  };

  const closeDrawer = () => {
    Animated.timing(pan.x, {
      toValue: hiddenPosition,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsOpen(false);
  };

  const resetPosition = () => {
    Animated.timing(pan.x, {
      toValue: isOpen ? 0 : hiddenPosition,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  //END MENU
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
            apikey='AIzaSyCqPrRW_GUsZ2D00uTEXsGGPkULbXiIsTY'  
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
      ) : (
        <>
      <MapView style={styles.map} />
      <Button mode="contained" onPress={() => requestLocationPermission}>
      volver a intentar
    </Button>
    </>
      )}

<FAB
    icon="plus"
    style={styles.fab}
    onPress={toggleFloatingSection}
    
  />

            <TouchableOpacity style={styles.floatingButton} onPress={openclosedrawer}>
        <Icon name="bars" size={25} color="#fff" />
      </TouchableOpacity>
      <Animated.View
        style={[styles.menu, { transform: [{ translateX: pan.x }] }]}
        {...panResponder.panHandlers}
      >
        <View style={styles.userContainer}>
          <Icon name="user-circle" size={60} style={styles.userIcon} />
          <Text style={styles.username}>Nombre de Usuario</Text>
        </View>
        <TouchableOpacity style={styles.menuItem} onPress={closeDrawer}>
          <Icon name="briefcase" size={20} style={styles.icon} />
          <Text style={styles.menuItemText}>Mis Trabajos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={closeDrawer}>
          <Icon name="cogs" size={20} style={styles.icon} />
          <Text style={styles.menuItemText}>Mis Servicios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={closeDrawer}>
          <Icon name="search" size={20} style={styles.icon} />
          <Text style={styles.menuItemText}>Encuentra Empleo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={closeDrawer}>
          <Icon name="cog" size={20} style={styles.icon} />
          <Text style={styles.menuItemText}>Configuraciones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={closeDrawer}>
          <Icon name="question" size={20} style={styles.icon} />
          <Text style={styles.menuItemText}>Ayuda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={closeDrawer}>
          <Icon name="life-ring" size={20} style={styles.icon} />
          <Text style={styles.menuItemText}>Soporte</Text>
        </TouchableOpacity>
        <View style={styles.workerModeButtonContainer}>
          <TouchableOpacity style={styles.workerModeButton} onPress={closeDrawer}>
            <Text style={styles.workerModeButtonText}>Modo Trabajador</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
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
    bottom: -10,
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 30,
    marginLeft: 50,
    width: '70%',
    right: 200,


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

  container2: {
    flex: 1,
    position: 'absolute',
    //backgroundColor: 'red',
   

  },
  menu: {
    left: 0,
    position:'absolute',
    top: 0,
    bottom: 0,
    width: 302,
    backgroundColor: '#ffffff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingVertical: 20,
  },
  userContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userIcon: {
    color: '#3498db',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  menuItem: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    marginRight: 15,
    color: '#3498db',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
  workerModeButtonContainer: {
    marginTop: 'auto',
    paddingHorizontal: 20,
  },
  workerModeButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  workerModeButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  floatingButton: {
    position: 'absolute',
    backgroundColor: '#3498db',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    elevation: 5,
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
