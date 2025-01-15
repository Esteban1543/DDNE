
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ToastAndroid
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import LogoDDNE from '../../assets/LogoDDNE.png'
import { LinearGradient } from 'expo-linear-gradient';
import { URI } from '../../config';

//API ⚙️
const ENDPOINT = `${URI}/login`;

const LoginView = () => {

  const redirect = useNavigation();

  const [formData, setFormData] = useState({
    usuario: 'Admin',
    password: 'contra123'
  });

  const dataInto = (key, value) => {
    setFormData({
      ...formData,
      [key]: value.trim()
    });
  };


  const handleSubmit = async () => {

    console.log('Formulario >> ', formData);
    try {
      const response = await axios.post(ENDPOINT, formData, {
        validateStatus: function (status) {
          return status < 500; // Resuelve solo si el código de estado es menor que 500
        }
      });
      // console.log(response)
      if (response.data.success) {

        //🔹 Almacena la información de la sesión en AsyncStorage
        const user = JSON.stringify(response.data.user.session);
        await AsyncStorage.setItem('user_session', user);

        redirect.navigate("HomeTab");
        return
      }

      console.log(` ${response.data.message}`);
      ToastAndroid.show(` ${response.data.message}`, ToastAndroid.SHORT)

    } catch (error) {

      // console.log(error.response.status)
      console.error('Error al enviar datos:', error);

      error.response.status === 401 ? ToastAndroid.show(` ${error.response.data.message}`, ToastAndroid.SHORT)
        : ToastAndroid.show('❌ Error al enviar datos:', ToastAndroid.SHORT);

    }
  };

  return (

    <View style={styles.container}>

      <View style={styles.viewLoginText}>
        <Text style={styles.loginText}>Login</Text>
      </View>


      <LinearGradient
        colors={['rgb(38, 112, 206)', 'rgba(28, 187, 236, 0.58)', 'rgb(26, 164, 247)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.2 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Login */}
      <View style={styles.loginContainer}>

        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeText}>DDNE <Text style={{ color: '#000' }}>Inventory</Text></Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Usuario</Text>
          <TextInput
            style={styles.input}
            value={formData.usuario}
            onChangeText={(text) => dataInto('usuario', text)}
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={formData.password}
            onChangeText={(text) => dataInto('password', text)}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            {/* <TouchableOpacity style={styles.button} onPress={() => redirect.navigate("HomeTab")}> */}
            <Text style={styles.buttonText}>INGRESAR</Text>
          </TouchableOpacity>
        </View>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={LogoDDNE} style={styles.logo} />
        </View>

      </View>

    </View>
  );
};

export default LoginView;


//Estilo Gradient
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    // borderTopColor: 'rgb(8, 140, 185)',
    // borderTopWidth: 2,
    backgroundColor: '#ccc'
  },
  logoContainer: {
    // borderWidth: 1, 
    width: '60%',
    height: 90,
    alignSelf: 'center',
    opacity: 1,
    marginTop: '15%'
  },
  logo: {
    width: '100%',
    height: '100%',
    opacity: 0.9
    // borderWidth: 1,  
  },
  loginContainer: {
    width: '101%',
    height: '80%',
    paddingVertical: '10%',
    paddingHorizontal: 17,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#fefefe'
  },
  viewLoginText: {
    // borderWidth: 2, 
    position: 'absolute',
    top: '9%',
    width: '98%',
    paddingHorizontal: 25,
    zIndex: 2
  },
  loginText: {
    fontSize: 29,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    color: '#fefefe',
    // borderWidth: 1
  },
  welcomeTextContainer: {
    alignItems: 'center',
    marginBottom: '7%',
    paddingHorizontal: 18,
  },
  welcomeText: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#1D267D',
    alignSelf: 'flex-start'
  },
  formContainer: {
    paddingHorizontal: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: '25%'
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 5,
    color: 'rgb(3, 36, 92)'
  },
  input: {
    fontSize: 15,
    paddingVertical: 9,
    paddingHorizontal: 8,
    marginTop: '2%',
    marginBottom: '7%',

    // borderBottomWidth: 1,
    // borderColor: 'rgb(30, 0, 137)',

    borderRadius: 5,
    backgroundColor: 'rgba(204, 204, 204, 0.32)',
    // color: '#fff',
  },
  button: {
    backgroundColor: 'rgb(58, 128, 196)',
    borderRadius: 7,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: '3%',
    width: '75%',
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 16,
    color: '#fefefe',
    fontWeight: 'bold'
  },
});