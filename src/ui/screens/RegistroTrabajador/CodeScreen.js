import React, { useState, useRef, useEffect } from 'react';
import { Alert, Platform, View, StyleSheet, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button } from 'react-native-paper';
import useAxios from '../../../customHooks/hookAxios';

const VerificationScreen = ({ navigation, route }) => {
  const { role, phoneNumber } = route.params;

  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleCodeChange = (index, value) => {
    const newCode = [...verificationCode];
    newCode[index] = value;

    setVerificationCode(newCode);

    // Move focus to the next input
    if (index < 5 && value !== '') {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index) => {
    const newCode = [...verificationCode];
    newCode[index] = '';

    setVerificationCode(newCode);

    // Move focus to the previous input
    if (index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResendCode = async () => {
    // Add logic to resend code here

    const response = await useAxios("Sms/send-code", "POST", phoneNumber)
    Alert.alert(
      `${response.data}`,

    );
    setTimer(60);
  };

  const handleSubmit = async () => {

    try {
      const code = verificationCode.toString().replace(",","").replace(",","").replace(",","").replace(",","").replace(",","").replace(",","")
      const data = {numeroDestino:phoneNumber, codigoIngresado:Number.parseInt(code)}
      const response = await useAxios("Sms/code-verify", "POST", JSON.stringify(data))
      navigation.navigate('NameScreen', { role, phoneNumber })
      Alert.alert(
        `${response.data.mensaje}`,
  
      );
    } catch (error) {
      Alert.alert(
        `${error}`,
  
      );
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image style={styles.logo} source={require('../../../../assets/LogoSuperChambitas.png')} />
          </View>

          <Text style={styles.title}>Verificación</Text>

          <Text style={styles.subtitle}>Ingresa el código de verificación enviado a tu celular</Text>

          <View style={styles.codeInputContainer}>
            {verificationCode.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.codeInput}
                placeholder="•"
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleCodeChange(index, text)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace') {
                    handleBackspace(index);
                  }
                }}
                ref={(input) => (inputRefs.current[index] = input)}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.resendButton} onPress={handleResendCode}>
            <Text style={styles.resendButtonText}>
              {timer > 0 ? `Reenviar código en ${timer} segundos` : 'Reenviar código'}
            </Text>
          </TouchableOpacity>

          <Button
            loading={false}
            disabled={false}
            color="#3498db"  // Didi's blue color
            style={styles.verifyButton}
            mode="contained"
            onPress={handleSubmit}
          >
            Verificar
          </Button>

          <Text style={styles.disclaimer}>
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
    alignItems: 'center',
    padding: 20,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    marginTop: 30,
    width: 300,
    height: 250,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  codeInput: {
    width: 50,
    height: 50,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
  },
  resendButton: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  resendButtonText: {
    color: '#009688',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  verifyButton: {
    backgroundColor: '#ff9900',  // Didi's blue color
    borderRadius: 8,
    marginTop: 10,
    padding: 15,
    alignItems: 'center',
    margin: 10,
    width: '100%',
  },
  disclaimer: {
    marginTop: 150,
    color: '#777',
    textAlign: 'center',
  },
});

export default VerificationScreen;
