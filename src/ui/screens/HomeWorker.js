import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Text,
  Animated,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import FloatingSection, { jobData } from "../components/sectionModalMap";
import * as Location from "expo-location";


const HomeWorker = () => {
  const [location, setLocation] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [isChatModalVisible, setIsChatModalVisible] = useState(false);
  const [isFloatingSectionVisible, setIsFloatingSectionVisible] =
    useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const toggleChatModal = () => {
    setIsChatModalVisible(!isChatModalVisible);
  };

  const toggleFloatingSection = () => {
    setIsFloatingSectionVisible(!isFloatingSectionVisible);
  };

  const buscarTrabajo = () => {
    Alert.alert("Buscando trabajo....");
  };

  const seleccionarTrabajo = (trabajo) => {
    Alert.alert(`Has seleccionado ${trabajo}`, "¿Aceptar?", [
      { text: "Aceptar", onPress: () => console.log("Trabajo aceptado") },
      {
        text: "Cancelar",
        onPress: () => console.log("Trabajo rechazado"),
        style: "cancel",
      },
    ]);
  };

  const activarTrabajo = (trabajo) => {
    const toggleActivation = () => {
      toggleFloatingSection();
      setIsActive(!isActive);
    };

    Alert.alert(
      `${
        isActive
          ? "Ya no serás visible para los usuarios"
          : "Te mostrarás como activo hacia los usuarios"
      }`,
      "¿Aceptar?",
      [
        { text: "Aceptar", onPress: toggleActivation },
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelado"),
          style: "cancel",
        },
      ]
    );
  };

  async function requestLocationPermission() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      setLocation({ latitude, longitude });
    } catch (err) {
      console.warn("Error: " + err);
    }
  }

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            ...location,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            key={location}
            coordinate={location}
            title="Tu ubicación"
            description="Aquí estás"
          />
          {jobData.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.latlng}
              title={marker.jobType}
              description={marker.address}
            />
          ))}
        </MapView>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="blue" size="large" />
        </View>
      )}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={toggleFloatingSection}
      >
        <Text style={styles.floatingButtonText}>Buscar trabajo</Text>
      </TouchableOpacity>
      <FloatingSection
        visible={isFloatingSectionVisible}
        onClose={toggleFloatingSection}
        isActive={isActive}
        onSearchJobs={() => {
          activarTrabajo();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#ffffff', // Fondo semitransparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
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
    height: "90%",
  },
});

export default HomeWorker;
