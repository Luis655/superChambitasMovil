import React, { useState, useContext } from "react";
import {
  View,
  Alert, Text,
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
  ActivityIndicator,
  MD2Colors
} from "react-native-paper";
import { AuthContext, useAuth } from "../../auth/contextAuth";
import { useLocation } from "../../customHooks/useLocation";
import { useDarkMode } from "../../auth/contextAuth";
import HelpModal from "../components/helpModal";
import { SupportModal } from "../components/supportModal";
import Ionicons from '@expo/vector-icons/Ionicons';
import BarraLateral from '../components/BarraLateral';
import OfertaModal from "../components/OfertaModal";
import useAxios from "../../customHooks/hookAxios";
import { SignalRContext } from "../../signal/signalRConext";
import { scheduleNotificationAsync } from "expo-notifications";
import { customMapStyRetro, customMapStyleAuberige, styles } from "./styles";
import { useEffect } from "react";
const workerLogo = require("../../../assets/logoconosuperchambitas-removebg-preview.png");
const menuWidth = 250;
const HomeWorker = ({ navigation, route }) => {
  const { colorMode } = useDarkMode();
  const { user, profile } = useAuth();
  const { id, userName, email, phone, role } = user
  const [modalVisible1, setModalVisible1] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [imageLoaded1, setImageLoaded1] = useState(false);
  const [imageLoaded2, setImageLoaded2] = useState(false);
  const { location, estadomsg } = useLocation();
  const [contadorActive, setContadorActive] = useState(false);
  const [serviceRequest, setServiceRequest] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenSupport, setIsOpenSupport] = useState(false);
  const [timer, setTimer] = useState(null);
  const [destination, setDestination] = useState(null);
  const [isFloatingSectionVisible, setIsFloatingSectionVisible] =
    useState(false);
  const iniciarRuta = (location) => {
    setDestination(location);
  };
  const [timeLeft, setTimeLeft] = useState(30);
  const getRequest = async (id) => {
    const { data } = await useAxios(`service/${id}`, "GET");
    if (data) {
      setServiceRequest(data)
    }
  }
  SignalRContext.useSignalREffect("NewRequests", async (event) => {
    if (user.role == 2) {
      return;
    }
    setTimeLeft(30)
    await scheduleNotificationAsync({
      identifier: Math.random().toString(),
      content: {
        title: "Nuevo servicio: " + event.title,
      },
      trigger: null,
    });
    await handleOffert(event.serviceId)
    iniciarContador()
  })

  SignalRContext.useSignalREffect(`ChambaAccept`, async (event) => {
    if (user.role == 1) {
      return;
    }
    if (user.userId != event.ClientId) {
      return
    }
    await scheduleNotificationAsync({
      identifier: Math.random().toString(),
      content: {
        title: "Han aceptado tu chamba",
        body: `${event.worker.name} ha aceptado tu chamba, esperalo y asegurate de tener efectvo suficiente`
      },
      trigger: null,
    });
  })

  const handleOffert = async (id) => {
    await getRequest(id);
    setModalVisible(true);
  }

  const iniciarContador = () => {
    setContadorActive(true);

    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      setTimer(interval)
    }, 1000);
  };

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(timer); // Detén el intervalo cuando el tiempo llega a cero
      setModalVisible(false);
      setContadorActive(false);
    }
  }, [timeLeft])

  const reiniciarBusqueda = () => {
    setModalVisible1(false);
    setContadorActive(false);
    iniciarContador();
  };

  const cancelarBusqueda = () => {
    setModalVisible1(false);
    setContadorActive(false);
    setTimeLeft(30);
  };
  const toggleFloatingSection = () => {
    setIsFloatingSectionVisible(!isFloatingSectionVisible);
  };
  const activarTrabajo = (trabajo) => {
    Alert.alert(
      `${!isActive
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
          onPress: () => { },
          style: "cancel",
        },
      ]
    );
  };

  const opencloseModal = () => {
    isOpenModal ?
      setIsOpenModal(false) :
      setIsOpenModal(true)
  };
  const opencloseSupport = () => {
    isOpenSupport ?
      setIsOpenSupport(false) :
      setIsOpenSupport(true)
  };



  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAccept = () => {
    clearInterval(timer); // Detén el intervalo cuando el tiempo llega a cero
    setModalVisible(false);
    setContadorActive(false);
    acceptJob(serviceRequest)
    console.log({ serviceRequest })
    iniciarRuta(JSON.parse(serviceRequest.location))

  };

  const handleContraofertar = (precioOferta) => {
    clearInterval(timer); // Detén el intervalo cuando el tiempo llega a cero
    setModalVisible(false);
    setContadorActive(false);

  };
  const acceptJob = async (job) => {
    const dataRequest = {
      "clientId": job.userId,
      "workerId": id,
      "serviceId": job.serviceId,
      "date": new Date()
    }
    try {
      await useAxios(`request/crearrequest`, "post", dataRequest);
      Alert.alert(
        `Chamba aceptada correctamente`,
      );
    } catch (error) {
      Alert.alert(
        `¡Ha ocurrido un error!`,
      );
      console.log(`job accept error: ${error}`);
    }
  }
  return (
    <View style={styles(colorMode).container}>

      {location ? (
        <MapView style={styles(colorMode).map} initialRegion={{ ...location, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }} customMapStyle={colorMode ? customMapStyleAuberige : customMapStyRetro} >
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
          {destination && (
            <MapViewDirections
              origin={location}
              destination={destination}
              apikey={`AIzaSyCqPrRW_GUsZ2D00uTEXsGGPkULbXiIsTY`}
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
          {destination && (
            <Marker coordinate={destination}>
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
          <MapView style={styles(colorMode).map} />
        </>
      )
      }

      {contadorActive ? (
        <View style={styles(colorMode).containers}>
          <View style={styles(colorMode).waitingContainer}>
            <Text style={styles(colorMode).waitingText}>
              Esperando respuesta...
            </Text>
            <Text style={styles(colorMode).timerText}>
              {timeLeft}
            </Text>
          </View>
        </View>
      ) : (

        <View style={styles(colorMode).containere}>
          <TouchableOpacity style={styles(colorMode).fab} onPress={toggleFloatingSection}>
            <Ionicons name="radio-button-on" size={15} color="#ff9900" />
            <Text style={styles(colorMode).text}>
              {role == '1' ? "¿ QUE HAREMOS HOY ?" : "¿ CHAMBA ?"}
            </Text>
          </TouchableOpacity>
        </View>
      )}


      <View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible1}
          onRequestClose={() => setModalVisible1(false)}
        >
          <View style={styles(colorMode).modalContainer}>
            <View style={styles(colorMode).modalContent}>
              <Text style={styles(colorMode).title}>Confirmación</Text>
              <Text style={styles(colorMode).message}>¿Desea reiniciar la búsqueda?</Text>
              <TouchableOpacity onPress={reiniciarBusqueda} style={styles(colorMode).confirmButton}>
                <Text style={styles(colorMode).buttonText}>Continuar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={cancelarBusqueda} style={styles(colorMode).cancelButton}>
                <Text style={styles(colorMode).buttonText}>No</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>
      </View>
      {estadomsg &&
        <View style={styles(colorMode).activityIndicator}>
          <ActivityIndicator animating={estadomsg} color={MD2Colors.red800} size={140} />
        </View>}


      <BarraLateral
        toggleFloatingSection={toggleFloatingSection}
        navigation={navigation}
        userName={userName}
        id={id}
        email={email}
        phone={phone}
        role={role}
        HelpModal={opencloseModal}
        SupportModal={opencloseSupport}
      />


      <FloatingSection
        visible={isFloatingSectionVisible}
        onClose={toggleFloatingSection}
        isActive={isActive}
        onSearchJobs={() => {
          activarTrabajo();
        }}
        aceptarTrabajo={(job) => {
          acceptJob(job), acceptJob(job)
          console.log({ job })
          iniciarRuta(JSON.parse(job.location))
        }}
        Contador={(id) => {
          iniciarContador(id)
        }}
        Titulo={role == '1' ? "Buscar Trabajo" : "Solicitar servicio"}
        Tipo={role}
        toggleModal={toggleModal}
        handleOffert={handleOffert}

      />
      <HelpModal closeModal={opencloseModal} modalVisible={isOpenModal}></HelpModal>
      <SupportModal closeModal={opencloseSupport} modalVisible={isOpenSupport}></SupportModal>
      <OfertaModal
        isVisible={isModalVisible}
        onAccept={handleAccept}
        onContraofertar={handleContraofertar}
        onClose={() => {
          toggleModal()
          clearInterval(timer); // Detén el intervalo cuando el tiempo llega a cero
          setContadorActive(false);
        }}
        nombre={serviceRequest?.name}
        data={serviceRequest}
      />
    </View>
  );
};

export default HomeWorker;

