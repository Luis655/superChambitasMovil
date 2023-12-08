import React, {useEffect, useState} from 'react';
import { List, Card, Paragraph } from 'react-native-paper';
import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import { Searchbar } from 'react-native-paper';
import axios from 'axios';
import useAxios from '../../customHooks/hookAxios';
import { useAuth } from '../../auth/contextAuth';


const WorkHistoryScreen = () => {
  const [expanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const {user} = useAuth()
  const {id} =  user
  const handlePress = () => setExpanded(!expanded);
  const onChangeSearch = query => {
    setSearchQuery(query);
  }

  const getMyWorks=async()=>{
    try {
      const {data:responseData } = await useAxios(`request/byworkeyid/${id}?job=${searchQuery}`,'GET')
      setData(responseData)
    } catch (error) {
      Alert.alert('¡Ha ocurrido un error, intente más tarde!')
      setData([])
    }

  }

  useEffect(()=>{
    getMyWorks()
  },[searchQuery])
  return (
    <>
    <Searchbar
    style={{margin:10}}
    placeholder="Buscar trabajos"
    onChangeText={onChangeSearch}
    value={searchQuery}

    
  />
    <ScrollView style={styles.container}>
      <List.Section title="Historial de Trabajos">
        {
          data.map(x=> (
            <List.Accordion key={x.requestId}
          title={x.service.title}
          left={props => <List.Icon {...props} icon="hammer" />}
         >
          <Card>
            <Card.Content>
              <Paragraph>Cliente: {x.client.name}</Paragraph>
              <Paragraph>Trabajo: {x.service.title}</Paragraph>
              <Paragraph>Pago: $100</Paragraph>
                <View>
                  <Paragraph>Descripción: {x.service.description}</Paragraph>
                  <Paragraph>Día: {new Date(x.date).toLocaleString()}</Paragraph>
                  <Paragraph>Dirección: {x.client.location}</Paragraph>
                </View>
            </Card.Content>
          </Card>
        </List.Accordion>
          ))
        }
      </List.Section>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default WorkHistoryScreen;
