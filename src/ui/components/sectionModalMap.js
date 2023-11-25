import React, { useState } from 'react';
import { View, Modal, ScrollView, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Card from './Card'; // Asegúrate de importar el componente Card desde la ubicación correcta
import { Searchbar, SegmentedButtons  } from 'react-native-paper';
import { useDarkMode } from '../../auth/contextAuth';
import SolicitarTrabajo from './SolicitarTrabajo';
import { MaterialIcons } from '@expo/vector-icons';

const FloatingSection = ({ visible, onClose, onSearchJobs, isActive, aceptarTrabajo, Contador }) => {
    const { colorMode } = useDarkMode();
    const [value, setValue] = useState('trabajador');
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


          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
          <View style={{flex:1,marginTop:0}}>
          <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: 'trabajador',
            label: 'Chambeadores',
            checkedColor:'#000',
            uncheckedColor: colorMode ? '#fff' : '#000'
          },
          {
            value: 'pedir',
            label: 'Pedir',
            checkedColor:'#000',
            uncheckedColor: colorMode ? '#fff' : '#000'
          },
          { 
            value: 'pendientes', 
            label: 'Pendientes',
            checkedColor:'#000',
            uncheckedColor: colorMode ? '#fff' : '#000'
          },
        ]}
      />
      </View>
      {value == 'trabajador'  && <View>
          {state.type == '1' &&
          <TouchableOpacity style={styles.searchButton} onPress={onSearchJobs}>
           <Text style={styles.searchButtonText}>{isActive ? "Desactivar" : "Activar"}</Text>
          </TouchableOpacity>}
          {state.type == '1' ?
            <Text style={styles.textStyle}>Trabajos disponibles en tu area</Text>
          
           :
           <TouchableOpacity style={styles.search}>

      
           <Searchbar
              placeholder="Buscar trabajos"
              onChangeText={onChangeSearch}
              value={searchQuery}

              
            />
          </TouchableOpacity>
          }
          <ScrollView style={styles.scrollView}>

            {
              jobData.map((job, index) => (
                <Card index={index} job={job} aceptarTrabajo={(lat, lng) => { aceptarTrabajo(lat, lng) }} onClose={onClose} key={index} />
              ))
            }
          </ScrollView>
        </View>}

        {value == 'pedir'  && <View>
          {state.type == '1' &&
          <TouchableOpacity style={styles.searchButton} onPress={onSearchJobs}>
           <Text style={styles.searchButtonText}>{isActive ? "Desactivar" : "Activar"}</Text>
          </TouchableOpacity>}
 

            <View style={{height:'90%', maxHeight:'100%'}}>
              <SolicitarTrabajo Contador={Contador}/>
            </View>
        </View>}


        {value == 'pendientes'  && <View>
          {state.type == '1' &&
          <TouchableOpacity style={styles.searchButton} onPress={onSearchJobs}>
           <Text style={styles.searchButtonText}>{isActive ? "Desactivar" : "Activar"}</Text>
          </TouchableOpacity>}
          {state.type == '1' ?
            <Text style={styles.textStyle}>Trabajos disponibles en tu area</Text>
          
           :
           <TouchableOpacity style={styles.search}>

      
           <Searchbar
              placeholder="Buscar trabajos"
              onChangeText={onChangeSearch}
              value={searchQuery}

              
            />
          </TouchableOpacity>
          }
          <ScrollView style={styles.scrollView}>

              <View>
                <Text>Vista para ver los trabajos pendientes</Text>
              </View>
          </ScrollView>
        </View>}
        </View>
      </View>
    </Modal>
  );
};

export default FloatingSection;