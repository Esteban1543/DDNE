import { StatusBar } from 'react-native-web';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URI } from '../../config';

//🔸 Imagenes 
import userImg from "../assets/user.png";
import apiImg from "../assets/api.png";
import webImg from "../assets/web.png";


const Home = () => {

  const current_date = new Date().toISOString().split('T')[0];

  const [user, setUser] = useState(null);

  useEffect(() => {

    (async () => {
      try {
        const session = await AsyncStorage.getItem('user_session');
        session != null && setUser(JSON.parse(session));
        // console.log('datos session >>> ', session)
      } catch (e) {
        console.log(`Error al Obtener Datos de Session ${e}`);
      }
    })();

  }, []);

  const handleLink = (redirect) => {
    const url = redirect === 'api'
      ? `${URI}`
      : `http://${IPv4}:3000`
    ;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <StatusBar />

      <View style={styles.userContainer}>
        <Image source={userImg} style={styles.userImg} />
      </View>

      <View style={styles.infoContainer}>

        <Text style={styles.infoTitle}> Información Usuario </Text>

        <View style={styles.infoView}>
          <Text style={styles.infoLabel}> Nombres:</Text>
          <Text style={styles.infoText} numberOfLines={1}> {user?.names || 'No Disponible'} </Text>
        </View>

        <View style={styles.infoView}>
          <Text style={styles.infoLabel}> Usuario: </Text>
          <Text style={styles.infoText} numberOfLines={1}> {user?.username || 'No Disponible'} </Text>
        </View>

        <View style={styles.infoView}>
          <Text style={styles.infoLabel}> Estado:</Text>
          <Text style={styles.infoText}> Activo </Text>
        </View>

        <View style={styles.infoView}>
          <Text style={styles.infoLabel}> Fecha:</Text>
          <Text style={styles.infoText} numberOfLines={1}>{current_date || 'No Disponible'} </Text>
        </View>
      </View>

      <View style={styles.direccionamiento}>
        <Text style={styles.direccionamiento_text}>Páginas Relacionadas:</Text>

        <TouchableOpacity onPress={() => handleLink('api')} >
          <Image
            source={apiImg}
            style={{ width: 38, height: 38, alignSelf: 'center' }}
          />
          <Text style={{ alignSelf: 'center', marginTop: 2, fontWeight: '500', fontSize: 14 }}> API </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleLink('web')} >
          <Image
            source={webImg}
            style={{ width: 40, height: 40, alignSelf: 'center' }}
          />
          <Text style={{ alignSelf: 'center', marginTop: 2, fontWeight: '500', fontSize: 14 }}>App Web </Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'flex-end'
    paddingTop: '8%',
    backgroundColor: '#fefefe'
  },
  userContainer: {
    width: '100%',
    height: '35%',
    justifyContent: 'center',
    // borderWidth: 1,
  },
  userImg: {
    aspectRatio: 1 / 1,
    // width: '85%',
    height: '85%',
    alignSelf: 'center',
  },
  infoContainer: {
    borderWidth: 2,
    borderColor: 'rgba(34, 136, 226, 0.66)',
    width: '101%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    marginVertical: 20,
    backgroundColor: 'rgba(101, 189, 215, 0.11)',
    overflow: 'hidden'
  },
  infoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: '4%',
    // color: 'white'
  },
  infoView: {
    flexDirection: 'row',
    width: '86%',
    // gap: 3,
    // borderWidth: 1    
  },
  infoLabel: {
    textAlign: 'justify',
    fontSize: 20,
    marginVertical: '1.2%',
    width: '43%',
    lineHeight: 26,
    paddingLeft: '12%',
    paddingRight: 10,
    // borderWidth: 1,
    // color: 'rgb(215, 213, 213)'
  },
  infoText: {
    fontSize: 20,
    marginVertical: '1.2%',
    textTransform: 'capitalize',
    width: '60%',
    lineHeight: 28,
    // borderColor: 'red',
    // borderWidth: 1,
    // color: 'rgb(215, 213, 213)'
  },
  direccionamiento: {
    // borderWidth: 1,
    backgroundColor: '#98c8f21c',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '101%',
    height: '18%',
    paddingHorizontal: '8%'
  },
  direccionamiento_text: {
    // borderWidth: 1,
    width: '40%',
    fontSize: 20,
    textAlign: 'auto',
    lineHeight: 26,
    fontWeight: '500'
  }
})

