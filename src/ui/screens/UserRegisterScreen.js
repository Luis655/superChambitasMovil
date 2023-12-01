import React, { useState } from 'react';
import {
  Alert,
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
import { Formik } from "formik";
import * as Yup from "yup";
import useAxios from '../../customHooks/hookAxios';
const AddWorkerDataSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required("El numero es requerido")
    .min(10, "Numero no valido")
    .max(10, "Numero no valido"),
});


const UserRegisterScreenPhone = ({ navigation, route }) => {
  const { role } = route.params;
  //const [phoneNumber, setPhoneNumber] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('MX');
  const [country, setCountry] = useState(null);

  const onSelectCountry = (country) => {
    setCountryCode(country.cca2);
    setCountry(country);
  };


  // const handlePhoneNumberInputClick = () => {
  //   setIsModalVisible(true);
  // };

  // const cancelarBusqueda = () => {
  //   setIsModalVisible(false); // Cierra el modal después de cancelar
  // };

  // const handleModalClose = () => {
  //   setIsModalVisible(false);
  //   setPhoneNumber(selectedPhoneNumber);
  // };
  const handlePhoneInput = (text) => {
    // Filtrar caracteres no numéricos
    const numericText = text.replace(/[^0-9]/g, '');

    // Actualizar el estado con el texto numérico
    // selectedPhoneNumber(numericText);
    setPhoneNumber(numericText)
  };

  const handleSubmit=async ()=>{
      navigation.navigate('CodeScreen', { role, phoneNumber})

  //  try {
  //   const response = await useAxios("Sms/send-code", "POST", JSON.stringify(phoneNumber))
  //   Alert.alert(
  //     `${response.data.mensaje}`,

  //   );
  //   navigation.navigate('CodeScreen', { parametro, phoneNumber})
  //  } catch (error) {
  //   Alert.alert(
  //     `${error}`,

  //   );
  //  }
  }
  const datosNumero = async (values) => {
    const phoneNumber= values.phoneNumber

       try {
    const response = await useAxios("Sms/send-code", "POST", JSON.stringify(phoneNumber))
    Alert.alert(
      `${response.data.mensaje}`,

    );
    navigation.navigate('CodeScreen', { role, phoneNumber})
    
   } catch (error) {
    Alert.alert(
      `${error}`,

    );
   }
    console.log(values.phoneNumber);
  }
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Formik
          initialValues={{
            phoneNumber: "",
          }}
          validationSchema={AddWorkerDataSchema}
          onSubmit={datosNumero}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            setFieldValue,
            handleBlur,
          }) => (
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
              style={styles.modalInput}
              placeholder="Ingresa tu celular"
              keyboardType="numeric"
              onChangeText={handleChange("phoneNumber")}
              onBlur={handleBlur("phoneNumber")}
              maxLength={10}
              value={values.phoneNumber}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}

              //onChangeText={(text) => handlePhoneInput(text)}
            />
          </View>
          {touched.phoneNumber && errors.phoneNumber && (
                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
              )}
          <TouchableOpacity style={[styles.buttonContainer, styles.orangeButton]} onPress={handleSubmit}>
            <Text style={[styles.buttonText, styles.orangeButtonText]}>Enviar código</Text>
          </TouchableOpacity>

          <Text style={[styles.disclaimer, { textAlign: 'center' }]}>
            Al unirte a nuestra aplicación, aceptas nuestros {'\n'}
            Términos de Uso y Política de privacidad
          </Text>
        </View>
        )}</Formik>

      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent:'center'
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
    fontSize: 16,
    color: '#333',
    height: 50,
    borderColor: '#ccc',
    borderBottomWidth: .5,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 0,
    width: '80%',
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
  errorText: {
    color: "red",
    alignSelf:'center'
  },
});

export default UserRegisterScreenPhone;
