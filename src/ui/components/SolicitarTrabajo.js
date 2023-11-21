import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import ModalChat from './ModalChat';
import { useDarkMode } from '../../auth/contextAuth';
import {TextInput, Appbar, Chip, Modal} from 'react-native-paper'
import { Formik } from 'formik';
import * as yup from 'yup';
import DropDownPicker from 'react-native-dropdown-picker';
import { Camera } from 'expo-camera';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const SolicitarTrabajo = ({Contador}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [foto, setFoto] = useState('');
    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);
  const { colorMode, setDarkColorMode } = useDarkMode();
  const [text, setText] = useState("");
  const jobs = [
    { label: 'plomer', value: '1' },
    { label: 'electricista', value: '2' },
    { label: 'leñador', value: '3' },
    { label: 'Chapeador', value: '4' },
    { label: 'albañil', value: '5' },
    { label: 'plomer', value: '6' },
    { label: 'electricista', value: '7' },
    { label: 'leñador', value: '8' },
    { label: 'Chapeador', value: '9' },
    { label: 'albañil', value: '10' },

  ];
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(jobs);

  const [selectedChips, setSelectedChips] = useState([]);
  const handleChipPress = (value, index) => {
    setSelectedChips([...selectedChips, value]);


        selectedChips.map((data) =>{
            setSelectedChips(selectedChips.filter((chip) =>{
                console.log(chip)
                chip.id !== data.id
              } ));
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
      justifyContent: 'space-between',
    },
    card: {
      borderWidth: 1,
      borderColor: colorMode ? '#8ec3b9' : '#fff',
      borderRadius: 10,
      margin: 10,
      backgroundColor: colorMode ? '#3C7680' : '#fff',
      marginTop:0
      //elevation: 3,
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
      marginBottom: 5,
      color: colorMode ? '#fff': '#000'
    },
    jobType: {
      fontSize: 16,
      color: colorMode ? 'white' : 'green',
      marginBottom: 10,
      color: colorMode ? '#fff': '#000'

    },
    price: {
      fontSize: 14,
      marginBottom: 5,
      color: colorMode ? '#fff': '#000'

    },
    address: {
      fontSize: 14,
      marginBottom: 5,
      color: colorMode ? '#fff': '#000'

    },
    description: {
      fontSize: 14,
      color: colorMode ? '#fff': '#000'

    },
    textInput: {
        backgroundColor: colorMode ? '#6f9ba5' : '#fff',
        fontSize:17
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
      },
      descriptionInput: {
        height: 90,
      },
  });
  const [visible, setVisible] = useState(false);

  const hideDialog = () => setVisible(false);
//console.log(job.latlng.longitude)
  const aceptado = (trabajo) => {
    Alert.alert(`Estas seguro que deseas realizar esta accion`, '¿Aceptar?', [
        { text: 'Aceptar', onPress: () => {Contador()}},
        { text: 'Cancelar', onPress: () => console.log('Cancelado'), style: 'cancel' },
      ]);  
    };
  const hideModal = () => setVisible(false);

  const [isChatModalVisible, setIsChatModalVisible] = useState(false);

  const toggleChatModal = () => {
    setIsChatModalVisible(!isChatModalVisible);
    console.log({isChatModalVisible})
  };
  const handleSubmit = (amount) => {
    console.log({amount})
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
  const containerStyle = {backgroundColor: 'white', padding: 20};
  const [openCamera, setOpenCamera] = useState(false);
  const _handleMore = async () =>{
    console.log("perra madre")
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
    if(status ==='granted'){
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

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{flex:1}}>
    <View style={{
            flex: 1,
            justifyContent:'center',
            
    }}>



   
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
        <View>

            

          <View style={styles.card}>
          <Appbar.Header color='red' style={{ backgroundColor: 'transparent' }}>
            <Appbar.Content color={colorMode ? '#fff' : '#000'} title="Creé una solicitud"/>
            <Appbar.Action icon="camera" onPress={_handleMore} />

          </Appbar.Header>
          <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  defaultValue={'Mexico'}
                  placeholder="Selecciona un tipo de trabajo"
                  containerStyle={{ height: 'auto', marginBottom: '5%', flex: 2, width:'90%', alignSelf:'center', marginBottom:40 }}
                  style={{ backgroundColor: colorMode ? '#6f9ba5' : '#fff', borderWidth: .5, borderColor: '#ccc', borderRadius: .5, flex: 1 }}
                  itemStyle={{ justifyContent: 'flex-start' }}
                  dropDownStyle={{ backgroundColor: colorMode ? '#6f9ba5' : '#fff', borderWidth: .5, borderColor: '#ccc', borderRadius: .5 }}
                  onChangeItem={(item) => setFieldValue('phoneNumber', item.value)}
                />
            <ScrollView >

            <View style={styles.cardContent}>
                
              <TextInput
                style={styles.textInput}
                mode='outlined'
                activeOutlineColor={colorMode ? '#ccc': '#000'}
                label="Titulo del Trabajo"
                placeholder='Trabajo de plomero ......'
                value={values.title}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
              />
              {touched.title && errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

              <TextInput
                style={styles.textInput}
                mode='outlined'
                activeOutlineColor={colorMode ? '#ccc': '#000'}
                label="Direccion"
                placeholder='calle 59 por .....'
                value={values.address}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
              />
              {touched.address && errors.address && <Text style={styles.errorText}>{errors.address}</Text>}


              <TextInput
                style={[styles.textInput, styles.descriptionInput]}
                mode='outlined'
                activeOutlineColor={colorMode ? '#ccc': '#000'}
                label="Descripción"
                placeholder='Requiero un plomero para ....'
                value={values.description}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                multiline={true}
              />
              {touched.description && errors.description && (
                <Text style={styles.errorText}>{errors.description}</Text>
              )}
              <TextInput
                style={styles.textInput}
                mode='outlined'
                activeOutlineColor={colorMode ? '#ccc': '#000'}
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
              />
              {touched.payment && errors.payment && <Text style={styles.errorText}>{errors.payment}</Text>}


              <View style={styles.bottonsCard}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Solicitar Trabajador</Text>
                </TouchableOpacity>
              </View>
              <Image
      source={{ uri: foto }}
      style={{ width: 290, height: 290, marginTop:33 }}
    />
            </View>
            </ScrollView>

          </View>
        </View>
      )}
    </Formik>

   {openCamera &&
        <View style={{width:340, height:340, position:'absolute', top:22}}>
        <Camera
          style={{width:'100%', height:'100%'}}
          type={Camera.Constants.Type.back}
          ref={setCameraRef}
        >
          <View
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                alignSelf: 'flex-end',
                alignItems: 'center',
                backgroundColor:'red',
                marginTop:305
              }}
              onPress={takePicture}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                Capturar
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
}
    
    </View>
    </KeyboardAvoidingView>

  );

};


export default SolicitarTrabajo;
