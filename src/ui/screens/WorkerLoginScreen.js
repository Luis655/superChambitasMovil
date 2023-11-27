import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from '../../auth/contextAuth';
import { Avatar } from 'react-native-paper';
import useAxios from '../../customHooks/hookAxios';
import { loadAsync } from 'expo-font';
import axios from 'axios';
import { Button, TextInput, IconButton, Icon } from 'react-native-paper';
const validationSchema = Yup.object().shape({
    username: Yup.string().required('El nombre de usuario es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria'),
});
const consultadb = (() => {
    let formdata = new FormData();

    //console.log('ADSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS ')
});

export default function WorkerLoginScreen({ navigation, route }) {
    const { parametro } = route.params;

    const [credenciales, setCredenciales] = useState({ "email": "", "password": "" })
    const [datos, setDatos] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const passwordRef = useRef(null);
    const { state, dispatch } = useAuth();

    const getLoginsss = () => {
        const data = useAxios('auth/login', 'post', { "email": "ccauich@blazar.com.mx", "password": "123456" });
        setData(data);
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

    const getLogin = async () => {
        try {
            const data = await useAxios('auth/login', 'post', { "email": "ccauich@blazar.com.mx", "password": "123456" });
            console.log("Datos de la api " + JSON.stringify(data));
        } catch (error) {
            console.error("Error de la api " + JSON.stringify(error));
        }
    };
    const handleLogin = async (values) => {
        //getLogin();
        setLoading(true)
 
        try {
            const data = await useAxios('auth/login', 'post', { "email": values.username, "password": values.password });
            console.log("Datos de la api " + JSON.stringify(data.data.data));
            if (data.data.status === 'success' && data.data.data) {
                setDatos(data.data.data)
                dispatch({ type: 'SET_USER', payload: values.username });
                dispatch({ type: 'SET_TOKEN', payload: datos });
                if (parametro ==1) {
                    dispatch({ type: 'SET_TYPE', payload: '1' }); //tipo uno(1) es el trabajador, el que usara la app para trabajar
                } else {
                    dispatch({ type: 'SET_TYPE', payload: '2' });//tipo dos(2) es usuario normal, el cliente que usara la app para contratar empleados
                }
                navigation.navigate('HomeWorker')
            }
        } catch (error) {
            setDatos("")
            console.error(error);
            Alert.alert(
                'Error al iniciar sesion',
                'Error',
                [
                    {
                        text: 'Salir',
                        onPress: () => console.log(''),
                    },
                    {
                        text: 'Aceptar',
                        onPress: () => console.log(''),
                    },
                ],
            );
        } finally {
            setLoading(false);
            if(datos === 'success'){
           console.log("finalizo la consulta")
        }else{
            console.log("Error " +datos)
        }
        }
        //console.log("Datos de la api: " + JSON.stringify(data))
        //navigation.navigate('HomeWorker');

       /* Alert.alert(
            'Inicio de secion',
            'Exito',
            [
                {
                    text: 'Salir',
                    onPress: () => console.log(''),
                },
                {
                    text: 'Aceptar',
                    onPress: () => console.log(''),
                },
            ],
        );*/
        //console.log(values);
    };

    return (

        <View style={styles.container}>
        {/* {loading && <ActivityIndicator size="large" />} */}
        <View style={styles.logoContainer}>
            <Avatar.Image style={{ backgroundColor: '#ff9900' }} size={250} source={require('../../../assets/LogoSuperChambitas.png')} />
            <Text style={styles.logo}>Iniciemos esta aventura!</Text>
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
                        placeholder="Correo"
                        keyboardType="email-address"
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username}
                        onSubmitEditing={() => passwordRef.current.focus()}
                    />
                    {errors.username && <Text style={styles.error}>{errors.username}</Text>}
    
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        secureTextEntry={!passwordVisible}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        ref={passwordRef}
                        returnKeyType="done"
                        onSubmitEditing={handleSubmit}
                    />
                    {errors.password && <Text style={styles.error}>{errors.password}</Text>}
    
                    <View style={styles.buttonContainer}>
                        <Button loading={loading} disabled={loading} buttonColor="#009688" mode="contained" onPress={handleSubmit}>
                            Iniciar sesión
                        </Button>
    
                        <View style={styles.orContainer}>
                            <Text style={styles.orText}>O</Text>
                        </View>
    
                        <Button buttonColor="#009688" mode="contained" onPress={() => parametro == '1' ? navigation.navigate('UserRegister', {parametro}) : navigation.navigate('UserRegister', {parametro})}>
                            Registrarse
                        </Button>
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
        backgroundColor: '#ff9900',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        marginBottom: 30,
        alignItems: 'center',
    },
    logo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 10,
    },
    formContainer: {
        width: '80%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#009688',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginBottom: 15,
        fontSize: 14,
    },
    orButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#009688',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        pointerEvents: 'none',
        marginBottom: 15,
    },
    registerButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#009688',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 30,
    },
    orButtonText: {
        color: '#009688',
        fontSize: 16,
        fontWeight: 'bold',
    },
    orContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
    },
    orText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
});
