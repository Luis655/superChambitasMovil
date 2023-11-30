// HelpModal.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ChatModalSupport } from './ModalChatSupport';

export const SupportModal = ({modalVisible, closeModal}) => {
  const [openChat, setOpenChat] = useState(false)

  return (
    <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>

          <View style={styles.modalContent}>
            <Text style={styles.modalText}>¿Necesitas ayuda?</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.modalLink}>Iniciar Chat de Soporte</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.modalLink}>¿Tienes alguna pregunta o comentario? ¡Envíanos un correo y estaremos encantados de ayudarte!</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.modalClose}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <ChatModalSupport onClose={()=>{closeModal, setOpenChat(!openChat)}} visible={openChat} ></ChatModalSupport> */}
      </Modal>

  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalLink: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  modalClose: {
    color: 'red',
    fontSize: 16,
  },
});