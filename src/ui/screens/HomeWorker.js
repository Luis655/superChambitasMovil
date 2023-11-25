
import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet, FlatList, Text, Animated, TouchableOpacity, Image, PanResponder } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import FloatingSection, { jobData2 } from '../components/sectionModalMap';
import MapViewDirections from 'react-native-maps-directions'
import { Drawer, FAB, Button, ActivityIndicator, MD2Colors, Avatar  } from 'react-native-paper';
import { useAuth } from '../../auth/contextAuth';
import { useLocation } from '../../customHooks/useLocation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDarkMode } from '../../auth/contextAuth';

const workerLogo = require('../../../assets/logoconosuperchambitas-removebg-preview.png')

const menuWidth = 250;
const hiddenPosition = -menuWidth - 50;
const HomeWorker = ({navigation, type}) => {
  const { colorMode, setDarkColorMode } = useDarkMode();

  const { state, dispatch } = useAuth();
  const [active, setActive] = useState('');
 
  const [isActive, setIsActive] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [imageLoaded1, setImageLoaded1] = useState(false);
  const [imageLoaded2, setImageLoaded2] = useState(false);
  const {location, status, errorMsg, estadomsg, requestLocationPermission} =useLocation();
  const [contadorActive, setContadorActive] = useState(false);

  const locationReload = () =>{
  }
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
<<<<<<< HEAD
  const [timeLeft, setTimeLeft] = useState(18);
=======
  const [timeLeft, setTimeLeft] = useState(60);
>>>>>>> f72295d646cf479c0b1d0c0afc4fcbaee3fb2726

  const iniciarContador = () => {
    setIsFloatingSectionVisible(!isFloatingSectionVisible);
    setContadorActive(true);
      const interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);

  

  }
<<<<<<< HEAD
  if(timeLeft < 0){
    setTimeLeft(18)
    setContadorActive(false);

  return () => clearInterval(interval);
  }
=======

  useEffect(() => {
    if (timeLeft === 0) {
      Alert.alert(
        'Tiempo agotado',
        '¿Quieres reiniciar la búsqueda?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Reiniciar',
            onPress: () => {
              // Lógica para reiniciar la búsqueda aquí
              setTimeLeft(10); // Reinicio a 10 segundos para demostración, ajusta según sea necesario
            },
          },
        ],
        { cancelable: false }
      );
    }
  }, [timeLeft]);

