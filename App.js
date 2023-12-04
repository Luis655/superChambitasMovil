import { useColorScheme } from "react-native";
import React from "react";

import { Provider as PaperProvider } from "react-native-paper";
import { AuthProvider } from "./src/auth/contextAuth";
import { SignalRContext } from "./src/signal/signalRConext";
import MainRouter from "./src/guards/mainRouter";

export default function App() {

  const isDarkMode = useColorScheme() === "dark";
  const theme = {
    backgroundColor: isDarkMode ? "#000" : "#fff",
    // Configuración del tema, si es necesario
  };
  return (
    <SignalRContext.Provider
      url={
        `${process.env.EXPO_PUBLIC_API_URL}/notifications`
      }
    >
      <AuthProvider>
        <PaperProvider theme={theme}>
          <MainRouter ></MainRouter>

        </PaperProvider>
      </AuthProvider>
    </SignalRContext.Provider>
  );
}
