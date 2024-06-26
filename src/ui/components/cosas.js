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




  
{value == 'trabajador' && (
    <View>
      {state.type == '1' && (
        <TouchableOpacity style={styles.searchButton} onPress={onSearchJobs}>
          <Text style={styles.searchButtonText}>
            {isActive ? 'Desactivar' : 'Activar'}
          </Text>
        </TouchableOpacity>
      )}
      {state.type == '1' ? (
        <Text style={styles.textStyle}>Trabajos disponibles en tu área</Text>
      ) : (
        <TouchableOpacity style={styles.search}>
          <Searchbar
            placeholder="Buscar trabajos"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </TouchableOpacity>
      )}
      <ScrollView style={styles.scrollView}>
        {jobData.map((job, index) => (
          <Card
            index={index}
            job={job}
            aceptarTrabajo={(lat, lng) => {
              aceptarTrabajo(lat, lng);
            }}
            onClose={onClose}
            key={index}
          />
        ))}
      </ScrollView>
    </View>
  )}



  {value == 'pendientes' && (
    <View>
      {state.type == '1' && (
        <TouchableOpacity style={styles.searchButton} onPress={onSearchJobs}>
          <Text style={styles.searchButtonText}>
            {isActive ? 'Desactivar' : 'Activar'}
          </Text>
        </TouchableOpacity>
      )}
      {state.type == '1' ? (
        <Text style={styles.textStyle}>Trabajos disponibles en tu área</Text>
      ) : (
        <TouchableOpacity style={styles.search}>
          <Searchbar
            placeholder="Buscar trabajos"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </TouchableOpacity>
      )}
      <ScrollView style={styles.scrollView}>
        <View>
          <Text>Vista para ver los trabajos pendientes</Text>
        </View>
      </ScrollView>
    </View>
  )}

  const [jobData, setJobData] = useState(jobData2);
  const [value, setValue] = useState('trabajador');

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