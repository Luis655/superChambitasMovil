import { StyleSheet, useColorScheme } from "react-native";
import React, { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnBoardingScreen from "./src/ui/screens/onBoardingScreen";
import UserRegisterScreen from "./src/ui/screens/UserRegisterScreen";
import BarraLateral from "./src/ui/components/BarraLateral";
import WorkerLoginScreen from "./src/ui/screens/WorkerLoginScreen";
import HomeWorker from "./src/ui/screens/HomeWorker";
import Configuraciones from "./src/ui/screens/Configuraciones";

import { Provider as PaperProvider } from "react-native-paper";
import { AuthProvider } from "./src/auth/contextAuth";
import { setNotificationHandler } from "expo-notifications";


import NameScreen from "./src/ui/screens/RegistroTrabajador/NameScreen";
import AddWorkerData from "./src/ui/screens/RegistroTrabajador/AddWorkerData";
import CodeScreen from "./src/ui/screens/RegistroTrabajador/CodeScreen";
import WorkerRegisterScreen from "./src/ui/screens/RegistroTrabajador/WorkerRegisterScreen";



import MisTrabajos from "./src/ui/screens/MisTrabajos";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import * as SplashScreen from "expo-splash-screen";
import { HomeUser } from "./src/ui/screens/HomeUser";
import { SignalRContext } from "./src/signal/signalRConext";
import PhotoUser from "./src/ui/screens/PhotoUser";
SplashScreen.preventAutoHideAsync();
setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


export default function App() {
  const isDarkMode = useColorScheme() === "dark";
  const Stack = createStackNavigator();
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  const theme = {
    backgroundColor: isDarkMode ? "#000" : "#fff",
    // Configuración del tema, si es necesario
  };
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

  return (
    <SignalRContext.Provider
      url={
        "https://99c1-2806-10be-9-32a8-e1d3-b171-717b-2253.ngrok-free.app/notifications"
      }
    >
      <AuthProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer onReady={onLayoutRootView}>
            <Stack.Navigator initialRouteName="onBoarding">
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="onBoarding"
                component={OnBoardingScreen}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="WorkerLoginScreen"
                component={WorkerLoginScreen}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="WorkerRegister"
                component={WorkerRegisterScreen}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="UserRegister"
                component={UserRegisterScreen}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="CodeScreen"
                component={CodeScreen}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="HomeWorker"
                component={HomeWorker}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="HomeUser"
                component={HomeUser}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="NameScreen"
                component={NameScreen}
              />
              <Stack.Screen
                options={{
                  headerBackTitleVisible: false,
                  headerShown: true,
                }}
                name="Datos del trabajador"
                component={AddWorkerData}
              />
              <Stack.Screen
                options={{
                  headerShown: true,
                }}
                name="Mis trabajos"
                component={MisTrabajos}
              />
              <Stack.Screen
                options={{
                  headerShown: true,
                }}
                name="Configuraciones"
                component={Configuraciones}
              />
              <Stack.Screen
                options={{
                  headerShown: true,
                }}
                name="Mi perfil"
                component={PhotoUser}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </AuthProvider>
    </SignalRContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
});
