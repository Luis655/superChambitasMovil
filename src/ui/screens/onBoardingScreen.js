import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { typography } from "../../app/theme/typography";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { observer } from 'mobx-react';

const OnBoardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://irp.cdn-website.com/8ac33f62/DESKTOP/jpg/080.jpg",
        }}
        style={styles.image}
      />
      <Text style={styles.title}>SuperChambitas</Text>
      <Text style={styles.subtitle}>"Tu chamba, tu elección, tu comodidad".</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('WorkerLoginScreen', {parametro: '2'})}
        >
        <Text style={styles.buttonText}>USUARIO</Text>
        <FontAwesome name="long-arrow-right" size={18} color="white" />
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('WorkerLoginScreen', {parametro: '1'})}
        >
        <Text style={styles.buttonText}>CHAMBEADOR</Text>
        <FontAwesome name="long-arrow-right" size={18} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",

  },
  image: {
    shadowColor:'black',
    width: "100%",
    height: "50%",
    resizeMode: "contain",
  },
  title: {
    //...typography.heading,
    color: "#000000",
    fontSize: 24,
    marginTop: 20,
  },
  subtitle: {
    //...typography.heading,
    fontSize: 20,
    color: "#000000",
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#f6ad19",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    height: 50,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    //...typography.body,
    fontWeight: "bold",
    color: "#ffffff",
    marginRight: 10,
  },
});

export default observer(OnBoardingScreen);
