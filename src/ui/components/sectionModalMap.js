import React from 'react';
import { View, Modal, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Card from './Card'; // Asegúrate de importar el componente Card desde la ubicación correcta

const FloatingSection = ({ visible, onClose, onSearchJobs }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchButton} onPress={onSearchJobs}>
            <Text style={styles.searchButtonText}>Activar</Text>
          </TouchableOpacity>
          <ScrollView style={styles.scrollView}>

            <Text style={styles.textStyle}>Trabajos disponibles en tu area</Text>

            {
              jobData.map((job) => (
                <Card {...job} />
              ))
            }
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const jobData = [{
  name: 'Juan Pérez',
  jobType: 'Plomero',
  price: '$50',
  imageUri: 'https://1.bp.blogspot.com/_EZ16vWYvHHg/S7ipNUpJfzI/AAAAAAAAJnA/OvBcbs5fPP8/s1600/www.BancodeImagenesGratuitas.com-Jirafas-1000x-1.jpg',
  address: '123 Calle Principal, Ciudad',
  description: 'Reparación de tuberías y grifos en el baño.'
},
{
  name: 'Juan Pérez',
  jobType: 'Plomero',
  price: '$50',
  imageUri: 'https://1.bp.blogspot.com/_EZ16vWYvHHg/S7ipNUpJfzI/AAAAAAAAJnA/OvBcbs5fPP8/s1600/www.BancodeImagenesGratuitas.com-Jirafas-1000x-1.jpg',
  address: '123 Calle Principal, Ciudad',
  description: 'Reparación de tuberías y grifos en el baño.'
},
{
  name: 'Juan Pérez',
  jobType: 'Plomero',
  price: '$50',
  imageUri: 'https://1.bp.blogspot.com/_EZ16vWYvHHg/S7ipNUpJfzI/AAAAAAAAJnA/OvBcbs5fPP8/s1600/www.BancodeImagenesGratuitas.com-Jirafas-1000x-1.jpg',
  address: '123 Calle Principal, Ciudad',
  description: 'Reparación de tuberías y grifos en el baño.'
},
{
  name: 'Juan Pérez',
  jobType: 'Plomero',
  price: '$50',
  imageUri: 'https://1.bp.blogspot.com/_EZ16vWYvHHg/S7ipNUpJfzI/AAAAAAAAJnA/OvBcbs5fPP8/s1600/www.BancodeImagenesGratuitas.com-Jirafas-1000x-1.jpg',
  address: '123 Calle Principal, Ciudad',
  description: 'Reparación de tuberías y grifos en el baño.'
}];

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  closeButtonText: {
    color: 'blue',
  },
  searchButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchButtonText: {
    color: '#fff',
  },
  scrollView: {
    maxHeight: '80%', // Limita la altura de la sección deslizable al 80% de la pantalla
  },
  textStyle: {
    height: 50,
    marginBottom: 10,
    fontSize: 20,
    color: '#333',
    margin: 20,
    textAlign: 'center'
  },
});

export default FloatingSection;
