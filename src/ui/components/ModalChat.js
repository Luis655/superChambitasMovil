import React, { useState } from 'react';
import { View, Modal, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const ChatModal = ({ visible, onClose, name, price }) => {
  const [messages, setMessages] = useState([

    {
      _id: 1,
      text: '¿Te doy los 600 pero tienes que venir ya?',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Usuario 2',
      },
    },
    {
      _id: 2,
      text: 'Por 600 podria aceptar ahora.',
      createdAt: new Date(),
      user: {
        _id: 1,
        name: 'Usuario 1',
      },
    },
    {
      _id: 3,
      text: 'Hola me interesa pero es muy poco',
      createdAt: new Date(),
      user: {
        _id: 1,
        name: 'Usuario 1',
      },
    },
  ]);

  const onSend = (newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#0084FF',
          },
          left: {
            backgroundColor: '#E5E5EA',
          },
        }}
      />
    );
  };

  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <View style={styles.modalContainer}>

        <View style={[styles.navcontent]}>


          <Text style={[{ flex: 6, fontSize: 20 }]}>{name}</Text>
          <Text style={[{ flex: 4, fontSize: 20 }]}>{price}</Text>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Atras</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Aceptar</Text>
          </TouchableOpacity>
        </View>

        {/* Encabezado del modal */}
        {/* Agrega elementos según sea necesario */}
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{
            _id: 1,
          }}
          renderBubble={renderBubble}
        />
        {/* Input y botón para enviar mensajes */}
        {/* Lógica para enviar mensajes */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  navcontent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
    borderBottomWidth: 1, // Ancho del borde inferior (puedes ajustarlo según tus necesidades)
  },
  textnav: {
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF', // Color de fondo del modal
  },
  closeButton: {
    flex: 4
  },
  closeButtonText: {
    color: 'blue',
    fontSize: 20,
  },
});

export default ChatModal;
