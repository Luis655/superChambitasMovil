import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Alert, Button } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("El nombre de usuario es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria"),
});
export default function WorkerLoginScreen({ navigation }) {
  const passwordRef = useRef(null);

  const handleLogin = (values) => {
    
    navigation.navigate("HomeWorker");

  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
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
              style={styles.input}
              placeholder="Nombre de usuario"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
              onSubmitEditing={() => passwordRef.current.focus()}
            />
            {errors.username && (
              <Text style={styles.error}>{errors.username}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              secureTextEntry={true}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              ref={passwordRef}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
              </TouchableOpacity>

              <View style={styles.orContainer}>
                <Text style={styles.orText}>O</Text>
              </View>

              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => navigation.navigate("WorkerRegister")}
              >
                <Text style={styles.orButtonText}>Registrarse</Text>
              </TouchableOpacity>
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
