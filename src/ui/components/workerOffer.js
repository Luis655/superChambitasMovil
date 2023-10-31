import React, { useState } from "react";
import { View, Text, TextInput, Button, Modal, StyleSheet } from "react-native";

export default function WorkerOffer({
  modalVisible,
  closeModal,
  handleSubmit,
}) {
  //   const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState("");

  const handleAmountChange = (text) => {
    setAmount(text.replace(/[^0-9.]/g, ""));
  };
  return (
    <Modal visible={modalVisible} animationType="slide" transparent={false}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Ingrese una cantidad:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ejemplo: 100.00"
          value={amount}
          onChangeText={handleAmountChange}
          keyboardType="numeric"
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Aceptar"
            onPress={() => {
              handleSubmit(amount);
              setAmount("")
            }}
          />
          <Button title="Cancelar" onPress={closeModal} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
