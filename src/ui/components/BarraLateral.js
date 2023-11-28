import React, { useEffect, useState } from "react";
import { View, Alert, StyleSheet, FlatList, Modal, Text, Animated, TouchableOpacity, PanResponder } from 'react-native';
import { Drawer, FAB, Button, ActivityIndicator, MD2Colors, Avatar } from 'react-native-paper';

import { useDarkMode } from '../../auth/contextAuth';
import Icon from 'react-native-vector-icons/FontAwesome';
const menuWidth = 250;
const hiddenPosition = -menuWidth - 50;


const BarraLateral = ({navigation, toggleFloatingSection}) => {

    const { colorMode, setDarkColorMode } = useDarkMode();

     //MENU 

  const [pan] = useState(new Animated.ValueXY({ x: hiddenPosition, y: 0 }));
  const [isOpen, setIsOpen] = useState(false);

  const panResponder = PanResponder.create({
    onStartShouldSetResponderCapture: () => false,
    onStartShouldSetPanResponderCapture: () => false,
    onStartShouldSetPanResponder: () => true,


    onPanResponderMove: (_, gestureState) => {
      if (
        (gestureState.dx > 0 && pan.x._value.x >= hiddenPosition) ||
        (gestureState.dx < 0 && pan.x._value.x <= 0)
      ) {
        pan.setValue({ x: gestureState.dx, y: 0 });
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > 50) {
        openDrawer();
      } else if (gestureState.dx < -50) {
        closeDrawer();
      } else {
        resetPosition();
      }
    },
    onMoveShouldSetPanResponder: (_, gestureState) => {
      // Permitir el gesto solo si no estás en los bordes del cajón
      return (
        (gestureState.dx > 20 && pan.x._value.x >= 20) ||
        (gestureState.dx < 20 && pan.x._value.x <= 20)
      );
    },
  });


  const openclosedrawer = () => {
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }

  const openDrawer = () => {
    Animated.timing(pan.x, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsOpen(true);
  };

  const closeDrawer = () => {
    Animated.timing(pan.x, {
      toValue: hiddenPosition,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsOpen(false);
  };

  const resetPosition = () => {
    Animated.timing(pan.x, {
      toValue: isOpen ? 0 : hiddenPosition,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

    const styles = StyleSheet.create({
        containers: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#fff', // Fondo blanco similar al de Didi
          elevation: 5, // Sombra para dar un efecto visual similar al de Didi
          alignItems: 'center',
          justifyContent: 'center',
        },
        waitingContainer: {
          alignItems: 'center',
        },
        waitingText: {
          fontSize: 24,
          fontWeight: 'bold',
          color: '#333', // Color oscuro similar al de Didi
          marginBottom: 10,
        },
        timerText: {
          fontSize: 40,
          fontWeight: 'bold',
          color: '#ff9900', // Naranja similar al de Didi
        },
        activityIndicator: {
          position: 'absolute',
          margin: 16,
          //right: 'auto',
          alignSelf: 'center',
          bottom: 400,
          backgroundColor: 'transparent',
    
        },
        containere: {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          // Otros estilos del contenedor principal aquí
        },
        fab: {
          backgroundColor: '#E0E0E0', // Color gris claro similar al de Didi
          borderRadius: 20, // Ajusta según tus preferencias
          width: 400,
          padding: 15, // Ajusta según tus preferencias
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 5,
          position: 'absolute',
          bottom: 20, // Ajusta según la posición deseada desde la parte inferior
          borderWidth: 30, // Ancho del borde
          borderColor: 'white', // Color del borde
        },
        text: {
          color: 'black',
          marginLeft: 10,
          fontSize: 20, // Ajusta según tus preferencias
          fontWeight: 'bold',
        },
        container: {
          flex: 1,
          height: '100%',
    
        },
        floatingButton: {
          position: 'absolute',
          bottom: -10,
          backgroundColor: 'blue',
          padding: 15,
          borderRadius: 30,
          marginLeft: 50,
          width: '70%',
    
    
        },
        floatingButtonText: {
          color: '#fff',
          alignSelf: 'center',
          fontSize: 20,
        },
        map: {
          flex: 1,
          height: "100%"
        },
        overlay: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          padding: 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          overflow: 'hidden',
        },
    
        container2: {
          flex: 1,
          position: 'absolute',
          //backgroundColor: 'red',
    
    
        },
        menu: {
          left: 0,
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: 302,
          backgroundColor: colorMode ? '#ffffff' : '#ffffff',
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          paddingVertical: 20,
        },
        userContainer: {
          alignItems: 'center',
          marginBottom: 20,
          backgroundColor: 'rgba(255, 255, 255, 0.5)', // Fondo semi-transparente
    
          borderRadius: 10,
          padding: 25,
          backdropFilter: 'blur(10px)', // Ajusta el valor según tus preferencias
        },
    
    
    
        userRow: {
          flexDirection: 'row',
          alignItems: 'center',
        },
    
        userContainerContent: {
          marginRight: 10, // Ajusta según tus preferencias
    
        },
    
        userIcon: {
          width: 60,
          height: 60,
          borderRadius: 30,
        },
    
        userInfo: {
          flex: 1,
        },
    
        username: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#333', // Ajusta según tus preferencias
        },
    
        editProfileContainer: {
          flexDirection: 'row',
          alignItems: 'center',
        },
    
        editProfileText: {
          color: '#888', // Color gris
          fontSize: 16,
          marginRight: 5, // Ajusta según tus preferencias
        },
    
        editProfileIcon: {
          color: '#888', // Color gris para el icono
        },
        menuItem: {
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 20,
          color: colorMode ? '#fff' : '#000',
          borderBottomWidth: 1,
          borderBottomColor: colorMode ? '#fff' : '#ddd', // Ajusta el color del borde según el modo
        },
        icon: {
          marginRight: 15,
          color: '#3498db',
        },
        menuItemText: {
          fontSize: 16,
          color: colorMode ? '#fff' : '#333',
          fontFamily: 'Arial', // Ajusta la fuente según tu preferencia
        },
        workerModeButtonContainer: {
          marginTop: 'auto',
          paddingHorizontal: 20,
        },
        workerModeButton: {
          backgroundColor: '#4CAF50',
          borderRadius: 5,
          paddingVertical: 10,
          alignItems: 'center',
        },
        workerModeButtonText: {
          color: '#ffffff',
          fontWeight: 'bold',
          fontSize: 18,
        },
        floatingButton: {
          position: 'absolute',
          backgroundColor: colorMode ? '#fff' : '#fff',
          width: 50,
          height: 50,
          top: 30,
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
          right: isOpen ? '6%' : '85%', //o 10
          elevation: 5,
        },
        modalContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        modalContent: {
          width: 300,
          padding: 20,
          backgroundColor: '#fff',
          borderRadius: 10,
          alignItems: 'center',
        },
        title: {
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 10,
          color: '#ff9900',
        },
        message: {
          marginBottom: 20,
          color: '#555',
        },
        confirmButton: {
          backgroundColor: '#ff9900',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
          marginBottom: 10,
        },
        cancelButton: {
          backgroundColor: '#ff0000',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
          marginBottom: 10,
        },
        buttonText: {
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'center',
        },
        closeButton: {
          marginTop: 10,
        },
      });
    return (
        <>
            <TouchableOpacity style={styles.floatingButton} onPress={openclosedrawer}>
                <Icon name={isOpen ? 'times' : 'bars'} size={25} color="#000" />
            </TouchableOpacity>
            <Animated.View
                style={[styles.menu, { transform: [{ translateX: pan.x }] }]}
                {...panResponder.panHandlers}>
                <View style={styles.userContainer}>
                    <View style={styles.userRow}>

                        <View style={styles.userInfo}>
                            <Text style={styles.username}>Luis Macias</Text>
                            <TouchableOpacity style={styles.editProfileContainer}>
                                <Text style={styles.editProfileText}>Editar perfil</Text>
                                <Icon name="chevron-right" size={10} color="#888" style={styles.editProfileIcon} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={openclosedrawer}>
                            <View style={styles.userContainerContent}>
                                <Avatar.Image size={60} style={styles.userIcon} source={{ uri: 'https://picsum.photos/700' }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>


                <TouchableOpacity style={styles.menuItem} onPress={() =>  navigation.navigate('Mis trabajos')}>
                    <Icon name="briefcase" size={20} style={styles.icon} />
                    <Text style={styles.menuItemText}>Mis Trabajos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={closeDrawer}>
                    <Icon name="cogs" size={20} style={styles.icon} />
                    <Text style={styles.menuItemText}>Mis Servicios</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={toggleFloatingSection}>
                    <Icon name="search" size={20} style={styles.icon} />
                    <Text style={styles.menuItemText}>Encuentra Empleo</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => { console.warn("seleccion"); navigation.navigate('Configuraciones'); }}>
                    <Icon name="cog" size={20} style={styles.icon} />
                    <Text style={styles.menuItemText}>Configuraciones</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={closeDrawer}>
                    <Icon name="question" size={20} style={styles.icon} />
                    <Text style={styles.menuItemText}>Ayuda</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={closeDrawer}>
                    <Icon name="life-ring" size={20} style={styles.icon} />
                    <Text style={styles.menuItemText}>Soporte</Text>
                </TouchableOpacity>

                <View style={styles.workerModeButtonContainer}>
                    <TouchableOpacity style={styles.workerModeButton} onPress={closeDrawer}>
                        <Text style={styles.workerModeButtonText}>Modo Trabajador</Text>
                    </TouchableOpacity>
                </View>

            </Animated.View>
        </>
    )
}

export default BarraLateral;