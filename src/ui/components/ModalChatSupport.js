import React, { useState } from 'react';
import { View, Modal, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

export const ChatModalSupport = ({ visible, onClose, name, price }) => {
  const [messages, setMessages] = useState([

    {
      _id: 1,
      text: 'Bienvenido a nuestro chat de soporte, ¿Cómo podemos ayudarte?',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'SuperSoporte',
      },
    },
    {
      _id: 2,
      text: '¿Cómo puedo agregar mi información de pago?',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'SuperSoporte',
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

     
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{
            _id: 1,
          }}
          renderBubble={renderBubble}
        />
       
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

