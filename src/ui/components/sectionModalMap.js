
import React, { useState } from 'react';
import { View, Modal, ScrollView, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Card from './Card'; // Asegúrate de importar el componente Card desde la ubicación correcta
import { Searchbar, SegmentedButtons  } from 'react-native-paper';
import { useAuth } from '../../auth/contextAuth';
import { useDarkMode } from '../../auth/contextAuth';
import SolicitarTrabajo from './SolicitarTrabajo';

const FloatingSection = ({ visible, onClose, onSearchJobs, isActive, aceptarTrabajo, Contador }) => {
  const { colorMode, setDarkColorMode } = useDarkMode();


  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      height:800,
    },
    modalContent: {
      backgroundColor: colorMode ? '#1d2c4d' : '#fff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      height:750
    },
    closeButton: {
      alignSelf: 'flex-end',
      marginBottom: 1,
    },
    search:{
      margin:10
    },
    closeButtonText: {
      color: colorMode ? '#fff' : 'blue',
    },
    searchButton: {
      backgroundColor: colorMode ? 'blue' : '#fff',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginBottom: 20,
    },
    searchButtonText: {
      color: colorMode ? '#121212' : '#fff',
    },
    scrollView: {
      maxHeight: '80%', // Limita la altura de la sección deslizable al 80% de la pantalla
    },
    textStyle: {
      height: 50,
      marginBottom: 30,
      fontSize: 20,
      color: colorMode ? '#fff' : '#121212',
      margin: 20,
      textAlign: 'center'
    },
  });
  const { state, dispatch } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [jobData, setJobData] = useState(jobData2);
  const [value, setValue] = useState('trabajador');

 // console.log(jobData)
  const onChangeSearch = query => {
    setSearchQuery(query);
    console.log(query);
    const filterjob = jobData2.filter((job) => {
      const jobType = job.jobType.toLowerCase(); // Convierte a minúsculas para una búsqueda sin distinción entre mayúsculas y minúsculas
      return jobType.includes(query.toLowerCase());
    });
    setJobData(filterjob);

  }
  return (
    <Modal animationType="slide" transparent={true} visible={visible}
    onSwipeComplete={onClose} // Esta función se ejecutará cuando el usuario complete el gesto de deslizamiento
    //onRequestClose={onClose}
    swipeDirection={['down']}>
      <View style={styles.modalContainer}>
        <ActivityIndicator animating={isActive} />
        <View style={styles.modalContent}>




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

export const jobData2 = [
  {
    name: 'Juan Pérez',
    jobType: 'Plomero',
    price: '$50',
    imageUri: 'https://example.com/plumber.jpg',
    address: '123 Calle Principal, Ciudad',
    description: 'Reparación de tuberías y grifos en el baño.',
    latlng: {
      latitude: 20.967115,
      longitude: -89.624540
    }
  },
  {
    name: 'María Rodríguez',
    jobType: 'Electricista',
    price: '$60',
    imageUri: 'https://example.com/electrician.jpg',
    address: '456 Calle Secundaria, Ciudad',
    description: 'Instalación eléctrica y reparaciones.',
    latlng: {
      latitude: 20.975326,
      longitude: -89.624862
    }
  },
  {
    name: 'Luis Gómez',
    jobType: 'Carpintero',
    price: '$45',
    imageUri: 'https://example.com/carpenter.jpg',
    address: '789 Calle Otra, Ciudad',
    description: 'Construcción y reparación de muebles.',
    latlng: {
      latitude: 20.975173,
      longitude: -89.635455
    }
  },
  {
    name: 'Ana López',
    jobType: 'Pintor',
    price: '$40',
    imageUri: 'https://example.com/painter.jpg',
    address: '101 Calle Principal, Ciudad',
    description: 'Pintura de interiores y exteriores.',
    latlng: {
      latitude: 20.970756,
      longitude: -89.629788
    }
  },
  {
    name: 'Carlos Hernández',
    jobType: 'Fontanero',
    price: '$55',
    imageUri: 'https://example.com/plumber2.jpg',
    address: '321 Calle Alameda, Ciudad',
    description: 'Reparaciones en sistemas de fontanería.',
    latlng: {
      latitude: 20.971414,
      longitude: -89.637042
    }
  },
  {
    name: 'Sofía Martínez',
    jobType: 'Jardinero',
    price: '$35',
    imageUri: 'https://example.com/gardener.jpg',
    address: '543 Avenida Jardín, Ciudad',
    description: 'Diseño y mantenimiento de jardines.',
    latlng: {
      latitude: 20.975854,
      longitude: -89.634229
    }
  },
  {
    name: 'Manuel Sánchez',
    jobType: 'Albañil',
    price: '$70',
    imageUri: 'https://example.com/mason.jpg',
    address: '987 Calle Construcción, Ciudad',
    description: 'Construcción y reparación de estructuras.',
    latlng: {
      latitude: 20.977456,
      longitude: -89.638021
    }
  },
  {
    name: 'Laura Torres',
    jobType: 'Cerrajero',
    price: '$50',
    imageUri: 'https://example.com/locksmith.jpg',
    address: '753 Calle Segura, Ciudad',
    description: 'Servicios de cerrajería y llaves.',
    latlng: {
      latitude: 20.981173,
      longitude: -89.632698
    }
  },
  {
    name: 'Javier Ramírez',
    jobType: 'Mecánico',
    price: '$65',
    imageUri: 'https://example.com/mechanic.jpg',
    address: '369 Avenida Motor, Ciudad',
    description: 'Reparación y mantenimiento de vehículos.',
    latlng: {
      latitude: 20.982819,
      longitude: -89.628968
    }
  },
  {
    name: 'Patricia Vargas',
    jobType: 'Técnico de Computadoras',
    price: '$40',
    imageUri: 'https://example.com/computer-tech.jpg',
    address: '147 Calle Tecnológica, Ciudad',
    description: 'Reparación y soporte técnico de computadoras.',
    latlng: {
      latitude: 20.983540,
      longitude: -89.625408
    }
  },
  {
    name: 'Roberto Guzmán',
    jobType: 'Pintor',
    price: '$55',
    imageUri: 'https://example.com/painter2.jpg',
    address: '258 Avenida Arte, Ciudad',
    description: 'Pintura artística y decorativa.',
    latlng: {
      latitude: 20.984547,
      longitude: -89.621765
    }
  },
  {
    name: 'Isabel Morales',
    jobType: 'Electricista',
    price: '$60',
    imageUri: 'https://example.com/electrician2.jpg',
    address: '963 Calle Energía, Ciudad',
    description: 'Instalaciones eléctricas y reparaciones.',
    latlng: {
      latitude: 20.985537,
      longitude: -89.617432
    }
  },
  {
    name: 'Fernando Cordero',
    jobType: 'Carpintero',
    price: '$45',
    imageUri: 'https://example.com/carpenter2.jpg',
    address: '632 Calle Madera, Ciudad',
    description: 'Carpintería personalizada y restauración.',
    latlng: {
      latitude: 20.989012,
      longitude: -89.614892
    }
  },
  {
    name: 'Gloria Paredes',
    jobType: 'Plomero',
    price: '$55',
    imageUri: 'https://example.com/plumber3.jpg',
    address: '451 Calle Agua, Ciudad',
    description: 'Servicios de plomería y saneamiento.',
    latlng: {
      latitude: 20.992483,
      longitude: -89.612432
    }
  },
  {
    name: 'Eduardo Soto',
    jobType: 'Albañil',
    price: '$70',
    imageUri: 'https://example.com/mason2.jpg',
    address: '784 Calle Estructura, Ciudad',
    description: 'Construcción y remodelación de edificios.',
    latlng: {
      latitude: 20.995910,
      longitude: -89.608695
    }
  },
  {
    name: 'Carmen Ortega',
    jobType: 'Jardinero',
    price: '$35',
    imageUri: 'https://example.com/gardener2.jpg',
    address: '596 Avenida Naturaleza, Ciudad',
    description: 'Diseño paisajístico y cuidado de jardines.',
    latlng: {
      latitude: 20.997872,
      longitude: -89.605337
    }
  },
  {
    name: 'Pablo Méndez',
    jobType: 'Técnico de Computadoras',
    price: '$40',
    imageUri: 'https://example.com/computer-tech2.jpg',
    address: '215 Calle Informática, Ciudad',
    description: 'Reparación y mantenimiento de equipos informáticos.',
    latlng: {
      latitude: 21.000409,
      longitude: -89.602622
    }
  },
  {
    name: 'Marta Gutiérrez',
    jobType: 'Cerrajero',
    price: '$50',
    imageUri: 'https://example.com/locksmith2.jpg',
    address: '877 Calle Seguridad, Ciudad',
    description: 'Servicios de cerrajería y apertura de puertas.',
    latlng: {
      latitude: 21.003432,
      longitude: -89.599544
    }
  }
];




export default FloatingSection;

/*import React, { useState, useRef } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const ScrollableModal = ({onClose, visible}) => {
  const [scrollOffset, setScrollOffset] = useState(null);
  const scrollViewRef = useRef();

  const handleOnScroll = (event) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const handleScrollTo = (p) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(p);
    }
  };

  return (
    <Modal
      testID={'modal'}
      isVisible={visible}
      transparent={true}
      onSwipeComplete={onClose}
      swipeDirection={['down']}
      scrollTo={handleScrollTo}
      scrollOffset={scrollOffset}
      scrollOffsetMax={800 - 700} // content height - ScrollView height
      propagateSwipe={true}
      style={styles.modal}>
      <View style={styles.scrollableModal}>
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleOnScroll}
          scrollEventThrottle={16}>
          <View style={styles.scrollableModalContent1}>
            <Text style={styles.scrollableModalText1}>hjhjjhhjhj</Text>
          </View>
          <View style={styles.scrollableModalContent2}>
            <Text style={styles.scrollableModalText2}>ttttttttttttttt</Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    backgroundColor: 'transparent',
  },
  scrollableModal: {
    backgroundColor: 'transparent',
    height: 500,
  },
  scrollableModalContent1: {
    height: 400,
    backgroundColor: '#87BBE0',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  scrollableModalText1: {
    fontSize: 20,
    color: 'white',
  },
  scrollableModalContent2: {
    height: 200,
    backgroundColor: '#A9DCD3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollableModalText2: {
    fontSize: 20,
    color: 'white',
  },
});


export const jobData2 = [
  {
    name: 'Juan Pérez',
    jobType: 'Plomero',
    price: '$50',
    imageUri: 'https://example.com/plumber.jpg',
    address: '123 Calle Principal, Ciudad',
    description: 'Reparación de tuberías y grifos en el baño.',
    latlng: {
      latitude: 20.967115,
      longitude: -89.624540
    }
  },
  {
    name: 'María Rodríguez',
    jobType: 'Electricista',
    price: '$60',
    imageUri: 'https://example.com/electrician.jpg',
    address: '456 Calle Secundaria, Ciudad',
    description: 'Instalación eléctrica y reparaciones.',
    latlng: {
      latitude: 20.975326,
      longitude: -89.624862
    }
  },
  {
    name: 'Luis Gómez',
    jobType: 'Carpintero',
    price: '$45',
    imageUri: 'https://example.com/carpenter.jpg',
    address: '789 Calle Otra, Ciudad',
    description: 'Construcción y reparación de muebles.',
    latlng: {
      latitude: 20.975173,
      longitude: -89.635455
    }
  },
  {
    name: 'Ana López',
    jobType: 'Pintor',
    price: '$40',
    imageUri: 'https://example.com/painter.jpg',
    address: '101 Calle Principal, Ciudad',
    description: 'Pintura de interiores y exteriores.',
    latlng: {
      latitude: 20.970756,
      longitude: -89.629788
    }
  },
  {
    name: 'Carlos Hernández',
    jobType: 'Fontanero',
    price: '$55',
    imageUri: 'https://example.com/plumber2.jpg',
    address: '321 Calle Alameda, Ciudad',
    description: 'Reparaciones en sistemas de fontanería.',
    latlng: {
      latitude: 20.971414,
      longitude: -89.637042
    }
  },
  {
    name: 'Sofía Martínez',
    jobType: 'Jardinero',
    price: '$35',
    imageUri: 'https://example.com/gardener.jpg',
    address: '543 Avenida Jardín, Ciudad',
    description: 'Diseño y mantenimiento de jardines.',
    latlng: {
      latitude: 20.975854,
      longitude: -89.634229
    }
  },
  {
    name: 'Manuel Sánchez',
    jobType: 'Albañil',
    price: '$70',
    imageUri: 'https://example.com/mason.jpg',
    address: '987 Calle Construcción, Ciudad',
    description: 'Construcción y reparación de estructuras.',
    latlng: {
      latitude: 20.977456,
      longitude: -89.638021
    }
  },
  {
    name: 'Laura Torres',
    jobType: 'Cerrajero',
    price: '$50',
    imageUri: 'https://example.com/locksmith.jpg',
    address: '753 Calle Segura, Ciudad',
    description: 'Servicios de cerrajería y llaves.',
    latlng: {
      latitude: 20.981173,
      longitude: -89.632698
    }
  },
  {
    name: 'Javier Ramírez',
    jobType: 'Mecánico',
    price: '$65',
    imageUri: 'https://example.com/mechanic.jpg',
    address: '369 Avenida Motor, Ciudad',
    description: 'Reparación y mantenimiento de vehículos.',
    latlng: {
      latitude: 20.982819,
      longitude: -89.628968
    }
  },
  {
    name: 'Patricia Vargas',
    jobType: 'Técnico de Computadoras',
    price: '$40',
    imageUri: 'https://example.com/computer-tech.jpg',
    address: '147 Calle Tecnológica, Ciudad',
    description: 'Reparación y soporte técnico de computadoras.',
    latlng: {
      latitude: 20.983540,
      longitude: -89.625408
    }
  },
  {
    name: 'Roberto Guzmán',
    jobType: 'Pintor',
    price: '$55',
    imageUri: 'https://example.com/painter2.jpg',
    address: '258 Avenida Arte, Ciudad',
    description: 'Pintura artística y decorativa.',
    latlng: {
      latitude: 20.984547,
      longitude: -89.621765
    }
  },
  {
    name: 'Isabel Morales',
    jobType: 'Electricista',
    price: '$60',
    imageUri: 'https://example.com/electrician2.jpg',
    address: '963 Calle Energía, Ciudad',
    description: 'Instalaciones eléctricas y reparaciones.',
    latlng: {
      latitude: 20.985537,
      longitude: -89.617432
    }
  },
  {
    name: 'Fernando Cordero',
    jobType: 'Carpintero',
    price: '$45',
    imageUri: 'https://example.com/carpenter2.jpg',
    address: '632 Calle Madera, Ciudad',
    description: 'Carpintería personalizada y restauración.',
    latlng: {
      latitude: 20.989012,
      longitude: -89.614892
    }
  },
  {
    name: 'Gloria Paredes',
    jobType: 'Plomero',
    price: '$55',
    imageUri: 'https://example.com/plumber3.jpg',
    address: '451 Calle Agua, Ciudad',
    description: 'Servicios de plomería y saneamiento.',
    latlng: {
      latitude: 20.992483,
      longitude: -89.612432
    }
  },
  {
    name: 'Eduardo Soto',
    jobType: 'Albañil',
    price: '$70',
    imageUri: 'https://example.com/mason2.jpg',
    address: '784 Calle Estructura, Ciudad',
    description: 'Construcción y remodelación de edificios.',
    latlng: {
      latitude: 20.995910,
      longitude: -89.608695
    }
  },
  {
    name: 'Carmen Ortega',
    jobType: 'Jardinero',
    price: '$35',
    imageUri: 'https://example.com/gardener2.jpg',
    address: '596 Avenida Naturaleza, Ciudad',
    description: 'Diseño paisajístico y cuidado de jardines.',
    latlng: {
      latitude: 20.997872,
      longitude: -89.605337
    }
  },
  {
    name: 'Pablo Méndez',
    jobType: 'Técnico de Computadoras',
    price: '$40',
    imageUri: 'https://example.com/computer-tech2.jpg',
    address: '215 Calle Informática, Ciudad',
    description: 'Reparación y mantenimiento de equipos informáticos.',
    latlng: {
      latitude: 21.000409,
      longitude: -89.602622
    }
  },
  {
    name: 'Marta Gutiérrez',
    jobType: 'Cerrajero',
    price: '$50',
    imageUri: 'https://example.com/locksmith2.jpg',
    address: '877 Calle Seguridad, Ciudad',
    description: 'Servicios de cerrajería y apertura de puertas.',
    latlng: {
      latitude: 21.003432,
      longitude: -89.599544
    }
  }
];

export default ScrollableModal;*/
