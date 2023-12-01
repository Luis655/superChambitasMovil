import React, { useState, useRef, useEffect, useId } from "react";
import { StyleSheet, Text, View, Alert, ActivityIndicator } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContext, useAuth } from "../../auth/contextAuth";
import { Avatar } from "react-native-paper";
import useAxios from "../../customHooks/hookAxios";
import { Button, TextInput, IconButton, Icon } from "react-native-paper";
import { useContext } from "react";
const validationSchema = Yup.object().shape({
  email: Yup.string().required("El nombre de usuario es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria"),
});


export default function WorkerLoginScreen({ navigation, route }) {
  const { role } = route.params;

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { user, setUser } = useContext(AuthContext);

  const handleLogin = async (values) => {
    //getLogin();
    setLoading(true);
    user 
    try {
      const response = await useAxios("user/Autenticar", "post", JSON.stringify({
        email: values.email,
        password: values.password,
      }));

      if (response.data.resultado && response.data.token) {
        setData(response.data);
        await setUser(response.data);
        navigation.navigate("HomeWorker");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Error al iniciar sesion", "Error", [
        {
          text: "Aceptar",
          onPress: () => {},
        },
      ]);
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
        initialValues={{ email: '', password: '' }}
        onSubmit={handleLogin}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Correo"
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />


            {errors.email && <Text style={styles.error}>{errors.email}</Text>}

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
                onPress={() => role === '1' ? navigation.navigate('UserRegister', { role }) : navigation.navigate('UserRegister', { role })}
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
