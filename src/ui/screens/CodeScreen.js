import React, { useState } from 'react';
import { Animated, View, PanResponder, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const menuWidth = 250;
const hiddenPosition = -menuWidth - 50;

const CustomDrawer = () => {
  const [pan] = useState(new Animated.ValueXY({ x: hiddenPosition, y: 0 }));
  const [isOpen, setIsOpen] = useState(false);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      if ((gestureState.dx > 0 && pan.x._value.x >= hiddenPosition) || (gestureState.dx < 0 && pan.x._value.x <= 0)) {
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
  });

  const openclosedrawer = () =>{
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

  return (
    <View style={styles.container}>
            <TouchableOpacity style={styles.floatingButton} onPress={openclosedrawer}>
        <Icon name="bars" size={25} color="#fff" />
      </TouchableOpacity>
      <Animated.View
        style={[styles.menu, { transform: [{ translateX: pan.x }] }]}
        {...panResponder.panHandlers}
      >
        <View style={styles.userContainer}>
          <Icon name="user-circle" size={60} style={styles.userIcon} />
          <Text style={styles.username}>Nombre de Usuario</Text>
        </View>
        <TouchableOpacity style={styles.menuItem} onPress={closeDrawer}>
          <Icon name="briefcase" size={20} style={styles.icon} />
          <Text style={styles.menuItemText}>Mis Trabajos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={closeDrawer}>
          <Icon name="cogs" size={20} style={styles.icon} />
          <Text style={styles.menuItemText}>Mis Servicios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={closeDrawer}>
          <Icon name="search" size={20} style={styles.icon} />
          <Text style={styles.menuItemText}>Encuentra Empleo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={closeDrawer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menu: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 302,
    backgroundColor: '#ffffff',
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
  },
  userIcon: {
    color: '#3498db',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  menuItem: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    marginRight: 15,
    color: '#3498db',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
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
  },
  floatingButton: {
    position: 'absolute',
    backgroundColor: '#3498db',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    elevation: 5,
  },
});

export default CustomDrawer;
