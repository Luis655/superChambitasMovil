import React, { useState, useEffect, useRef, useContext } from 'react';

import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Platform, KeyboardAvoidingView, ScrollView, Keyboard, ActivityIndicator } from 'react-native';
import ModalChat from './ModalChat';
import { useDarkMode } from '../../auth/contextAuth';
import { TextInput, Appbar, Avatar } from 'react-native-paper'
import { Formik } from 'formik';
import * as yup from 'yup';
import { SelectList } from "react-native-dropdown-select-list";
import { Camera } from 'expo-camera';
import useAxios from "../../customHooks/hookAxios";

import { AuthContext, useAuth } from "../../auth/contextAuth";

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const SolicitarTrabajo = ({ Contador, toggleModal, location }) => {
  const { user, profile } = useContext(AuthContext);
  const { id, userName, email, phone, role } = user

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [foto, setFoto] = useState('');
  const [camaraFrontal, setCamaraFrontal] = useState(false);
  const [datos, setDatos] = useState([]);
  const [estadomsg, setEstadomsg] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  const getCategories = async () => {
    const { data } = await useAxios("categorias", "GET");
    setDatos(data.map(item => ({ key: item.categoryId, value: item.titulo })))
  }
  useEffect(() => {
    getCategories();
  }, [])


  const { colorMode, setDarkColorMode } = useDarkMode();

  const [value, setValue] = useState(null);

  const [selectedChips, setSelectedChips] = useState([]);

  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#ff9900',
      height: 50,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      margin: 11
    },
    bottonsCard: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignSelf: 'center',
      marginBottom: 35
    },
    card: {
      borderWidth: 1,
      borderColor: colorMode ? '#8ec3b9' : '#fff',
      backgroundColor: colorMode ? '#8ec3b9' : '#fff',
      borderRadius: 10,
      backgroundColor: colorMode ? '#3C7680' : '#fff',
      height: '95%'
    },
    image: {
      height: 200,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    cardContent: {
      padding: 15,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colorMode ? '#fff' : '#000'
    },
    jobType: {
      fontSize: 16,
      color: colorMode ? 'white' : 'green',
      color: colorMode ? '#fff' : '#000'
    },
    price: {
      fontSize: 14,
      color: colorMode ? '#fff' : '#000'
    },
    address: {
      fontSize: 14,
      color: colorMode ? '#fff' : '#000'
    },
    description: {
      fontSize: 14,
      color: colorMode ? '#fff' : '#000'
    },
    textInput: {
      backgroundColor: colorMode ? '#6f9ba5' : '#fff',
      fontSize: 17,
      marginBottom: 10,
      borderRadius: 5,
      justifyContent: 'center'
    },
    errorText: {
      color: 'red',
      fontSize: 12,
    },
    descriptionInput: {
      height: 90,
    },
    buttonText: {
      color: '#fff',
    }
  });

  const [visible, setVisible] = useState(false);

  const hideDialog = () => setVisible(false);
  // const handleRegistration = async () => {

  //  try {
  //   const userData = {
  //     "title": "busco trabajor",
  //     "userId": 22,
  //     "description": "string",
  //     "categoryId": "3", 
  //     "price": 500,
  //     "fecha": "2023-12-01"
  //    }
  //   const registration = await useAxios("user/registrar", "POST", JSON.stringify(userData));


  //   Alert.alert(
  //     `${JSON.stringify(registration.data)}`,
  //   );
  //   //navigation.navigate('WorkerLoginScreen', { parametro })
  //  } catch (error) {
  //   Alert.alert(
  //     `${error}`,
  //   );
  //  }
  // };
  const chambaAcept = (values) => {
    Alert.alert(`¿Estás seguro de realizar esta acción?`, 'Aceptar', [
      { text: 'Aceptar', onPress: () => { aceptado(values) } },
      { text: 'Cancelar', onPress: () => { }, style: 'cancel' },
    ]);
  }
  const aceptado = async (trabajo) => {
    setEstadomsg(true)
    const userData = {
      "title": trabajo.title,
      "userId": id,
      "address":trabajo.address,
      "location":JSON.stringify(location),
      "description": trabajo.description,
      "categoryId": value.toString(),
      "price": trabajo.payment,
      "fecha": new Date(),
      "image": foto
    }
    try {

      const registration = await useAxios("Service/CrearServicio", "POST", JSON.stringify(userData));
      Alert.alert(
        `¡¡Servicio creado con exito!!`,
      );
      // Contador(registration.data.serviceId.toString())
      // navigation.navigate('WorkerLoginScreen', {userData})
      //navigation.navigate('WorkerLoginScreen', { parametro })
    } catch (error) {
      Alert.alert(
        `!Upps, ha ocurrido un error¡¡`,
      );
    } finally {
      setEstadomsg(false);
    }

  };
  // const hideModal = () => setVisible(false);

  const [isChatModalVisible, setIsChatModalVisible] = useState(false);

  const toggleChatModal = () => {
    setIsChatModalVisible(!isChatModalVisible);
  };

  const handleSubmit = (amount) => {
    toggleChatModal();
  };


  const validationSchema = yup.object().shape({
    title: yup.string().required('Campo requerido'),
    address: yup.string().required('Campo requerido'),
    description: yup.string().required('Campo requerido'),
    payment: yup.number().typeError('Debe ser un número').required('Campo requerido'),
  });

  const [openCamera, setOpenCamera] = useState(false);
  const _handleMore = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
    if (status === 'granted') {
      setOpenCamera(!openCamera);
    }

  }
  const takePicture = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      setFoto(uri);
      setOpenCamera(!openCamera);

    }
  };
  const direccionRef = useRef(null);
  const descripcionRef = useRef(null);
  const pagoRef = useRef(null);


  return (


    <ScrollView>
      {estadomsg &&
        <View style={styles.activityIndicator}>
          <ActivityIndicator animating={estadomsg} color="orange" size={140} />
        </View>}

      <Formik
        initialValues={{ title: '', address: '', description: '', payment: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          chambaAcept(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.card}>
            <Appbar.Header color='#FF5A5F' style={{ backgroundColor: 'transparent', borderRadius: 10 }}>
              <Appbar.Content color={colorMode ? '#fff' : '#000'} title="Crear una solicitud" />
              {/* <Appbar.Action icon="camera" onPress={_handleMore} /> */}
            </Appbar.Header>
            <SelectList
              setSelected={(val) => setValue(val)}
              data={datos}
              save="key"
              onSelect={()=>{}}
              label="Selecciona el trabajo"
              labelStyles={{ fontWeight: '900' }}
              placeholder="Selecciona tu trabajo"
              searchPlaceholder="Buscar"
              notFoundText="Sin datos para mostrar"
              defaultOption={{ key: '0', value: 'Selecciona un trabajo' }}   //default selected option
              boxStyles={{ backgroundColor: colorMode ? '#6f9ba5' : '#fff', color: '#fff', width: '96%', alignSelf: 'center' }}
              dropdownItemStyles={{ backgroundColor: colorMode ? '#6f9ba5' : '#fff', width: '90%', alignSelf: 'center' }}
              dropdownTextStyles={{ color: colorMode ? '#fff' : '#000' }}



            />

            <View style={styles.cardContent}>
              <TextInput
                style={styles.textInput}
                mode='outlined'
                activeOutlineColor={colorMode ? '#ccc' : '#000'}
                label="Titulo del Trabajo"
                placeholder='Trabajo de plomero ......'
                value={values.title}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                returnKeyType="next"
                onSubmitEditing={() => { Keyboard.dismiss(), direccionRef.current.focus() }}

              />
              {touched.title && errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

              <TextInput
                style={styles.textInput}
                mode='outlined'
                activeOutlineColor={colorMode ? '#ccc' : '#000'}
                label="Direccion"
                placeholder='calle 59 por .....'
                value={values.address}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                ref={direccionRef}
                returnKeyType="next"
                onSubmitEditing={() => { Keyboard.dismiss(), descripcionRef.current.focus() }}


              />
              {touched.address && errors.address && <Text style={styles.errorText}>{errors.address}</Text>}


              <TextInput
                style={[styles.textInput, styles.descriptionInput]}
                mode='outlined'
                activeOutlineColor={colorMode ? '#ccc' : '#000'}
                label="Descripción"
                placeholder='Requiero un plomero para ....'
                value={values.description}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                multiline={true}
                ref={descripcionRef}


                textAlignVertical="top"
                numberOfLines={4}
                keyboardType="default"
                returnKeyType="next"
                blurOnSubmit={true}
                onSubmitEditing={() => { Keyboard.dismiss(), pagoRef.current.focus() }}
                right={<TextInput.Affix text={values.description.length + "/200"} />}
              />
              {touched.description && errors.description && (
                <Text style={styles.errorText}>{errors.description}</Text>
              )}
              <TextInput
                style={styles.textInput}
                mode='outlined'
                activeOutlineColor={colorMode ? '#ccc' : '#000'}
                label="¿Cuanto pagaras?"
                placeholder='599 pesos'
                value={values.payment}
                onChangeText={(value) => {
                  // Only allow numeric input
                  if (/^\d+$/.test(value) || value === '') {
                    handleChange('payment')(value);
                  }
                }}
                onBlur={handleBlur('payment')}
                keyboardType="numeric"
                ref={pagoRef}
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
              />
              {touched.payment && errors.payment && <Text style={styles.errorText}>{errors.payment}</Text>}

              <View style={styles.bottonsCard}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Solicitar Trabajador</Text>
                </TouchableOpacity>
                {/* {foto != '' ?
                  <TouchableOpacity onPress={_handleMore}>
                    <Avatar.Image size={80} style={{ backgroundColor: 'transparent' }} source={{ uri: foto }} />
                  </TouchableOpacity>

                  :

                  <TouchableOpacity onPress={_handleMore}>
                    <Avatar.Icon size={80} style={{ backgroundColor: 'transparent' }} icon="camera" />
                  </TouchableOpacity>
                } */}

              </View>

            </View>

          </View>
        )}
      </Formik>

      {openCamera && (
        <View style={{ flex: 1, height: '100%', width: '100%', position: 'absolute', top: 0 }}>
          <Camera
            style={{ flex: 1 }}
            type={!camaraFrontal ? Camera.Constants.Type.back : Camera.Constants.Type.front}
            ref={setCameraRef}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                padding: 16,
                justifyContent: 'center'
              }}
            >
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  padding: 10,
                  flexDirection: 'row',
                }}
                onPress={() => { setOpenCamera(!openCamera); setFoto('') }}
              >
                <Avatar.Icon style={{ backgroundColor: 'transparent' }} size={70} icon="close-circle" />

              </TouchableOpacity>


              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  padding: 10,
                  flexDirection: 'row',
                }}
                onPress={takePicture}
              >
                <Avatar.Icon style={{ backgroundColor: 'transparent' }} size={70} icon="camera" />

              </TouchableOpacity>



              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  padding: 10,
                  flexDirection: 'row',
                }}
                onPress={() => { setCamaraFrontal(!camaraFrontal) }}
              >
                <Avatar.Icon style={{ backgroundColor: 'transparent' }} size={70} icon="camera-party-mode" />

              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      )}
    </ScrollView>



  );

};


export default SolicitarTrabajo;
