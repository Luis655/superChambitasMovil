import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Alert,
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
  Image,
  PanResponder,
  Modal
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import FloatingSection, { jobData2 } from "../components/sectionModalMap";
import MapViewDirections from "react-native-maps-directions";
import {
  FAB,
  ActivityIndicator,
  MD2Colors,
  Avatar,
} from "react-native-paper";
import { AuthContext, useAuth } from "../../auth/contextAuth";
import { useLocation } from "../../customHooks/useLocation";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDarkMode } from "../../auth/contextAuth";
import HelpModal from "../components/helpModal";
import { SupportModal } from "../components/supportModal";
const workerLogo = require("../../../assets/logoconosuperchambitas-removebg-preview.png");
import Ionicons from '@expo/vector-icons/Ionicons';
import BarraLateral from '../components/BarraLateral';
import OfertaModal from "../components/OfertaModal";
import useAxios from "../../customHooks/hookAxios";
const menuWidth = 250;
const hiddenPosition = -menuWidth - 50;
const HomeWorker = ({ navigation,route }) => {
  const { colorMode, setDarkColorMode } = useDarkMode();
  const [state, setState] = useState({type:1})
  const { user, profile } = useContext(AuthContext);
  const {id, userName,email,phone, role } = user




  //console.warn(profile);
  // const [active, setActive] = useState("");
  const [modalVisible1, setModalVisible1] = useState(false);

  const [isActive, setIsActive] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [imageLoaded1, setImageLoaded1] = useState(false);
  const [imageLoaded2, setImageLoaded2] = useState(false);
  const { location, status, errorMsg, estadomsg, requestLocationPermission } = useLocation();
  const [contadorActive, setContadorActive] = useState(false);

  const iniciarRuta = (lat, lng) => {
    const newMarkerPosition = {
      latitude: lat,
      longitude: lng,
    };

    setMarkerPosition(newMarkerPosition);
  }; 
  const [timeLeft, setTimeLeft] = useState(15);
  const [datos, setDatos] = useState();
  const getoferta = async () => {
    const { data } = await useAxios(`Service/${1080}`, "GET");
    if(data.status ==1){
      setModalVisible(!isModalVisible);
    }
    setDatos(data)
  }
  useEffect(() => {
    getoferta();
  }, [])


  const iniciarContador = (id) => {
    Alert.alert(
      id,
    );
    setModalVisible(!isModalVisible);
    setIsFloatingSectionVisible(!isFloatingSectionVisible);
    setContadorActive(true);

    let tiempoRestante = 15; // Establece el tiempo inicial en segundos (ajusta según tus necesidades)
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      tiempoRestante--;

      if (tiempoRestante === 0) {
        clearInterval(interval); // Detén el intervalo cuando el tiempo llega a cero
        setModalVisible1(true);
        // Muestra un cuadro de diálogo para preguntar al usuario si quiere reiniciar la búsqueda
      }else{
        //getoferta
      }
    }, 1000);
  };

  const reiniciarBusqueda = () => {
    setModalVisible1(false); // Cierra el modal después de reiniciar

    // Reinicia el contador y realiza las acciones necesarias para reiniciar la búsqueda
    setTimeLeft(15); // Establece el tiempo inicial nuevamente (ajusta según tus necesidades)
    // Otras acciones para reiniciar la búsqueda aquí
    setContadorActive(false); // Pausa el contador para reiniciar
    iniciarContador(); // Llamada recursiva para reiniciar el contador
  };

  const cancelarBusqueda = () => {
    setModalVisible1(false); // Cierra el modal después de cancelar
    setContadorActive(false);
    setTimeLeft(15); // Establece el tiempo a cero
  };


  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const [isFloatingSectionVisible, setIsFloatingSectionVisible] =
    useState(false);
  const toggleFloatingSection = () => {
    setIsFloatingSectionVisible(!isFloatingSectionVisible);
  };
  const activarTrabajo = (trabajo) => {
    Alert.alert(
      `${
        !isActive
          ? "Te mostraras como activo hacia los usuarios"
          : "Ya no seras visible para los usuarios"
      }`,
      "¿Aceptar?",
      [
        {
          text: "Aceptar",
          onPress: () => {
            toggleFloatingSection();
            setIsActive(!isActive);
          },
        },
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
      ]
    );
  };

  //MENU

  const [pan] = useState(new Animated.ValueXY({ x: hiddenPosition, y: 0 }));
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenSupport, setIsOpenSupport] = useState(false);

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

  const openclosedrawer = () => {
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  };
  const opencloseModal = () => {
    isOpenModal ? 
      setIsOpenModal(false):
      setIsOpenModal(true)
  };
  const opencloseSupport = () => {
    isOpenSupport ? 
      setIsOpenSupport(false):
      setIsOpenSupport(true)
  };
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
    activityIndicator: {
      position: 'absolute',
      margin: 16,
      //right: 'auto',
      alignSelf: "center",
      bottom: 400,
      backgroundColor: "transparent",
    },
    containere: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      // Otros estilos del contenedor principal aquí
    },
    fab: {
      backgroundColor: '#E0E0E0', // Color gris claro similar al de Didi
      borderRadius: 20, // Ajusta según tus preferencias
      width: 400,
      padding: 15, // Ajusta según tus preferencias
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 5,
      position: 'absolute',
      bottom: 20, // Ajusta según la posición deseada desde la parte inferior
      borderWidth: 30, // Ancho del borde
      borderColor: 'white', // Color del borde
    },
    text: {
      color: 'black',
      marginLeft: 10,
      fontSize: 20, // Ajusta según tus preferencias
      fontWeight: 'bold',
    },
    container: {
      flex: 1,
      height: "100%",
    },
    floatingButton: {
      position: "absolute",
      bottom: -10,
      backgroundColor: "blue",
      padding: 15,
      borderRadius: 30,
      marginLeft: 50,
      width: "70%",
    },
    floatingButtonText: {
      color: "#fff",
      alignSelf: "center",
      fontSize: 20,
    },
    map: {
      flex: 1,
      height: "100%",
    },
    overlay: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "white",
      padding: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      overflow: "hidden",
    },

    container2: {
      flex: 1,
      position: "absolute",
      //backgroundColor: 'red',
    },
    menu: {
      left: 0,
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: 302,
      backgroundColor: colorMode ? '#ffffff' : '#ffffff',
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      paddingVertical: 20,
    },
    userContainer: {
      alignItems: "center",
      marginBottom: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.5)', // Fondo semi-transparente

      borderRadius: 10,
      padding: 25,
      backdropFilter: 'blur(10px)', // Ajusta el valor según tus preferencias
    },



    userRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    userContainerContent: {
      marginRight: 10, // Ajusta según tus preferencias

    },

    userIcon: {
      width: 60,
      height: 60,
      borderRadius: 30,
    },

    userInfo: {
      flex: 1,
    },

    username: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333', // Ajusta según tus preferencias
    },

    editProfileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    editProfileText: {
      color: '#888', // Color gris
      fontSize: 16,
      marginRight: 5, // Ajusta según tus preferencias
    },

    editProfileIcon: {
      color: '#888', // Color gris para el icono
    },
    menuItem: {
      height: 50,
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 20,
      color: colorMode ? '#fff' : '#000',
      borderBottomWidth: 1,
      borderBottomColor: colorMode ? '#fff' : '#ddd', // Ajusta el color del borde según el modo
    },
    icon: {
      marginRight: 15,
      color: "#3498db",
    },
    menuItemText: {
      fontSize: 16,
      color: colorMode ? '#fff' : '#333',
      fontFamily: 'Arial', // Ajusta la fuente según tu preferencia
    },
    workerModeButtonContainer: {
      marginTop: "auto",
      paddingHorizontal: 20,
    },
    workerModeButton: {
      backgroundColor: "#4CAF50",
      borderRadius: 5,
      paddingVertical: 10,
      alignItems: "center",
    },
    workerModeButtonText: {
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: 18,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: 300,
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#ff9900',
    },
    message: {
      marginBottom: 20,
      color: '#555',
    },
    confirmButton: {
      backgroundColor: '#ff9900',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginBottom: 10,
    },
    cancelButton: {
      backgroundColor: '#ff0000',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginBottom: 10,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    closeButton: {
      marginTop: 10,
    },
  });
  const customMapStyRetro = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#ebe3cd",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#523735",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#f5f1e6",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#c9b2a6",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#dcd2be",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#ae9e90",
        },
      ],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#93817c",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#a5b076",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#447530",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#f5f1e6",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: "#fdfcf8",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#f8c967",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#e9bc62",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [
        {
          color: "#e98d58",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#db8555",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#806b63",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#8f7d77",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#ebe3cd",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#b9d3c2",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#92998d",
        },
      ],
    },
  ];
  const customMapStyleAuberige = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#1d2c4d",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#8ec3b9",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1a3646",
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#4b6878",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#64779e",
        },
      ],
    },
    {
      featureType: "administrative.province",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#4b6878",
        },
      ],
    },
    {
      featureType: "landscape.man_made",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#334e87",
        },
      ],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [
        {
          color: "#023e58",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#283d6a",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#6f9ba5",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1d2c4d",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#023e58",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#3C7680",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#304a7d",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#98a5be",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1d2c4d",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#2c6675",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#255763",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#b0d5ce",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#023e58",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#98a5be",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1d2c4d",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#283d6a",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#3a4762",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#0e1626",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#4e6d70",
        },
      ],
    },
  ];
  
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAccept = (precioOferta) => {
    // Lógica para aceptar la oferta con el nuevo precio
    console.log(`Oferta aceptada: $${precioOferta}`);
    toggleModal();
  };

  const handleContraofertar = (precioOferta) => {
    // Lógica para contraofertar con el nuevo precio
    console.log(`Contraoferta realizada: $${precioOferta}`);
    toggleModal();
  };
 
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
          {role == "1" &&
            jobData2.map((marker, index) => (
              <Marker
                key={index}
                coordinate={marker.latlng}
                title={marker.jobType}
                description={marker.address}
                //image={require('./persona.png')}
                style={{ width: 22, height: 22 }} // Ajusta el tamaño del marcador según tus necesidades
                image={workerLogo}
              />
            ))}
          {markerPosition && (
            <MapViewDirections
              origin={location}
              destination={markerPosition}
              apikey="AIzaSyCqPrRW_GUsZ2D00uTEXsGGPkULbXiIsTY"
              strokeWidth={3}
            />
          )}
          {markerPosition && (
            <Marker coordinate={markerPosition}>
              <Image
                source={workerLogo}
                style={{
                  width: 60,
                  height: 60,
                  marginTop: imageLoaded2 ? 9 : 0,
                }}
                onLoad={() => setImageLoaded2(true)}
              />
            </Marker>
          )}
        </MapView>
      ) : (
        <>
          <MapView style={styles.map} />
        </>
      )
      }