>>>>>>> f72295d646cf479c0b1d0c0afc4fcbaee3fb2726
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
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
    onStartShouldSetResponderCapture: () => false,
    onStartShouldSetPanResponderCapture: () => false,
    onStartShouldSetPanResponder: () => true,

        
    onPanResponderMove: (_, gestureState) => {
      if (
        (gestureState.dx > 0 && pan.x._value.x >= hiddenPosition) ||
        (gestureState.dx < 0 && pan.x._value.x <= 0)
      ) {
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
    onMoveShouldSetPanResponder: (_, gestureState) => {
      // Permitir el gesto solo si no estás en los bordes del cajón
      return (
        (gestureState.dx > 20 && pan.x._value.x >= 20) ||
        (gestureState.dx < 20 && pan.x._value.x <= 20)
      );
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

  const styles = StyleSheet.create({
    containers: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#fff', // Fondo blanco similar al de Didi
      elevation: 5, // Sombra para dar un efecto visual similar al de Didi
      alignItems: 'center',
      justifyContent: 'center',
    },
    waitingContainer: {
      alignItems: 'center',
    },
    waitingText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333', // Color oscuro similar al de Didi
      marginBottom: 10,
    },
    timerText: {
      fontSize: 40,
      fontWeight: 'bold',
      color: '#ff9900', // Naranja similar al de Didi
    },
    activityIndicator:{
      position: 'absolute',
      margin: 16,
      //right: 'auto',
      alignSelf: 'center',
      bottom: 400,
      backgroundColor: 'transparent',
  
    },
  
    fab: {
      position: 'absolute',
      margin: 16,
      //right: 'auto',
      alignSelf: 'center',
      bottom: 20,
      backgroundColor: colorMode ? '#8ec3b9' :'#F5AF19'
    },
    container: {
      flex: 1,
      height:'100%',
  
    },
    floatingButton: {
      position: 'absolute',
      bottom: -10,
      backgroundColor: 'blue',
      padding: 15,
      borderRadius: 30,
      marginLeft: 50,
      width: '70%',
  
  
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
      top: 25,
      bottom: 0,
      width: 302,
      backgroundColor: colorMode ? '#1d2c4d' : '#ffffff',
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
      color: colorMode ? '#fff' : '#000'
    },
    menuItem: {
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 20,
      borderBottomWidth: 1,
      borderBottomColor: colorMode ? '#000' : '#ccc',
      color: colorMode ? '#fff' : '#000'
    },
    icon: {
      marginRight: 15,
      color: '#3498db',
    },
    menuItemText: {
      fontSize: 16,
      color: colorMode ? '#fff' : '#333',
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
      backgroundColor: colorMode ? '#1d2c4d' : '#3498db',
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      right: isOpen ? '6%' : '85%', //o 10
      bottom: '88%',
      elevation: 5,
    },
  });
  const customMapStyRetro = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ebe3cd"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#523735"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f1e6"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#c9b2a6"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#dcd2be"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#ae9e90"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#93817c"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#a5b076"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#447530"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f1e6"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#fdfcf8"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f8c967"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#e9bc62"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e98d58"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#db8555"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#806b63"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8f7d77"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#ebe3cd"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#b9d3c2"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#92998d"
        }
      ]
    }
  ]
  const customMapStyleAuberige =[
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8ec3b9"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1a3646"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#64779e"
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#334e87"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6f9ba5"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3C7680"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#304a7d"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2c6675"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#255763"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#b0d5ce"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3a4762"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#0e1626"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#4e6d70"
        }
      ]
    }
  ]
  



  //END MENU
  return (
    
    <View style={styles.container}>

      {location ? (
        <MapView style={styles.map} initialRegion={{ ...location, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }} customMapStyle={colorMode ? customMapStyleAuberige : customMapStyRetro} >
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
    </>
      )}

{
  errorMsg == 1 ?
  <FAB
    icon="plus"
    style={styles.fab}
    onPress={toggleFloatingSection}
    
  />
  :
  <FAB
  icon="reload"
  style={styles.fab}
  onPress={() => { requestLocationPermission()}}
  
/>

}
{ contadorActive &&


<View style={styles.containers}>
<View style={styles.waitingContainer}>
  <Text style={styles.waitingText}>
    Esperando respuesta...
  </Text>
  <Text style={styles.timerText}>
    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
  </Text>
</View>
</View>
}
{estadomsg &&
<View style={styles.activityIndicator}>
<ActivityIndicator animating={estadomsg} color={MD2Colors.red800} size={140} />
</View>}


            <TouchableOpacity style={styles.floatingButton} onPress={openclosedrawer}>
        <Icon name={isOpen ? 'times' : 'bars'} size={25} color="#fff" />
      </TouchableOpacity>
      <Animated.View
        style={[styles.menu, { transform: [{ translateX: pan.x }] }]}
        {...panResponder.panHandlers}
      >
        <View style={styles.userContainer}>
        <TouchableOpacity onPress={openclosedrawer}>

          <Avatar.Image size={60} style={styles.userIcon} source={{uri: 'https://picsum.photos/700'}} />

          {/*<Icon name="user-circle" size={60} style={styles.userIcon} />*/}
          </TouchableOpacity>

          <Text style={styles.username}>Luis Macias</Text>
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
        <TouchableOpacity style={styles.menuItem} onPress={() => {console.warn("seleccion"), navigation.navigate('Configuraciones')}}>
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
        Contador={iniciarContador}
      />
    </View>
  );
};


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
