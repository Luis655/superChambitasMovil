import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { Button } from 'react-native-paper';

const MyComponent = ({ navigation, route }) => {
  const { parametro } = route.params;

  const [countryCode, setCountryCode] = useState("MX");
  const [country, setCountry] = useState(null);

  const onSelectCountry = (country) => {
    console.log(country);
    setCountryCode(country.cca2);
    setCountry(country);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View style={styles.container}>
          {/* Fondo naranja con el logo */}
          <View style={styles.header}>
            <Image style={styles.logo} source={require('../../../assets/LogoSuperChambitas.png')} />
          </View>

          <Text style={styles.title}>Comencemos</Text>

          <View style={styles.inputContainer}>
            <View style={styles.countryPickerContainer}>
              <CountryPicker
                withFilter
                withFlag
                withCallingCode
                withEmoji
                countryCode={countryCode}
                onSelect={onSelectCountry}
                containerButtonStyle={styles.countryPickerButton}
              />

              {country && (
                <View style={styles.countryInfo}>
                  <Text style={styles.orangeButtonText}>{`+${country.callingCode}`}</Text>
                  <Image style={styles.flag} source={{ uri: country.flag }} />
                </View>
              )}
            </View>

            <TextInput
              style={[styles.input, styles.phoneInput]}
              placeholder="Ingresa tu celular"
              keyboardType="numeric"
              maxLength={10}
            />
          </View>

          <TouchableOpacity style={[styles.buttonContainer, styles.orangeButton]} onPress={() => navigation.navigate('CodeScreen', {parametro})}>
            <Text style={[styles.buttonText, styles.orangeButtonText]}>Enviar código</Text>
          </TouchableOpacity>

          <Text style={[styles.disclaimer, { textAlign: 'center' }]}>
            Al unirte a nuestra aplicación, aceptas nuestros {'\n'}
            Términos de Uso y Política de privacidad
          </Text>

        </View>

      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#ff9900',
    padding: 20,
    alignItems: 'center',
    height: 550,
  },
  countryCode: {
    fontSize: 16,
    marginRight: 5,
    color: '#ff9900', // Color naranja
  },
  logo: {
    //width: 500,
    //height: 550,
    marginTop: 100,
    width: 400,
    height: 350,
    resizeMode: 'contain',
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    margin: 10,
  },
  countryPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff9900',
    borderRadius: 8,
  },
  countryPickerButton: {
    backgroundColor: '#ff9900',
    borderRadius: 8,
    padding: 8,
  },
  countryInfo: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  flag: {
    width: 30,
    height: 20,
    marginLeft: 5,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    backgroundColor: '#f5f5f5',
  },
  phoneInput: {
    marginLeft: 10,
  },
  buttonContainer: {
    backgroundColor: '#009688',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orangeButton: {
    backgroundColor: '#ff9900',
  },
  orangeButtonText: {
    color: '#fff',
  },
  disclaimer: {
    marginTop: 20,
    color: '#777',
    margin: 10,
  },
});

export default MyComponent;
