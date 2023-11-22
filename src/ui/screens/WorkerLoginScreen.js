import React, { useState, useRef, useEffect, useId } from "react";
import { StyleSheet, Text, View, Alert, ActivityIndicator } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContext, useAuth } from "../../auth/contextAuth";
import { Avatar } from "react-native-paper";
import useAxios from "../../customHooks/hookAxios";
import { Button, TextInput, IconButton, Icon } from "react-native-paper";
import { useContext } from "react";
import {scheduleNotificationAsync} from 'expo-notifications';
const validationSchema = Yup.object().shape({
  username: Yup.string().required("El nombre de usuario es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria"),
});


export default function WorkerLoginScreen({ navigation, route }) {
  const { parametro } = route.params;

  const [credenciales, setCredenciales] = useState({ email: "", password: "" });
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const passwordRef = useRef(null);
  const { user,dispatch, setUser } = useContext(AuthContext);

  const handleLogin = async (values) => {
    //getLogin();
    setLoading(true);
user
    try {
      const response = await useAxios("user/Autenticar", "post", {
        email: values.username,
        password: values.password,
      });
  
      if (response.data.resultado && response.data.token) {
        setData(response.data);
        setUser(values.username);
        
        dispatch({ type: "SET_TOKEN", payload: response.token });
        if (parametro == 1) {
          dispatch({ type: "SET_TYPE", payload: "1" }); //tipo uno(1) es el trabajador, el que usara la app para trabajar
        } else {
          dispatch({ type: "SET_TYPE", payload: "2" }); //tipo dos(2) es usuario normal, el cliente que usara la app para contratar empleados
        }
        await scheduleNotificationAsync({
            identifier: Math.random().toString(),
            content: {
              title: "Bienvenido a SuperChambitas "+values.username,
            },
            trigger: null,
          });
        navigation.navigate("HomeWorker");
      }
    } catch (error) {
      setData("");
      console.error(error);
      setLoading(false);
      Alert.alert("Error al iniciar sesion", "Error", [
        {
          text: "Salir",
          onPress: () => console.log(""),
        },
        {
          text: "Aceptar",
          onPress: () => console.log(""),
        },
      ]);
    } finally {
        setLoading(false);
    }
   
  };
  return (
    <View style={styles.container}>
      {/* {loading && <ActivityIndicator size="large" />} */}

      <View style={styles.logoContainer}>
        <Avatar.Image
          style={{ backgroundColor: "#F5AF19" }}
          size={190}
          source={require("../../../assets/LogoSuperChambitas.png")}
        />

        <Text style={styles.logo}>SuperChambitas</Text>
      </View>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={handleLogin}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={styles.formContainer}>
            <TextInput
              mode="outlined"
              label="Correo"
              placeholder="Escribe tu correo"
              keyboardType="email-address"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
              onSubmitEditing={() => passwordRef.current.focus()}
              right={<TextInput.Affix text="/100" />}
            />
            {errors.username && (
              <Text style={styles.error}>{errors.username}</Text>
            )}

            <TextInput
              mode="outlined"
              label="Contraseña"
              placeholder="Escribe tu contraseña"
              secureTextEntry={!passwordVisible}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              ref={passwordRef}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
              right={
                <TextInput.Icon
                  icon={passwordVisible ? "eye-off" : "eye"}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              }
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

          

            <View style={styles.buttonContainer}>
           
              <Button
                loading={loading}
                disabled={loading}
                buttonColor="#168596"
                mode="contained"
                onPress={handleSubmit}
              >
                Iniciar sesión
              </Button>

              <View style={styles.orContainer}>
                <Text style={styles.orText}>O</Text>
              </View>

            
              <Button
                buttonColor="#F5AF19"
                mode="contained"
                onPress={() =>
                  parametro == "1"
                    ? navigation.navigate("WorkerRegister")
                    : navigation.navigate("UserRegister")
                }
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
  },
  formContainer: {
    width: "80%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  orButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    pointerEvents: "none",
  },
  registerButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  orButtonText: {
    color: "#007bff",
    fontSize: 16,
    fontWeight: "bold",
  },
  orContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  orText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: 30,
  },
});
