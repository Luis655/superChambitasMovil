import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

const NameScreen = ({ navigation, route }) => {
  const { parametro, phoneNumber } = route.params;
  const [nombre, setNombre] = useState('');

  const handleGuardar = () => {
    const nombreCompleto = `${nombre}`;
   
    if (parametro == '1') {
      navigation.navigate('Datos del trabajador', { parametro, nombreCompleto, phoneNumber})
    } else {
      navigation.navigate('NameScreen', { parametro, nombreCompleto, phoneNumber })
    }

  };

  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../../../assets/LogoSuperChambitas.png')} />
      </View>
      <Text style={styles.title}>Ingrese su nombre completo</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escriba su nombre"
          onChangeText={(text) => setNombre(text)}
          value={nombre}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleGuardar}>
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  logo: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333333',
  },
  input: {
    height: 55,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#ff9900',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default NameScreen;
