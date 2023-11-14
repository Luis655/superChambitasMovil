import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { Button } from 'react-native-paper';

const MyComponent = ({navigation}) => {
  const [countryCode, setCountryCode] = useState("MX");
  const [country, setCountry] = useState(null);

  const onSelectCountry = (country) => {
    console.log(country)
    setCountryCode(country.cca2);
    setCountry(country);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex:1}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    <View style={styles.container}>

      <Text style={styles.title}>Introduce tu número de teléfono</Text>
      <Text style={styles.subtitle}>Te enviaremos un código para verificar tu número telefónica</Text>

      <View style={styles.phoneContainer}>

        <TextInput
          style={[styles.input, styles.phoneInput]}
          placeholder="Número de teléfono"
          keyboardType="phone-pad"
        />

        <View style={{marginLeft:-200}}>
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
              <Image style={styles.flag} source={{ uri: country.flag }} />
            </View>
          )}
        </View>
      </View>

      <TouchableOpacity style={styles.buttonContainer} onPress={() => {navigation.navigate('CodeScreen')}}>
        <Text style={styles.buttonText}>Enviar código</Text>
      </TouchableOpacity>

      <Text style={styles.disclaimer}>Al unirte a nuestra aplicación, aceptas nuestros Términos de Uso y Política de privacidad</Text>

    </View>
    </TouchableWithoutFeedback>

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E4B5E',
    padding: 15,
    justifyContent: 'center',
    marginTop:-80
  },
  title: {
    color: '#fff',
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: 'grey',
    fontSize: 15,
    marginBottom: 0,
    textAlign: 'center',
    fontWeight: '500'
  },
  phoneContainer: {
    marginTop:40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  input: {
    backgroundColor: '#fff',
    height: 50,
    width: '100%',
    marginRight: 20,
    borderRadius: 5,
    paddingLeft: 15,
    fontSize: 22,
    fontWeight:'400'
  },
  countryPickerButton: {
    width: 100,
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  countryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  flag: {
    width: 30,
    height: 20,
    marginRight: 10,
  },
  callingCode: {
    color: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 15,
    //marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disclaimer: {
    color: 'grey',
    fontSize: 13,
    marginTop: 20,
    fontWeight:'400',
    textAlign: 'center'
  },
});


export default MyComponent;
