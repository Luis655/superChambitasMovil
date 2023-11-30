import React, { useState, useEffect, useRef } from 'react';

import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Platform, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native';
import ModalChat from './ModalChat';
import { useDarkMode } from '../../auth/contextAuth';
import { TextInput, Appbar, Avatar } from 'react-native-paper'
import { Formik } from 'formik';
import * as yup from 'yup';
import { SelectList } from "react-native-dropdown-select-list";
import { Camera } from 'expo-camera';
import useAxiosGet from '../../customHooks/hookAxiosGet';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const SolicitarTrabajo = ({ Contador }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [foto, setFoto] = useState('');
  const [camaraFrontal, setCamaraFrontal] = useState(false);
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  const url = 'https://4e14-2806-10be-9-32a8-d088-7513-d5ee-a114.ngrok-free.app/api/categorias';
  const { data, error, loading } =  useAxiosGet(url);
  useEffect(() => {
    if (!loading) {
      console.log(data);
      if(data!==null){
        setDatos(data.map(item => ({ key: item.categoryId, value: item.titulo })));

      }
    }
  }, [data, loading]);
  const { colorMode, setDarkColorMode } = useDarkMode();
  const jobs = [
    { key: '1', value: 'trabajo 1' },
    { key: '2', value: 'trabajo 2' },
    { key: '3', value: 'trabajo 3' },
    { key: '4', value: 'trabajo 4' },
    { key: '5', value: 'trabajo 5' },
    { key: '6', value: 'trabajo 6' },
    { key: '7', value: 'trabajo 7' },
    { key: '8', value: 'trabajo 8' },
    { key: '9', value: 'trabajo 9' },
    { key: '10', value: 'trabajo 10' },
  ];
  const dataw = [
    { key: '1', value: 'Mobiles', disabled: true },
    { key: '2', value: 'Appliances' },
    { key: '3', value: 'Cameras' },
    { key: '4', value: 'Computers', disabled: true },
    { key: '5', value: 'Vegetables' },
    { key: '6', value: 'Diary Products' },
    { key: '7', value: 'Drinks' },
  ]

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(jobs);

  const [selectedChips, setSelectedChips] = useState([]);
  const handleChipPress = (value, index) => {
    setSelectedChips([...selectedChips, value]);

    selectedChips.map((data) => {
      setSelectedChips(selectedChips.filter((chip) => {
        console.log(chip)
        chip.id !== data.id
      }));
    })
  };

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

  const aceptado = (trabajo) => {
    Alert.alert(`¿Estás seguro de realizar esta acción?`, 'Aceptar', [
      { text: 'Aceptar', onPress: () => { Contador() } },
      { text: 'Cancelar', onPress: () => console.log('Cancelado'), style: 'cancel' },
    ]);
  };
  const hideModal = () => setVisible(false);

  const [isChatModalVisible, setIsChatModalVisible] = useState(false);

  const toggleChatModal = () => {
    setIsChatModalVisible(!isChatModalVisible);
    console.log({ isChatModalVisible })
  };

  const handleSubmit = (amount) => {
    console.log({ amount })
    toggleChatModal();
  };

  const theme = {
    colors: {
      primary: '#fff',
      text: '#fff',
      label: '#fff',

    },
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required('Campo requerido'),
    address: yup.string().required('Campo requerido'),
    description: yup.string().required('Campo requerido'),
    payment: yup.number().typeError('Debe ser un número').required('Campo requerido'),
  });
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  const [openCamera, setOpenCamera] = useState(false);
  const _handleMore = async () => {
    console.log("perra madre")
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
    if (status === 'granted') {
      setOpenCamera(!openCamera);
    }

  }
  const takePicture = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      console.log(uri);
      setFoto(uri);
      setOpenCamera(!openCamera);

    }
  };
  const tituloRef = useRef(null);
  const direccionRef = useRef(null);
  const descripcionRef = useRef(null);
  const pagoRef = useRef(null);


  return (


    <ScrollView>

      <Formik
        initialValues={{ title: '', address: '', description: '', payment: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          aceptado(values);
          // Handle form submission here
          console.log(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.card}>
            <Appbar.Header color='#FF5A5F' style={{ backgroundColor: 'transparent', borderRadius: 10 }}>
              <Appbar.Content color={colorMode ? '#fff' : '#000'} title="Crear una solicitud" />
              <Appbar.Action icon="camera" onPress={_handleMore} />
            </Appbar.Header>
            <SelectList
              setSelected={(val) => setValue(val)}
              data={datos}
              save="key"
              onSelect={() => alert(value)}
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
                {foto != '' ?
                  <TouchableOpacity onPress={_handleMore}>
                    <Avatar.Image size={80} style={{ backgroundColor: 'transparent' }} source={{ uri: foto }} />
                  </TouchableOpacity>

                  :

                  <TouchableOpacity onPress={_handleMore}>
                    <Avatar.Icon size={80} style={{ backgroundColor: 'transparent' }} icon="camera" />
                  </TouchableOpacity>
                }

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
