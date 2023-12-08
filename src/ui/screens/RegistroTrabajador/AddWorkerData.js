import React, { useState, useRef, useEffect } from "react";
import { Alert,View, Text, Button, StyleSheet, Image, TouchableOpacity, ScrollView, Keyboard } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { TextInput } from 'react-native-paper';
import useAxios from "../../../customHooks/hookAxios";

const AddWorkerDataSchema = Yup.object().shape({
  description: Yup.string()
    .required("La descripción es requerida")
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(300, "La descripción no debe exceder los 300 caracteres"),
  address: Yup.string()
    .required("La dirección es requerida")
    .min(5, "La dirección debe tener al menos 5 caracteres")
    .max(100, "La dirección no debe exceder los 100 caracteres"),
    password: Yup.string()
    .required("La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 5 caracteres"),
    email: Yup.string()
    .required("El correo es requerido")
});



const AddWorkerData = ({ navigation, route }) => {
  const { role, nombreCompleto, phoneNumber} = route.params;
  const [selected, setSelected] = useState([]);
  const handleRegistration = async (values) => {
    let {address, ...rest}= values
    const userData = {...rest, categories: selected, phone:phoneNumber, location:address, name: nombreCompleto, role:role}
    navigation.navigate('Mi perfil', {userData})
 
  //  try {
    
  //   let {address,categories, ...rest}= values
  //   categories = selected
  //   const userData = {...rest, categories, phone:phoneNumber, location:address, name: nombreCompleto, role:parametro}
  //   const registration = await useAxios("user/registrar", "POST", JSON.stringify(userData));
  //   Alert.alert(
  //     `${registration.data}`,
  //   );
  //   navigation.navigate('Toma tu foto', { parametro })
  //   //navigation.navigate('WorkerLoginScreen', { parametro })
  //  } catch (error) {
  //   Alert.alert(
  //     `${error}`,
  //   );
  //  }
  };
  const direccionRef = useRef(null);
  const [data, setData] = useState([])

  const getCategories = async () => {
    const { data } = await useAxios("categorias", "GET");
    setData(data.map(item => ({ key: item.categoryId, value: item.titulo })))
  }
  useEffect(() => {
    getCategories();
  }, [])
  return (<>
    <ScrollView>

      <View style={styles.header}>
        <Image style={styles.logo} source={require('../../../../assets/LogoSuperChambitas.png')} />
      </View>
      <Text style={[styles.title, { textAlign: 'center' }]}>
        Cuentanos más sobre ti
      </Text>
      <View style={styles.cont2}>

        <View style={styles.trabajos}>

          <MultipleSelectList
            setSelected={(val) => setSelected(val)}
            data={data}
            label="Lo que sabes hacer"
            notFoundText="Sin datos para mostrar"
            searchPlaceholder="Buscar"
            selectedItemsText="Lo que sabes hacer"
            save="key"
            labelStyles={{ fontWeight: '900' }}
            placeholder="Selecciona tus trabajos"
          />
        </View>
        <Formik
          initialValues={{
            categories: [],
            description: "",
            address: "",
            password:"",
            email:""
          }}
          validationSchema={AddWorkerDataSchema}
          onSubmit={handleRegistration}
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



              <Text style={styles.label}>Descripción:</Text>
              <TextInput
                style={{ height: 90, textAlign: 'auto' }}
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
                placeholder="Escribe una descripción"
                textAlignVertical="top"
                numberOfLines={4}
                keyboardType="default"
                returnKeyType="next"
                multiline={true}
                blurOnSubmit={true}
                onSubmitEditing={() => { Keyboard.dismiss(), direccionRef.current.focus() }}
                mode="outlined"
                label="Descripcion de usted"
                right={<TextInput.Affix text={values.description.length + "/200"} />}
              />
              {touched.description && errors.description && (
                <Text style={styles.errorText}>{errors.description}</Text>
              )}

              <Text style={styles.label}>Dirección:</Text>
              <TextInput
                mode="outlined"
                style={styles.input}
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
                value={values.address}
                placeholder="Escribe la dirección"
                returnKeyType="next"
                ref={direccionRef}
              />
              {touched.address && errors.address && (
                <Text style={styles.errorText}>{errors.address}</Text>
              )}
              <Text style={styles.label}>Correo:</Text>
              <TextInput
                mode="outlined"
                keyboardType="email-address"
                style={styles.input}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="Escribe tu correo"
                returnKeyType="next"
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <Text style={styles.label}>Contraseña:</Text>
              <TextInput
                mode="outlined"
                keyboardType="visible-password"
                style={styles.input}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholder="Escribe tu contraseña"
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Agregar información</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        {/* <TouchableOpacity onPress={() => { navigation.navigate('HomeWorker', { parametro }) }}>
          <Text style={[styles.omitText, { textAlign: 'center' }]}>

            Dejar para despues
          </Text>
        </TouchableOpacity> */}

      </View>
    </ScrollView>

  </>
  );
};

const styles = StyleSheet.create({
  cont2: {
    flex: 1,
    justifyContent: 'center',

  },
  cont: {
    flex: 1,

    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginVertical: 6,

  },
  trabajos: {
    marginTop: 6,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginVertical: 6,
  },
  container: {

    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginVertical: 1,
    paddingBottom: 20
  },
  logo: {
    alignSelf: 'center',
    width: 180,
    height: 180,
  },
  title: {
    fontSize: 23,
    fontWeight: "500",
    paddingTop: 0,
    textAlign: "center",

  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: "#333333",
  },
  input: {
    height: 40,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
  omitText: {
    textAlign: "center",
    marginTop: 16,
    color: "#4CAF50",
    fontSize: 16,
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

export default AddWorkerData;
