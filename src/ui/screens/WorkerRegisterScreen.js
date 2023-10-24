import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from 'react-native-virtualized-view';

const areaCodes = [
  { label: 'Aguascalientes (449)', value: '449' },
  { label: 'Baja California (686)', value: '686' },
  { label: 'Baja California Sur (612)', value: '612' },
  { label: 'Campeche (981)', value: '981' },
  { label: 'Chiapas (961)', value: '961' },
  { label: 'Chihuahua (614)', value: '614' },
  { label: 'Ciudad de México (55)', value: '55' },
  { label: 'Coahuila (844)', value: '844' },
  { label: 'Colima (312)', value: '312' },
  { label: 'Durango (618)', value: '618' },
  { label: 'Guanajuato (473)', value: '473' },
  { label: 'Guerrero (747)', value: '747' },
  { label: 'Hidalgo (771)', value: '771' },
  { label: 'Jalisco (33)', value: '33' },
  { label: 'México (722)', value: '722' },
  { label: 'Michoacán (443)', value: '443' },
  { label: 'Morelos (777)', value: '777' },
  { label: 'Nayarit (311)', value: '311' },
  { label: 'Nuevo León (81)', value: '81' },
  { label: 'Oaxaca (951)', value: '951' },
  { label: 'Puebla (222)', value: '222' },
  { label: 'Querétaro (442)', value: '442' },
  { label: 'Quintana Roo (998)', value: '998' },
  { label: 'San Luis Potosí (444)', value: '444' },
  { label: 'Sinaloa (667)', value: '667' },
  { label: 'Sonora (662)', value: '662' },
  { label: 'Tabasco (993)', value: '993' },
  { label: 'Tamaulipas (834)', value: '834' },
  { label: 'Tlaxcala (246)', value: '246' },
  { label: 'Veracruz (229)', value: '229' },
  { label: 'Yucatán (999)', value: '999' },
  { label: 'Zacatecas(492', value: '492' }
];
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('El nombre es obligatorio'),
  lastName: Yup.string().required('Los apellidos son obligatorios'),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, 'El número de teléfono debe tener 10 dígitos')
    .required('El número de teléfono es obligatorio'),
  postalCode: Yup.string()
    .matches(/^\d{5}$/, 'El código postal debe tener 5 dígitos')
    .required('El código postal es obligatorio'),
  skills: Yup.string().required('Las aptitudes son obligatorias'),
  age: Yup.number().required('La edad es obligatoria'),
  address: Yup.string().required('La dirección es obligatoria'),
});

export default function WorkerRegister() {
  const handleRegister = (values) => {
    console.log(values);
  };
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Aguascalientes (449)', value: '449' },
    { label: 'Baja California (686)', value: '686' },
    { label: 'Baja California Sur (612)', value: '612' },
    { label: 'Campeche (981)', value: '981' },
    { label: 'Chiapas (961)', value: '961' },
    { label: 'Chihuahua (614)', value: '614' },
    { label: 'Ciudad de México (55)', value: '55' },
    { label: 'Coahuila (844)', value: '844' },
    { label: 'Colima (312)', value: '312' },
    { label: 'Durango (618)', value: '618' },
    { label: 'Guanajuato (473)', value: '473' },
    { label: 'Guerrero (747)', value: '747' },
    { label: 'Hidalgo (771)', value: '771' },
    { label: 'Jalisco (33)', value: '33' },
    { label: 'México (722)', value: '722' },
    { label: 'Michoacán (443)', value: '443' },
    { label: 'Morelos (777)', value: '777' },
    { label: 'Nayarit (311)', value: '311' },
    { label: 'Nuevo León (81)', value: '81' },
    { label: 'Oaxaca (951)', value: '951' },
    { label: 'Puebla (222)', value: '222' },
    { label: 'Querétaro (442)', value: '442' },
    { label: 'Quintana Roo (998)', value: '998' },
    { label: 'San Luis Potosí (444)', value: '444' },
    { label: 'Sinaloa (667)', value: '667' },
    { label: 'Sonora (662)', value: '662' },
    { label: 'Tabasco (993)', value: '993' },
    { label: 'Tamaulipas (834)', value: '834' },
    { label: 'Tlaxcala (246)', value: '246' },
    { label: 'Veracruz (229)', value: '229' },
    { label: 'Yucatán (999)', value: '999' },
    { label: 'Zacatecas(492', value: '492' }
  ]);
  return (
    <ScrollView>

      <View style={styles.container}>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            phoneNumber: '',
            postalCode: '',
            skills: '',
            age: '',
            address: '',
          }}
          onSubmit={handleRegister}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View style={styles.formContainer}>
              {errors.firstName && (
                <Text style={[styles.error, { marginBottom: 0 }]}>{errors.firstName}</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                value={values.firstName}
              />
              {errors.lastName && (
                <Text style={[styles.error, { marginBottom: 0 }]}>{errors.lastName}</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder="Apellidos"
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                value={values.lastName}
              />
              {errors.phoneNumber && (
                <Text style={[styles.error, { marginBottom: 0 }]}>{errors.phoneNumber}</Text>
              )}






              <View style={styles.phoneContainer}>

                {/* <TextInput
                style={[styles.input, styles.phoneInput]}
                placeholder="Lada"
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
            />*/}
                <TextInput
                  style={[styles.input, styles.phoneInput]}
                  placeholder="Número de teléfono"
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber}
                />
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  defaultValue={'Mexico'}
                  placeholder="Lada"
                  containerStyle={{ height: 'auto', marginBottom: '5%', flex: 2 }}
                  style={{ backgroundColor: '#fafafa', borderWidth: .5, borderColor: '#ccc', borderRadius: .5, flex: 1 }}
                  itemStyle={{ justifyContent: 'flex-start' }}
                  dropDownStyle={{ backgroundColor: '#fafafa', borderWidth: .5, borderColor: '#ccc', borderRadius: .5 }}
                  onChangeItem={(item) => setFieldValue('phoneNumber', item.value)}
                />
              </View>

              {errors.postalCode && (
                <Text style={[styles.error, { marginBottom: 0 }]}>{errors.postalCode}</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder="Código postal"
                onChangeText={handleChange('postalCode')}
                onBlur={handleBlur('postalCode')}
                value={values.postalCode}
              />
              {errors.skills && (
                <Text style={[styles.error, { marginBottom: 0 }]}>{errors.skills}</Text>
              )}
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Aptitudes"
                multiline
                numberOfLines={4}
                onChangeText={handleChange('skills')}
                onBlur={handleBlur('skills')}
                value={values.skills}
              />
              {errors.age && (
                <Text style={[styles.error, { marginBottom: 0 }]}>{errors.age}</Text>
              )}
              <TextInput
                style={[styles.input]}
                placeholder="Edad"
                onChangeText={handleChange('age')}
                onBlur={handleBlur('age')}
                value={`${values.age}`}
              />
              {errors.address && (
                <Text style={[styles.error, { marginBottom: 0 }]}>{errors.address}</Text>
              )}
              <TextInput
                style={[styles.input]}
                placeholder="Dirección"
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                value={`${values.address}`}
              />

              <TouchableOpacity
                style={[styles.button, styles.registerButton]}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.buttonText}>Registrarse</Text>
              </TouchableOpacity>

            </View>
          )}

        </Formik>
      </View>
    </ScrollView>


  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  formContainer: {
    width: '100%',
  },
  input: {
    height: 50,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  phoneContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  phoneInput: {
    flex: 3,
    marginRight: 20,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 20,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#ff9900',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerButton: {
    marginTop: 20,
  },
});
