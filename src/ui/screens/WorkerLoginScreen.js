import React, { useState, useRef,useEffect } from 'react';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from '../../auth/contextAuth';
import { Avatar } from 'react-native-paper';
import useAxios from '../../customHooks/hookAxios';
import { loadAsync } from 'expo-font';
import axios from 'axios';

const validationSchema = Yup.object().shape({
    username: Yup.string().required('El nombre de usuario es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria'),
});
const consultadb = (()=>{let formdata = new FormData();

console.log('ADSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS ')
});

export default function WorkerLoginScreen({navigation}) {
    const [credenciales, setCredenciales] = useState({"email": "", "password": ""})
    const [datas, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState();



    const passwordRef = useRef(null);
    const { state, dispatch } = useAuth();

    const getLogin = () =>{
        setData(useAxios('auth/login', 'post', {"email": "ccauich@blazar.com.mx", "password": "123456"} ));
        console.log(datas);

    }

    //EJEMPLO DE COMO LLAMAR A LA API
    /*const fetchData = async () => {
        let formdata = new FormData();
        formdata.append("email", "ccauich@blazar.com.mx");
        formdata.append("password", "123456");
        try {
          const response = await axios({
            url: 'https://supercapi.azurewebsites.net/auth/login',
            method: 'post',
            data: {"email": "ccauich@blazar.com.mx", "password": "123456"} ,
            headers: {
              'Content-Type': 'application/json'
            }
          });
          setData(response);
          console.log(response)
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };*/


    const handleLogin = (values) => {
        //fetchData();
        console.log(datas, error, loading)
        navigation.navigate('HomeWorker');
        dispatch({ type: 'SET_USER', payload: values.username });
        dispatch({ type: 'SET_TOKEN', payload: 'asdasdasdsaddas' });
        if (values.username == 'Trabajador') {
            dispatch({ type: 'SET_TYPE', payload: '1' });
        }else{
            dispatch({ type: 'SET_TYPE', payload: '2' });
        }
        Alert.alert(
            'Inicio de secion',
            'Exito',
            [
              {
                text: 'Salir',
                onPress: () => console.log('Botón 1 presionado'),
              },
              {
                text: 'Aceptar',
                onPress: () => console.log('Botón 2 presionado'),
              },
            ],
          );
        //console.log(values);
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
            <Avatar.Image size={190} source={require('../../../assets/splash.png')} />
                <Text style={styles.logo}>SuperChambitas</Text>
            </View>
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={handleLogin}
                validationSchema={validationSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View style={styles.formContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre de usuario"
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                            onSubmitEditing={() => passwordRef.current.focus()}

                        />
                        {errors.username && <Text style={styles.error}>{errors.username}</Text>}
                        <TextInput
                            style={styles.input}
                            placeholder="Contraseña"
                            secureTextEntry={true}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            ref={passwordRef}
                            returnKeyType="done"
                            onSubmitEditing={handleSubmit}
                        />
                        {errors.password && <Text style={styles.error}>{errors.password}</Text>}


                        <View style={styles.buttonContainer}>
                        
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Iniciar sesión</Text>
                        </TouchableOpacity>


                            <View style={styles.orContainer}>
                                <Text style={styles.orText}>O</Text>
                            </View>



                        <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('WorkerRegister')}>
                            <Text style={styles.orButtonText}>Registrarse</Text>
                        </TouchableOpacity>

                        </View>

                    </View>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        marginBottom: 30,
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    formContainer: {
        width: '80%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    orButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#007bff',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        pointerEvents: 'none'
    },
    registerButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#007bff',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    orButtonText: {
        color: '#007bff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    orContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25
    },
    orText: {
        fontSize: 20,
        fontWeight: 'bold',

    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop:30
    },
});
