import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#0E4B5E',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 3,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    height: 50,
    borderColor: '#3498db',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
  },
  resendButton: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  resendButtonText: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

