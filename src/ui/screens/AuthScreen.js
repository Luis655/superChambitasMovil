import React from 'react';
import { View, TextInput, Button } from 'react-native';
import { observer } from 'mobx-react';
import { authViewModel } from '../viewModels/AuthViewModel';

const LoginScreen = () => {
  const handleLogin = () => {
    // Implementa la lógica de inicio de sesión aquí
    // if (authStore.email === 'usuario@example.com' && authStore.password === 'contraseña') {
    //   authStore.setLoggedIn(true);
    // }
  };

  return (
    <View>
      <TextInput
        placeholder="Correo electrónico"
        value={authViewModel.email}
        onChangeText={authViewModel.setEmail}
      />
      <TextInput
        placeholder="Contraseña"
        value={authViewModel.password}
        onChangeText={authViewModel.setPassword}
        secureTextEntry
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
    </View>
  );
};

export default observer(LoginScreen);
