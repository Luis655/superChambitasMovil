import React, { useState, useEffect, useRef } from 'react';

import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Platform, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native';
import { useDarkMode } from '../../auth/contextAuth';
import { TextInput, Appbar, Avatar } from 'react-native-paper'
import { Camera } from 'expo-camera';
import useAxios from "../../customHooks/hookAxios";

import * as FileSystem from 'expo-file-system';
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const PhotoUser = ({navigation, route }) => {
  const {userData} = route.params
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [foto, setFoto] = useState('');
  const [camaraFrontal, setCamaraFrontal] = useState(false);
  const [datos, setDatos] = useState([]);
  const [visible, setVisible] = useState(false);


  const { colorMode, setDarkColorMode } = useDarkMode();


  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#ff9900',
      height: 50,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom:30
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


  const hideDialog = () => setVisible(false);


  const hideModal = () => setVisible(false);

  const [isChatModalVisible, setIsChatModalVisible] = useState(false);

  const toggleChatModal = () => {
    setIsChatModalVisible(!isChatModalVisible);
  };


 

  const [openCamera, setOpenCamera] = useState(false);
  const handleRegistration = async () => {
    //let {address, ...rest}= values
    //const userData = {...rest, categories: selected, phone:phoneNumber, location:address, name: nombreCompleto, role:parametro}
    //navigation.navigate('Mi perfil', {userData})
   try {
    //let {address,categories, ...rest}= values
    //categories = selected
    //const userData = {...rest, categories, phone:phoneNumber, location:address, name: nombreCompleto, role:parametro}
    const registration = await useAxios("user/registrar", "POST", JSON.stringify(userData));
    Alert.alert(
      `${registration.data}`,
    );
    navigation.navigate('WorkerLoginScreen', {userData})
    //navigation.navigate('WorkerLoginScreen', { parametro })
   } catch (error) {
    Alert.alert(
      `${error}`,
    );
   }
  };

  const _handleMore = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
    if (status === 'granted') {
      setOpenCamera(!openCamera);
    }

  }
  const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const { uri, base64 } = await cameraRef.takePictureAsync(options);

      setFoto(uri);
      setOpenCamera(!openCamera);
    }
  };


  return (


<>
        {openCamera ? (<View style={{borderRadius:10, flex: 1, height:'100%', width:'100%', backgroundColor:'red' }}>
          <Camera
            style={{ flex: 1, borderRadius:1000, overflow:'hidden' }}
            type={camaraFrontal ? Camera.Constants.Type.back : Camera.Constants.Type.front}
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
        </View>)
        : (
            <View style={{alignSelf:'center', paddingTop:'20%'}}>
                <Text style={{ fontSize:33, textAlign:'center', fontWeight:'500',paddingBottom:'15%'}}>Agrega una foto</Text>
                <TouchableOpacity style={{paddingBottom:'10%'}} onPress={()=>{setOpenCamera(!openCamera)}}>
                {foto != '' ?
                  <TouchableOpacity onPress={_handleMore}>
                    <Avatar.Image size={250} style={{ backgroundColor: 'transparent' }} source={{ uri: foto }} />
                  </TouchableOpacity>

                  :

                  <TouchableOpacity onPress={_handleMore}>
                  <Avatar.Icon style={{backgroundColor:'orange'}} color='red' size={250} icon="camera" />
                  </TouchableOpacity>
                }
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleRegistration}>
                <Text style={styles.buttonText}>Agregar información</Text>
              </TouchableOpacity>
                <TouchableOpacity onPress={handleRegistration}>
                    <Text style={{
                        fontSize:17, fontWeight:'400', color:'orange', 
                }}>Preguntame mas tarde</Text>
                </TouchableOpacity>
            </View>
            )
    }


</>
  );

};


export default PhotoUser;
