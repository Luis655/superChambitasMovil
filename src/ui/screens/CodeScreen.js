import React from 'react';
import { View, Text, TextInput, TouchableOpacit } from 'react-native';

export default function CodeScreensss({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Introduce el código de 6 dígitos que se te fue enviado:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={6}
        placeholder="123456"
      />
      <TouchableOpacity style={styles.resendButton} onPress={() => {}}>
        <Text style={styles.resendButtonText}>¿No te llegó un código? Reenviar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.nextButton} onPress={() => {
                        navigation.navigate('HomeWorker')

      }}>
        <Text style={styles.nextButtonText}>SIGUIENTE</Text>
      </TouchableOpacity>
    </View>
  );
}



