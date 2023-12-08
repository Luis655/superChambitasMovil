import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const ContraOffertModal = ({ isVisible, onAccept, onClose, nombre, data }) => {
  return (
    <Modal isVisible={isVisible} animationIn="slideInUp" animationOut="slideOutDown">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>¡{nombre}, te ha hecho una contraOfferta de tu servicio!</Text>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>{data?.title}</Text>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>{data?.description}</Text>
          <Text style={{ fontSize: 22, marginBottom: 10 }}>${data?.price?? 0}</Text>

          <TouchableOpacity onPress={onAccept} style={{ backgroundColor: 'orange', padding: 10, borderRadius: 5, marginBottom: 10 }}>
            <Text style={{ color: 'white', fontSize:22, textAlign:'center' }}>Aceptar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={{ marginTop: 20 }}>
            <Text style={{ color: 'red' }}>Cerrar</Text>
          </TouchableOpacity>
        </View> 
      </View>
    </Modal>
  );
};

export default ContraOffertModal;
