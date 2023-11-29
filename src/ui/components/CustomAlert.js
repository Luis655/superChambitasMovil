// CustomAlert.js
import React from 'react';
import SweetAlert from 'react-native-sweet-alert';

const CustomAlert = ({ title, message, onConfirm, onCancel }) => {
  return (
    <SweetAlert
      show={true}
      title={title}
      confirmText="Aceptar"
      cancelText="Cancelar"
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      {message}
    </SweetAlert>
  );
};

export default CustomAlert;
