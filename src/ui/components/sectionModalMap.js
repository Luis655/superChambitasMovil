import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Modal, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useDarkMode } from '../../auth/contextAuth';
import SolicitarTrabajo from './SolicitarTrabajo';

const FloatingSection = ({ visible, onClose, isActive, Contador }) => {
  const { colorMode } = useDarkMode();

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      height: 800,
    },
    modalContent: {
      backgroundColor: colorMode ? '#ffffff' : '#1d2c4d',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      height: 750,
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#ff9900',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    closeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      color: '#fff',

    },
    closeButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 5,
    },
    requestServiceText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
    },
    searchButton: {
      backgroundColor: '#ffcc00',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginBottom: 20,
    },
    searchButtonText: {
      color: '#000',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onSwipeComplete={onClose}
      swipeDirection={['down']}
    >
      <View style={styles.modalContainer}>
        <ActivityIndicator animating={isActive} />
        <View style={styles.modalContent}>

          <View style={styles.container}>
            <Text style={styles.requestServiceText}>Solicitar Servicio</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <MaterialIcons name="close" size={30} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={{ height: '100%', maxHeight: '100%' }}>
            <SolicitarTrabajo Contador={Contador}/>
          </View>

        </View>
      </View>
    </Modal>
  );
};

export default FloatingSection;
