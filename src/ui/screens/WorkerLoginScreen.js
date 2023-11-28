import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextInput, Button } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import { useAuth } from '../../auth/contextAuth';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, 'El número de teléfono debe contener solo números')
    .required('El número de teléfono es obligatorio'),
  password: Yup.string().required('La contraseña es obligatoria'),
});

export default function WorkerLoginScreen({ navigation, route }) {
  const { parametro } = route.params;
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);

    try {
      // Your login logic here
      // Example: const data = await useAxios('auth/login', 'post', { "email": values.phoneNumber, "password": values.password });
      // ...

      // Update the dispatch and navigate logic as needed
      // dispatch({ type: 'SET_USER', payload: values.phoneNumber });
      // dispatch({ type: 'SET_TOKEN', payload: data });
      // ...

      navigation.navigate('HomeWorker');
    } catch (error) {
      console.error(error);
      Alert.alert('Error al iniciar sesión', 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Avatar.Image style={styles.logoImage} size={250} source={require('../../../assets/LogoSuperChambitas.png')} />
        <Text style={styles.logoText}>Continuemos esta aventura!</Text>
      </View>

      <Formik
        initialValues={{ phoneNumber: '', password: '' }}
        onSubmit={handleLogin}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={styles.formContainer}>
           <TextInput
  style={styles.input}
  placeholder="Número de teléfono"
  keyboardType="numeric"
  maxLength={10}
  onChangeText={(text) => {
    // Remove non-numeric characters from the input
    const numericText = text.replace(/[^0-9]/g, '');

    // Trim the text to a maximum length of 10 characters
    const trimmedText = numericText.slice(0, 10);

    handleChange('phoneNumber')(trimmedText);
  }}
  onBlur={handleBlur('phoneNumber')}
  value={values.phoneNumber}
/>


            {errors.phoneNumber && <Text style={styles.error}>{errors.phoneNumber}</Text>}

            <TextInput
  style={styles.input}
  placeholder="Contraseña"
  secureTextEntry={!passwordVisible}
  onChangeText={handleChange('password')}
  onBlur={handleBlur('password')}
  value={values.password}
  right={
    <TextInput.Icon
      name={passwordVisible ? 'eye-off' : 'eye'}
      onPress={() => setPasswordVisible(!passwordVisible)}
      icon={() => <Icon name={passwordVisible ? 'eye-slash' : 'eye'} size={20} color="#000" />} // Change the color and size as needed
    />
  }
/>

            {errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <Button
              loading={loading}
              disabled={loading}
              style={styles.loginButton}
              mode="contained"
              onPress={handleSubmit}
            >
              Iniciar sesión
            </Button>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>¿No tienes una cuenta?</Text>
              <Button
                style={styles.registerButton}
                mode="text"
                onPress={() => parametro === '1' ? navigation.navigate('UserRegister', { parametro }) : navigation.navigate('UserRegister', { parametro })}
              >
                Registrarse
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff9900',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  logoImage: {
    backgroundColor: '#ff9900',
  },
  logoText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  formContainer: {
    width: '80%',
  },
  input: {
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#009688',
    marginBottom: 15,
  },
  error: {
    color: 'red',
    marginBottom: 15,
    fontSize: 14,
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerText: {
    color: '#fff',
    marginRight: 10,
  },
  registerButton: {
    color: '#009688',
  },
});
