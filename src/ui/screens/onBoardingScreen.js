import React, { useContext } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDarkMode } from "../../auth/contextAuth";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { observer } from 'mobx-react';

const OnBoardingScreen = ({ navigation }) => {
  const { colorMode, setDarkColorMode } = useDarkMode();
  const container = {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorMode ? "#fff" : "#fff",
  };

  return (
    <View style={container}>
      <Image
        source={require("../../../assets/trabajohome.png")}  // Reemplaza con la ruta correcta de tu imagen
        style={styles.image}
      />
      <Text style={styles.title}>SuperChambitas</Text>
      <Text style={[styles.subtitle, styles.informativeText]}>
        "Tu chamba, tu elección, tu comodidad".
      </Text>      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.orangeButton]}
          onPress={() => navigation.navigate('WorkerLoginScreen', { role: 2 })}
        >
          <Text style={[styles.buttonText, styles.orangeButtonText]}>USUARIO</Text>
          <FontAwesome name="long-arrow-right" size={18} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.orangeButton]}
          onPress={() => navigation.navigate('WorkerLoginScreen', { role: 1 })}
        >
          <Text style={[styles.buttonText, styles.orangeButtonText]}>CHAMBEADOR</Text>
          <FontAwesome name="long-arrow-right" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "50%",
    resizeMode: "cover", // Cambié a 'cover' para ajustar la imagen al contenedor
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ff9900", // Naranja similar al de Didi
    marginTop: 20,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    color: "#333", // Color de texto oscuro similar al de Didi
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  informativeText: {
    fontSize: 30, // Ajusta el tamaño de fuente según tus preferencias
    color: 'red', // Puedes cambiar el color según tus preferencias
    textAlign: 'center',
    fontStyle: 'italic', // Añade estilo itálico
    marginTop: 10,
  },
  
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around", // Para distribuir los botones de manera uniforme
    width: "100%",
    marginTop: 20,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff",
    marginRight: 10,
  },
  orangeButton: {
    backgroundColor: "#ff9900", // Naranja similar al de Didi
  },
  orangeButtonText: {
    color: "#fff",
  },
});

export default observer(OnBoardingScreen);
