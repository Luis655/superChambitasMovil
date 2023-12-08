import React, { useState } from 'react';
import { View, Modal, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { SignalRContext } from '../../signal/signalRConext';
import { randomUUID } from 'expo-crypto';
import { useAuth } from '../../auth/contextAuth';
import useAxios from '../../customHooks/hookAxios';

const ChatModal = ({ visible, onClose, name, price, id, userId }) => {
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();
  SignalRContext.useSignalREffect(`catServiceWorker`, (message) => {
    if (message.serviceId == id && (user.role == 1 ? user.id != message.worker : user.id != message.client)) {
      const newMessage = {
        _id: randomUUID(),
        text: message.message,
        createdAt: new Date(),
        user: {
          _id: user.role == 1 ? message.worker : message.client,
          name: user.role == 1 ? "Chambeador" : "Cliente",
        }
      }
      setMessages((prevMessages) => GiftedChat.append(prevMessages, [{ ...newMessage }]));
    }
  })
  //   SignalRContext.useSignalREffect(`catServiceClient`, (message)=> {
  //  if (message.serviceId == id && user.role == 2) {
  //   const newMessage = {
  //     _id: randomUUID(),
  //     text: message.message,
  //     createdAt: new Date(),
  //     user: {
  //       _id: message.client,
  //       name: "Cliente",
  //     }
  //   }
  //   setMessages((prevMessages) => GiftedChat.append(prevMessages, [{...newMessage}]));
  //  }
  // })

  const onSend = async (newMessages = []) => {
   if (user.id == newMessages[0].user._id) {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
   }
    const data = {
      message: `${newMessages[0].text}`,
      client: user.role == 2 ? user.id : userId,
      serviceId: id,
      worker: user.role == 1 ? user.id : 0,
      role: user.role
    }
    await useAxios('message', 'POST', JSON.stringify(data))
  };

  const renderBubble = (props) => {
    return (
      <Bubble key={randomUUID()}
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
            _id: user.id,
            name: user.role == 1 ? "Chambeador" : "Cliente"
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
    flex: 3,
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
