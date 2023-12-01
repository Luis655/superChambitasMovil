import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const OfertaModal = ({ isVisible, onAccept, onContraofertar, onClose, nombre }) => {
  const [precioOferta, setPrecioOferta] = useState('800');

  const handleAccept = () => {
    onAccept(precioOferta);
  };

  const handleContraofertar = () => {
    onContraofertar(precioOferta);
  };

  return (
    <Modal isVisible={isVisible} animationIn="slideInUp" animationOut="slideOutDown">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>¡{nombre} acaba de aceptar tu solicitud!</Text>
          <Text style={{ marginBottom: 10}}>Ofrece</Text>
        
          <View style={{flexDirection:'row', alignSelf:'center', padding:10}}>
          <TextInput
            style={{fontSize:22, flex:3, height: 50, borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 5, marginEnd:5  }}
            keyboardType="numeric"
            value={precioOferta}
            onChangeText={(text) => setPrecioOferta(text)}
          />
          <Text style={{flex:1, fontSize:22, marginLeft:-29, alignSelf:'center'}}>$</Text>
          <TouchableOpacity onPress={handleContraofertar} style={{alignContent:'center', flex:5, backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>
            <Text style={{ color: 'white', alignSelf:'center', fontSize:22 }}>Contraofertar</Text>
          </TouchableOpacity>

          </View>
          <TouchableOpacity onPress={handleAccept} style={{ backgroundColor: 'orange', padding: 10, borderRadius: 5, marginBottom: 10 }}>
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

export default OfertaModal;
