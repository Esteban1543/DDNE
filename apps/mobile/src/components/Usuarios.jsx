import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import useHardwareBackHandler from '../hooks/useHardwareBackHandler'
import CardPerson from './CardPerson'
import Clientimage from '../assets/img/client-azul.png'
import axios from 'axios'
import { URI } from '../../config'

const Usuarios = ({ Opcion }) => {

  useHardwareBackHandler({ Opcion })

  const [clientes, setClientes] = useState([]);

  const getClientes = () => {
    axios.get(`${URI}/usuarios`)
      .then(response => {
        setClientes(response.data.data);
      })
      .catch(error => {
        console.error('Error al traer la informacion:', error);
      });
  }

  useEffect(() => {
    getClientes()
  }, []);

  const reload = () => {
    getClientes()
  }

  return (
    <ScrollView style={{flexGrow: 1}}> 

    <View style={styles.contenedor}>

      <View style={styles.container_title}>
        <Text style={styles.title_page}>Usuarios</Text>
      </View>

      {/* <ScrollView > */}
        {clientes.map(user => (
          <CardPerson
            key={user.persona_id}
            icon={Clientimage}
            nombreswitch={'usuarios'}
            nombre={`${user.nombre_1} ${user.nombre_2 ? user.nombre_2 : ''}`}
            apellido={`${user.apellido_1} ${user.apellido_2 ? user.apellido_2 : ''}`}
            telefono={user.telefono}
            correo={user.correo}
            direccion={user.direccion}
            id={user.persona_id}
            permisos={user.permisos}
            alias={user.alias}
            reload={reload}
          />
        ))}
      {/* </ScrollView> */}
    </View>

    </ScrollView>
  );

};

export default Usuarios

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 10
  },
  container_title: {
    height: 50,
    width: '106%',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: 5,
    marginBottom: '3%',

    backgroundColor: '#0174BE',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    // borderWidth: 1,
  },
  title_page: {
    fontSize: 21,
    color: 'white',
    fontWeight: '600'
  },
})