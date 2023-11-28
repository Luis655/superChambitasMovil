import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { Button } from 'react-native-paper';
import { Modal } from 'react-native';

const MyComponent = ({ navigation, route }) => {
  const { parametro } = route.params;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('MX');
  const [country, setCountry] = useState(null);

  const onSelectCountry = (country) => {
    console.log(country);
    setCountryCode(country.cca2);
    setCountry(country);
  };

  const handlePhoneNumberInputClick = () => {
    setIsModalVisible(true);
  };

  const cancelarBusqueda = () => {
    setIsModalVisible(false); // Cierra el modal después de cancelar
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setPhoneNumber(selectedPhoneNumber);
  };
  const handlePhoneInput = (text) => {
    // Filtrar caracteres no numéricos
    const numericText = text.replace(/[^0-9]/g, '');

    // Actualizar el estado con el texto numérico
    setPhoneNumber(numericText);
  };
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Modal animationType="slide" transparent={true} visible={isModalVisible}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Ingresa tu celular"
                  keyboardType="numeric"
                  maxLength={10}
                  value={selectedPhoneNumber}
                  onChangeText={(text) => setSelectedPhoneNumber(text)}
                />
                <TouchableOpacity style={[styles.buttonContainer, styles.orangeButton]} onPress={handleModalClose}>
                  <Text style={[styles.buttonText, styles.orangeButtonText]}>Aceptar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonContainer, styles.redButton]} onPress={cancelarBusqueda}>
                  <Text style={[styles.buttonText, styles.orangeButtonText]}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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

            <TouchableOpacity style={styles.phoneInputContainer} onPress={handlePhoneNumberInputClick}>
              <View style={styles.phoneInputContent}>
                <Text style={styles.phoneInputLabel}>Número de Teléfono</Text>
                <Text style={styles.phoneNumber}>{phoneNumber}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.buttonContainer, styles.orangeButton]} onPress={() => navigation.navigate('CodeScreen', { parametro })}>
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
    phoneInputContainer: {
      flex: 1,
      marginLeft: 10,
    },
    phoneInputContent: {
      borderBottomWidth: 1,
      borderColor: '#ccc',
      paddingBottom: 5,
    },
    phoneInputLabel: {
      color: '#777',
      fontSize: 12,
    },
    phoneNumber: {
      fontSize: 16,
      color: '#333',
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
    redButton: {
      backgroundColor: 'red',
    },
    orangeButtonText: {
      color: '#fff',
    },
    disclaimer: {
      marginTop: 60,
      color: '#777',
      margin: 10,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 8,
      width: '80%',
    },
    modalInput: {
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingLeft: 10,
      marginBottom: 20,
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
  });

  export default MyComponent;
