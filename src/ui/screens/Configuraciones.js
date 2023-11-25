import React, { useContext, useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useDarkMode } from '../../auth/contextAuth';
import { FontAwesome } from '@expo/vector-icons';

const Configuraciones = () => {
  const { colorMode, setDarkColorMode } = useDarkMode();
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');

  const toggleSwitch = () => setDarkColorMode((previousState) => !previousState);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: colorMode ? '#121212' : '#ffffff',
    },
    card: {
      backgroundColor: colorMode ? '#1e1e1e' : '#f4f4f4',
      borderRadius: 10,
      padding: 16,
      marginBottom: 16,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 24,
      color: colorMode ? '#ffffff' : '#000000',
    },
    setting: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    settingTitle: {
      fontSize: 18,
      color: colorMode ? '#ffffff' : '#000000',
    },
    phoneIcon: {
      fontSize: 31,
      color: colorMode ? '#ffffff' : '#000000',
      marginRight: 12,
    },
    phoneContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    phoneNumber: {
      fontSize: 18,
      color: colorMode ? '#dddddd' : '#555555',
      marginLeft: 8,
    },
  });

  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  };

  const handleChangePhoneNumber = () => {
    showAlert('Cambiar número de teléfono', 'Número de teléfono cambiado con éxito');
    // Agrega el código para cambiar el número de teléfono aquí
  };

  const handleAboutApp = () => {
    showAlert('Acerca de la aplicación', 'Información sobre la aplicación');
    // Agrega el código para mostrar información sobre la aplicación aquí
  };

  const handleLogout = () => {
    showAlert('Cerrar sesión', 'Has cerrado sesión');
    // Agrega el código para cerrar sesión aquí
  };

  const handleDeleteAccount = () => {
    showAlert('Eliminar cuenta', 'Cuenta eliminada con éxito');
    // Agrega el código para eliminar la cuenta aquí
  };

  

  const renderSetting = (title, action) => (
    <TouchableOpacity onPress={action}>
      <View style={styles.setting}>
        <Text style={styles.settingTitle}>{title}</Text>
        <FontAwesome name="angle-right" style={styles.phoneIcon} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
                <Text style={styles.title}>Configuración de usuario</Text>

      <View style={styles.card}>
        <View style={styles.setting}>
          <Text style={styles.settingTitle}>Modo oscuro</Text>
          <Switch value={colorMode} onValueChange={toggleSwitch} />
        </View>
      </View>
      <View style={styles.card}>
        {renderSetting('Cambiar número de teléfono', handleChangePhoneNumber)}
        {renderSetting('Acerca de la aplicación', handleAboutApp)}
        {renderSetting('Cerrar sesión', handleLogout)}
        {renderSetting('Eliminar cuenta', handleDeleteAccount)}
      </View>
    </View>
  );
};

export default Configuraciones;
