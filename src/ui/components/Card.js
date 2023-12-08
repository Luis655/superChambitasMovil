import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import ModalChat from './ModalChat';
import { useDarkMode } from '../../auth/contextAuth';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Card = ({index, job, aceptarTrabajo, onClose, handleOffert }) => {
  const { colorMode, setDarkColorMode } = useDarkMode();
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
      backgroundColor: colorMode ? '#1a3646' : '#fff',
      elevation: 3,
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
  });
  
  const aceptado = (trabajo) => {
    Alert.alert(`Aceptar el trabajo: ${trabajo.title}`, '¿Aceptar?', [
      { text: 'Aceptar', onPress: () => {aceptarTrabajo(trabajo), onClose()} },
      { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
    ]);
  };
  const [isChatModalVisible, setIsChatModalVisible] = useState(false);

  const toggleChatModal = () => {
    setIsChatModalVisible(!isChatModalVisible);
  };
  const handleSubmit = (amount) => {
    toggleChatModal();
  };

  return (
    <View style={styles.card}>
      {/* <Image source={{ uri: job.image }} style={styles.image} /> */}
      <View style={styles.cardContent}>
        <Text style={{textAlign:'right' }}><TouchableOpacity onPress={toggleChatModal}><MaterialCommunityIcons name='chat' size={28}/></TouchableOpacity> </Text>
        <Text style={styles.name}>{job.title}</Text>
        <Text style={styles.jobType}>{job.categoryName}</Text>
        <Text style={styles.price}>Precio: {job.price}</Text>
        <Text style={styles.address}>Dirección: {job.address}</Text>
        <Text style={styles.description}>Descripción: {job.description}</Text>
        <View style={[styles.bottonsCard]}>
          <ModalChat visible={isChatModalVisible} onClose={toggleChatModal} name={job.name} price={job.price} id={job.serviceId} />

          <TouchableOpacity
            style={[styles.button]}
            onPress={() => aceptado(job)}
          >
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button]}
            onPress={()=>{handleOffert(job.serviceId) }}
          >
            <Text style={styles.buttonText}>Contra-oferta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


export default Card;