{contadorActive ? (
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
) : (
  errorMsg === 1 ? (
    // Render this block if errorMsg is 1
    <View style={styles.containere}>
      {/* Other interface elements here */}

      {/* Floating button */}
      <TouchableOpacity style={styles.fab} onPress={toggleFloatingSection}>
        <Ionicons name="radio-button-on" size={15} color="#ff9900" />
        <Text style={styles.text}>
          {role == '1' ? "¿ QUE HAREMOS HOY ?" : "¿ CHAMBA ?"}
        </Text>
      </TouchableOpacity>
    </View>
  ) : (
    // Render this block if errorMsg is not 1
    <FAB
      text="Cargando"
      icon="reload"
      style={styles.fab}
      onPress={() => { requestLocationPermission() }}
    />
  )
)}


      <View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible1}
          onRequestClose={() => setModalVisible1(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Confirmación</Text>
              <Text style={styles.message}>¿Desea reiniciar la búsqueda?</Text>
              <TouchableOpacity onPress={reiniciarBusqueda} style={styles.confirmButton}>
                <Text style={styles.buttonText}>Continuar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={cancelarBusqueda} style={styles.cancelButton}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>
      </View>
      {estadomsg &&
        <View style={styles.activityIndicator}>
          <ActivityIndicator animating={estadomsg} color={MD2Colors.red800} size={140} />
        </View>}


      <BarraLateral
        toggleFloatingSection={toggleFloatingSection}
        navigation={navigation}
        userName = {userName}
        id={id}
        email={email}
        phone={phone}
        role={role}

      />


      <FloatingSection
        visible={isFloatingSectionVisible}
        onClose={toggleFloatingSection}
        isActive={isActive}
        onSearchJobs={() => {
          activarTrabajo();
        }}
        aceptarTrabajo={(lat, lng) => {
          iniciarRuta(lat, lng);
        }}
        Contador={(id) =>{
          iniciarContador(id)
        }}
        Titulo={role == '1' ? "Buscar Trabajo" : "Solicitar servicio"}
        Tipo={role}
        toggleModal={toggleModal}
      />
      <HelpModal closeModal={opencloseModal} modalVisible={isOpenModal}></HelpModal>
      <SupportModal closeModal={opencloseSupport} modalVisible={isOpenSupport}></SupportModal>
      <OfertaModal
        isVisible={isModalVisible}
        onAccept={handleAccept}
        onContraofertar={handleContraofertar}
        onClose={toggleModal}
        
      />
    </View>
  );
};

export default HomeWorker;

