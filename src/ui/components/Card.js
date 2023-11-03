import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import ModalChat from './ModalChat';
const Card = ({index, job, aceptarTrabajo, onClose }) => {

//console.log(job.latlng.longitude)
  const aceptado = (trabajo) => {
    Alert.alert(`Aceptar el trabajo ${trabajo}`, '¿Aceptar?', [
      { text: 'Aceptar', onPress: () => {aceptarTrabajo(job.latlng.latitude, job.latlng.longitude), onClose()} },
      { text: 'Cancelar', onPress: () => console.log('Cancelado'), style: 'cancel' },
    ]);
  };
  const [isChatModalVisible, setIsChatModalVisible] = useState(false);

  const toggleChatModal = () => {
    setIsChatModalVisible(!isChatModalVisible);
    console.log({isChatModalVisible})
  };
  const handleSubmit = (amount) => {
    console.log({amount})
    toggleChatModal();
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: "https://i.pravatar.cc/150?img"+index }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{job.name}</Text>
        <Text style={styles.jobType}>{job.jobType}</Text>
        <Text style={styles.price}>Precio: {job.price}</Text>
        <Text style={styles.address}>Dirección: {job.address}</Text>
        <Text style={styles.description}>{job.description}</Text>
        <View style={[styles.bottonsCard]}>
          <ModalChat visible={isChatModalVisible} onClose={toggleChatModal} name={job.name} price={job.price} />

          <TouchableOpacity
            style={[styles.button]}
            onPress={() => aceptado(job.jobType)}
          >
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button]}
            onPress={toggleChatModal}
          >
            <Text style={styles.buttonText}>Contra-oferta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
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
    borderColor: '#ccc',
    borderRadius: 10,
    margin: 10,
    backgroundColor: '#fff',
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
  },
  jobType: {
    fontSize: 16,
    color: 'green',
    marginBottom: 10,
  },
  price: {
    fontSize: 14,
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
  },
});

export default Card;
