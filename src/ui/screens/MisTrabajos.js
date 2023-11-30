import React, {useState} from 'react';
import { List, Card, Paragraph } from 'react-native-paper';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';


const WorkHistoryScreen = () => {
  const [expanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handlePress = () => setExpanded(!expanded);
  const onChangeSearch = query => {
    setSearchQuery(query);
    const filterjob = jobData2.filter((job) => {
      const jobType = job.jobType.toLowerCase();
      return jobType.includes(query.toLowerCase());
    });
    setJobData(filterjob);

  }
  return (
    <>
    <Searchbar
    placeholder="Buscar trabajos"
    onChangeText={onChangeSearch}
    value={searchQuery}

    
  />
    <ScrollView style={styles.container}>
      <List.Section title="Historial de Trabajos">
        <List.Accordion
          title="Trabajo 1"
          left={props => <List.Icon {...props} icon="hammer" />}
         >
          <Card>
            <Card.Content>
              <Paragraph>Cliente: Juan Pérez</Paragraph>
              <Paragraph>Trabajo: Reparación de fontanería</Paragraph>
              <Paragraph>Pago: $100</Paragraph>
                <View>
                  <Paragraph>Descripción: Reparación de una tubería rota.</Paragraph>
                  <Paragraph>Día: 2023-11-30</Paragraph>
                  <Paragraph>Dirección: Calle 123, Ciudad</Paragraph>
                </View>
            </Card.Content>
          </Card>
        </List.Accordion>


        <List.Accordion
        title="Trabajo de plomeria      Pago: 100$"
        left={props => <List.Icon {...props} icon="hammer" />}>
                  <Card>
            <Card.Content>
              <Paragraph>Cliente: Juan Pérez</Paragraph>
              <Paragraph>Trabajo: Reparación de fontanería</Paragraph>
              <Paragraph>Pago: $100</Paragraph>
                <View>
                  <Paragraph>Descripción: Reparación de una tubería rota.</Paragraph>
                  <Paragraph>Día: 2023-11-30</Paragraph>
                  <Paragraph>Dirección: Calle 123, Ciudad</Paragraph>
                </View>
            </Card.Content>
          </Card>
      </List.Accordion>

      <List.Accordion
        title="Trabajo de plomeria      Pago: 100$"
        left={props => <List.Icon {...props} icon="hammer" />}>
                  <Card>
            <Card.Content>
              <Paragraph>Cliente: Juan Pérez</Paragraph>
              <Paragraph>Trabajo: Reparación de fontanería</Paragraph>
              <Paragraph>Pago: $100</Paragraph>
                <View>
                  <Paragraph>Descripción: Reparación de una tubería rota.</Paragraph>
                  <Paragraph>Día: 2023-11-30</Paragraph>
                  <Paragraph>Dirección: Calle 123, Ciudad</Paragraph>
                </View>
            </Card.Content>
          </Card>
      </List.Accordion>
       <List.Accordion
        title="Trabajo de plomeria      Pago: 100$"
        left={props => <List.Icon {...props} icon="hammer" />}>
                  <Card>
            <Card.Content>
              <Paragraph>Cliente: Juan Pérez</Paragraph>
              <Paragraph>Trabajo: Reparación de fontanería</Paragraph>
              <Paragraph>Pago: $100</Paragraph>
                <View>
                  <Paragraph>Descripción: Reparación de una tubería rota.</Paragraph>
                  <Paragraph>Día: 2023-11-30</Paragraph>
                  <Paragraph>Dirección: Calle 123, Ciudad</Paragraph>
                </View>
            </Card.Content>
          </Card>
      </List.Accordion>
      <List.Accordion
        title="Trabajo de plomeria      Pago: 100$"
        left={props => <List.Icon {...props} icon="hammer" />}>
                  <Card>
            <Card.Content>
              <Paragraph>Cliente: Juan Pérez</Paragraph>
              <Paragraph>Trabajo: Reparación de fontanería</Paragraph>
              <Paragraph>Pago: $100</Paragraph>
                <View>
                  <Paragraph>Descripción: Reparación de una tubería rota.</Paragraph>
                  <Paragraph>Día: 2023-11-30</Paragraph>
                  <Paragraph>Dirección: Calle 123, Ciudad</Paragraph>
                </View>
            </Card.Content>
          </Card>
      </List.Accordion> 

      <List.Accordion
        title="Trabajo de plomeria      Pago: 100$"
        left={props => <List.Icon {...props} icon="hammer" />}>
                  <Card>
            <Card.Content>
              <Paragraph>Cliente: Juan Pérez</Paragraph>
              <Paragraph>Trabajo: Reparación de fontanería</Paragraph>
              <Paragraph>Pago: $100</Paragraph>
                <View>
                  <Paragraph>Descripción: Reparación de una tubería rota.</Paragraph>
                  <Paragraph>Día: 2023-11-30</Paragraph>
                  <Paragraph>Dirección: Calle 123, Ciudad</Paragraph>
                </View>
            </Card.Content>
          </Card>
      </List.Accordion>



      <List.Accordion
        title="Trabajo de plomeria      Pago: 100$"
        left={props => <List.Icon {...props} icon="hammer" />}>
                  <Card>
            <Card.Content>
              <Paragraph>Cliente: Juan Pérez</Paragraph>
              <Paragraph>Trabajo: Reparación de fontanería</Paragraph>
              <Paragraph>Pago: $100</Paragraph>
                <View>
                  <Paragraph>Descripción: Reparación de una tubería rota.</Paragraph>
                  <Paragraph>Día: 2023-11-30</Paragraph>
                  <Paragraph>Dirección: Calle 123, Ciudad</Paragraph>
                </View>
            </Card.Content>
          </Card>
      </List.Accordion>
      <List.Accordion
        title="Trabajo de plomeria      Pago: 100$"
        left={props => <List.Icon {...props} icon="hammer" />}>
                  <Card>
            <Card.Content>
              <Paragraph>Cliente: Juan Pérez</Paragraph>
              <Paragraph>Trabajo: Reparación de fontanería</Paragraph>
              <Paragraph>Pago: $100</Paragraph>
                <View>
                  <Paragraph>Descripción: Reparación de una tubería rota.</Paragraph>
                  <Paragraph>Día: 2023-11-30</Paragraph>
                  <Paragraph>Dirección: Calle 123, Ciudad</Paragraph>
                </View>
            </Card.Content>
          </Card>
      </List.Accordion>
      <List.Accordion
        title="Trabajo de plomeria      Pago: 100$"
        left={props => <List.Icon {...props} icon="hammer" />}>
                  <Card>
            <Card.Content>
              <Paragraph>Cliente: Juan Pérez</Paragraph>
              <Paragraph>Trabajo: Reparación de fontanería</Paragraph>
              <Paragraph>Pago: $100</Paragraph>
                <View>
                  <Paragraph>Descripción: Reparación de una tubería rota.</Paragraph>
                  <Paragraph>Día: 2023-11-30</Paragraph>
                  <Paragraph>Dirección: Calle 123, Ciudad</Paragraph>
                </View>
            </Card.Content>
          </Card>
      </List.Accordion>
      <List.Accordion
        title="Trabajo de plomeria      Pago: 100$"
        left={props => <List.Icon {...props} icon="hammer" />}>
                  <Card>
            <Card.Content>
              <Paragraph>Cliente: Juan Pérez</Paragraph>
              <Paragraph>Trabajo: Reparación de fontanería</Paragraph>
              <Paragraph>Pago: $100</Paragraph>
                <View>
                  <Paragraph>Descripción: Reparación de una tubería rota.</Paragraph>
                  <Paragraph>Día: 2023-11-30</Paragraph>
                  <Paragraph>Dirección: Calle 123, Ciudad</Paragraph>
                </View>
            </Card.Content>
          </Card>
      </List.Accordion>
      <List.Accordion
        title="Trabajo de plomeria      Pago: 100$"
        left={props => <List.Icon {...props} icon="hammer" />}>
                  <Card>
            <Card.Content>
              <Paragraph>Cliente: Juan Pérez</Paragraph>
              <Paragraph>Trabajo: Reparación de fontanería</Paragraph>
              <Paragraph>Pago: $100</Paragraph>
                <View>
                  <Paragraph>Descripción: Reparación de una tubería rota.</Paragraph>
                  <Paragraph>Día: 2023-11-30</Paragraph>
                  <Paragraph>Dirección: Calle 123, Ciudad</Paragraph>
                </View>
            </Card.Content>
          </Card>
      </List.Accordion>
      <List.Accordion
        title="Trabajo de plomeria      Pago: 100$"
        left={props => <List.Icon {...props} icon="hammer" />}>
                  <Card>
            <Card.Content>
              <Paragraph>Cliente: Juan Pérez</Paragraph>
              <Paragraph>Trabajo: Reparación de fontanería</Paragraph>
              <Paragraph>Pago: $100</Paragraph>
                <View>
                  <Paragraph>Descripción: Reparación de una tubería rota.</Paragraph>
                  <Paragraph>Día: 2023-11-30</Paragraph>
                  <Paragraph>Dirección: Calle 123, Ciudad</Paragraph>
                </View>
            </Card.Content>
          </Card>
      </List.Accordion>
      <List.Accordion
        title="Trabajo de plomeria      Pago: 100$"
        left={props => <List.Icon {...props} icon="hammer" />}>
                  <Card>
            <Card.Content>
              <Paragraph>Cliente: Juan Pérez</Paragraph>
              <Paragraph>Trabajo: Reparación de fontanería</Paragraph>
              <Paragraph>Pago: $100</Paragraph>
                <View>
                  <Paragraph>Descripción: Reparación de una tubería rota.</Paragraph>
                  <Paragraph>Día: 2023-11-30</Paragraph>
                  <Paragraph>Dirección: Calle 123, Ciudad</Paragraph>
                </View>
            </Card.Content>
          </Card>
      </List.Accordion>
      <List.Accordion
        title="Trabajo de plomeria      Pago: 100$"
        left={props => <List.Icon {...props} icon="hammer" />}>
                  <Card>
            <Card.Content>
              <Paragraph>Cliente: Juan Pérez</Paragraph>
              <Paragraph>Trabajo: Reparación de fontanería</Paragraph>
              <Paragraph>Pago: $100</Paragraph>
                <View>
                  <Paragraph>Descripción: Reparación de una tubería rota.</Paragraph>
                  <Paragraph>Día: 2023-11-30</Paragraph>
                  <Paragraph>Dirección: Calle 123, Ciudad</Paragraph>
                </View>
            </Card.Content>
          </Card>
      </List.Accordion>
      <List.Accordion
        title="Trabajo de plomeria      Pago: 100$"
        left={props => <List.Icon {...props} icon="hammer" />}>
                  <Card>
            <Card.Content>
              <Paragraph>Cliente: Juan Pérez</Paragraph>
              <Paragraph>Trabajo: Reparación de fontanería</Paragraph>
              <Paragraph>Pago: $100</Paragraph>
                <View>
                  <Paragraph>Descripción: Reparación de una tubería rota.</Paragraph>
                  <Paragraph>Día: 2023-11-30</Paragraph>
                  <Paragraph>Dirección: Calle 123, Ciudad</Paragraph>
                </View>
            </Card.Content>
          </Card>
      </List.Accordion>
      <List.Accordion
        title="Trabajo de plomeria      Pago: 100$"
        left={props => <List.Icon {...props} icon="hammer" />}>
                  <Card>
            <Card.Content>
              <Paragraph>Cliente: Juan Pérez</Paragraph>
              <Paragraph>Trabajo: Reparación de fontanería</Paragraph>
              <Paragraph>Pago: $100</Paragraph>
                <View>
                  <Paragraph>Descripción: Reparación de una tubería rota.</Paragraph>
                  <Paragraph>Día: 2023-11-30</Paragraph>
                  <Paragraph>Dirección: Calle 123, Ciudad</Paragraph>
                </View>
            </Card.Content>
          </Card>
      </List.Accordion>
      <List.Accordion
        title="Trabajo de plomeria      Pago: 100$"
        left={props => <List.Icon {...props} icon="hammer" />}>
                  <Card>
            <Card.Content>
              <Paragraph>Cliente: Juan Pérez</Paragraph>
              <Paragraph>Trabajo: Reparación de fontanería</Paragraph>
              <Paragraph>Pago: $100</Paragraph>
                <View>
                  <Paragraph>Descripción: Reparación de una tubería rota.</Paragraph>
                  <Paragraph>Día: 2023-11-30</Paragraph>
                  <Paragraph>Dirección: Calle 123, Ciudad</Paragraph>
                </View>
            </Card.Content>
          </Card>
      </List.Accordion>
      <List.Accordion
        title="Trabajo de plomeria      Pago: 100$"
        left={props => <List.Icon {...props} icon="hammer" />}>
                  <Card>
            <Card.Content>
              <Paragraph>Cliente: Juan Pérez</Paragraph>
              <Paragraph>Trabajo: Reparación de fontanería</Paragraph>
              <Paragraph>Pago: $100</Paragraph>
                <View>
                  <Paragraph>Descripción: Reparación de una tubería rota.</Paragraph>
                  <Paragraph>Día: 2023-11-30</Paragraph>
                  <Paragraph>Dirección: Calle 123, Ciudad</Paragraph>
                </View>
            </Card.Content>
          </Card>
      </List.Accordion>
      <List.Accordion
        title="Trabajo de plomeria      Pago: 100$"
        left={props => <List.Icon {...props} icon="hammer" />}>
                  <Card>
            <Card.Content>
              <Paragraph>Cliente: Juan Pérez</Paragraph>
              <Paragraph>Trabajo: Reparación de fontanería</Paragraph>
              <Paragraph>Pago: $100</Paragraph>
                <View>
                  <Paragraph>Descripción: Reparación de una tubería rota.</Paragraph>
                  <Paragraph>Día: 2023-11-30</Paragraph>
                  <Paragraph>Dirección: Calle 123, Ciudad</Paragraph>
                </View>
            </Card.Content>
          </Card>
      </List.Accordion>
      <List.Accordion
        title="Trabajo de plomeria      Pago: 100$"
        left={props => <List.Icon {...props} icon="hammer" />}>
                  <Card>
            <Card.Content>
              <Paragraph>Cliente: Juan Pérez</Paragraph>
              <Paragraph>Trabajo: Reparación de fontanería</Paragraph>
              <Paragraph>Pago: $100</Paragraph>
                <View>
                  <Paragraph>Descripción: Reparación de una tubería rota.</Paragraph>
                  <Paragraph>Día: 2023-11-30</Paragraph>
                  <Paragraph>Dirección: Calle 123, Ciudad</Paragraph>
                </View>
            </Card.Content>
          </Card>
      </List.Accordion>
      <List.Accordion
        title="Trabajo de plomeria      Pago: 100$"
        left={props => <List.Icon {...props} icon="hammer" />}>
                  <Card>
            <Card.Content>
              <Paragraph>Cliente: Juan Pérez</Paragraph>
              <Paragraph>Trabajo: Reparación de fontanería</Paragraph>
              <Paragraph>Pago: $100</Paragraph>
                <View>
                  <Paragraph>Descripción: Reparación de una tubería rota.</Paragraph>
                  <Paragraph>Día: 2023-11-30</Paragraph>
                  <Paragraph>Dirección: Calle 123, Ciudad</Paragraph>
                </View>
            </Card.Content>
          </Card>
      </List.Accordion>
      <List.Accordion
        title="Trabajo de plomeria      Pago: 100$"
        left={props => <List.Icon {...props} icon="hammer" />}>
                  <Card>
            <Card.Content>
              <Paragraph>Cliente: Juan Pérez</Paragraph>
              <Paragraph>Trabajo: Reparación de fontanería</Paragraph>
              <Paragraph>Pago: $100</Paragraph>
                <View>
                  <Paragraph>Descripción: Reparación de una tubería rota.</Paragraph>
                  <Paragraph>Día: 2023-11-30</Paragraph>
                  <Paragraph>Dirección: Calle 123, Ciudad</Paragraph>
                </View>
            </Card.Content>
          </Card>
      </List.Accordion>



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
