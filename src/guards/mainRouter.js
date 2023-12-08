import React from 'react'
import { useAuth } from '../auth/contextAuth'
import OnBoardingScreen from "../ui/screens/onBoardingScreen";
import UserRegisterScreen from "../ui/screens/UserRegisterScreen";
import WorkerLoginScreen from "../ui/screens/WorkerLoginScreen";
import HomeWorker from "../ui/screens/HomeWorker";
import Configuraciones from "../ui/screens/Configuraciones";
import NameScreen from "../ui/screens/RegistroTrabajador/NameScreen";
import AddWorkerData from "../ui/screens/RegistroTrabajador/AddWorkerData";
import CodeScreen from "../ui/screens/RegistroTrabajador/CodeScreen";
import WorkerRegisterScreen from "../ui/screens/RegistroTrabajador/WorkerRegisterScreen";
import MisTrabajos from "../ui/screens/MisTrabajos";
import PhotoUser from "../ui/screens/PhotoUser";
import { NavigationContainer } from "@react-navigation/native";
import {
    useFonts,
    Montserrat_400Regular,
    Montserrat_700Bold,
  } from "@expo-google-fonts/montserrat";
import { useCallback } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { setNotificationHandler } from "expo-notifications";

import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();
setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});
const Navigator = createStackNavigator();
export default function MainRouter() {
    const {user, logged} = useAuth()
    
    let [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_700Bold,
      });
      const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
          // const { status: existingStatus } =
          //   await getPermissionsAsync();
          // let finalStatus = existingStatus;
          // if (existingStatus !== "granted") {
          //   const { status } = await requestPermissionsAsync();
          //   finalStatus = status;
          // }
          // if (finalStatus !== 'granted') {
          //   alert('Podras activar las notificaciones en configuración');
          // }
          await SplashScreen.hideAsync();
        }
      }, [fontsLoaded]);
    
      if (!fontsLoaded) {
        return null;
      }
    return (<NavigationContainer onReady={onLayoutRootView}>
        {logged ? <Navigator.Navigator initialRouteName='HomeWorker'>
            <Navigator.Screen
                options={{
                    headerShown: false,
                }}
                initialParams={{role: user.role}}
                name="HomeWorker"
                component={HomeWorker}
            />
            
            <Navigator.Screen
                options={{
                    headerShown: false,
                }}
                name="NameScreen"
                component={NameScreen}
            />
            <Navigator.Screen
                options={{
                    headerBackTitleVisible: false,
                    headerShown: true,
                }}
                name="Datos del trabajador"
                component={AddWorkerData}
            />
            <Navigator.Screen
                options={{
                    headerShown: true,
                }}
                name="Mis trabajos"
                component={MisTrabajos}
            />
            <Navigator.Screen
                options={{
                    headerShown: true,
                }}
                name="Configuraciones"
                component={Configuraciones}
            />
            <Navigator.Screen
                options={{
                    headerShown: true,
                }}
                name="Mi perfil"
                component={PhotoUser}
            /></Navigator.Navigator> : <Navigator.Navigator initialRouteName='onBoarding'>
            <Navigator.Screen
                options={{
                    headerShown: false,
                }}
                name="onBoarding"
                component={OnBoardingScreen}
            />
            <Navigator.Screen

                options={{
                    headerShown: false,
                }}
                name="WorkerLoginScreen"
                // initialParams={{role:1}}
                component={WorkerLoginScreen}
            />
            <Navigator.Screen
                options={{
                    headerShown: false,
                }}
                name="WorkerRegister"
                component={WorkerRegisterScreen}
            />
            <Navigator.Screen
                options={{
                    headerShown: false,
                }}
                name="UserRegister"
                component={UserRegisterScreen}
            />
            <Navigator.Screen
                options={{
                    headerShown: false,
                }}
                name="CodeScreen"
                component={CodeScreen}
            /></Navigator.Navigator>}
    </NavigationContainer>)

}
