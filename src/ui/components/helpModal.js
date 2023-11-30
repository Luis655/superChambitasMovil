// HelpModal.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HelpModal = ({ modalVisible, closeModal }) => {
  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Ayuda</Text>
          <Text style={styles.modalText}>
            Bienvenido a nuestra aplicación de chambas. Aquí conectamos a
            personas que buscan oportunidades laborales con aquellas que
            necesitan resolver una necesidad o recibir una mano extra. {"\n\n"}Explora
            las posibilidades y encuentra la ayuda que necesitas o la
            oportunidad que estás buscando. ¡Estamos aquí para facilitar la
            conexión entre talento y necesidades!
          </Text>
          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.modalClose}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalClose: {
    color: "blue",
    fontSize: 16,
    textAlign: "right",
    textDecorationLine: "underline",
  },
});

export default HelpModal;
