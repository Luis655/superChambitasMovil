import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailScreen from './src/ui/screens/detailScreen';
import WorkerLoginScreen from './src/ui/screens/WorkerLoginScreen';
import WorkerRegisterScreen from './src/ui/screens/WorkerRegisterScreen';
import HomeWorker from './src/ui/screens/HomeWorker';
import { PermissionsAndroid } from 'react-native';
import React, {useEffect} from 'react';



import CounterComponent from './src/ui/components/counterComponent';
export default function App() {
  const Stack = createStackNavigator();
  useEffect(() => {
    requestLocationPermission()

}, []);
  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Permiso para acceder a la ubicación",
          message: "Tu aplicación necesita acceso a tu ubicación",
          buttonNeutral: "Pregúntame luego",
          buttonNegative: "Cancelar",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("hola")
      } else {
        console.log("Permiso para acceder a la ubicación denegado");
      }
    } catch (err) {
      console.warn(err);
    }
  }
  return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={CounterComponent} />
        <Stack.Screen name="Detail" component={DetailScreen}   />
        <Stack.Screen name="WorkerLogin" component={WorkerLoginScreen} />
        <Stack.Screen name="WorkerRegister" component={WorkerRegisterScreen} />
        <Stack.Screen name="HomeWorker" component={HomeWorker} />



      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
