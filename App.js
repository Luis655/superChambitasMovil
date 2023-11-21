import { StyleSheet, useColorScheme } from "react-native";
import React, { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnBoardingScreen from "./src/ui/screens/onBoardingScreen";
import WorkerRegisterScreen from "./src/ui/screens/WorkerRegisterScreen";
import UserRegisterScreen from "./src/ui/screens/UserRegisterScreen";

import WorkerLoginScreen from "./src/ui/screens/WorkerLoginScreen";
import CodeScreen from "./src/ui/screens/CodeScreen";
import HomeWorker from "./src/ui/screens/HomeWorker";
import Configuraciones from "./src/ui/screens/Configuraciones";

import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/auth/contextAuth';
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import * as SplashScreen from "expo-splash-screen";
import { HomeUser } from "./src/ui/screens/HomeUser";
import {} from "react-signalr"
import { SignalRContext } from "./src/signal/signalRConext";
SplashScreen.preventAutoHideAsync();


export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const Stack = createStackNavigator();
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  const theme = {
    backgroundColor: isDarkMode ? '#000' : '#fff'
    // Configuración del tema, si es necesario
  };
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
    <PaperProvider theme={theme}>
    <SignalRContext  url={" https://e48f-2806-10be-9-adbd-1c4f-2c8e-41de-6d6d.ngrok-free.app/notifications"}>
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
            headerShown: true,
          }}
          name="Configuraciones"
          component={Configuraciones}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </SignalRContext>
    </PaperProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
});
