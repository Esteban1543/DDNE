
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  // ToastAndroid,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import useHardwareBackHandler from '../hooks/useHardwareBackHandler';
import CardRegistroExpandible from './CardRegistroExpandible';
import Loading from './Loading';
import { URI } from '../../config';

// API ⚙️
const ENDPOINT = `${URI}/inv/produccion`;

const InvProduccion = ({ Opcion }) => {

  // Hooks 🔗
  const [isLoading, setIsLoading] = useState(true);
  const [registros, setRegistros] = useState([]);
  useHardwareBackHandler({ Opcion })

  //🔸 Solicitud de Datos a API
  useEffect(() => {

    const obtenerDatos = async () => {
      try {
        const response = await axios.get(ENDPOINT);
        console.log(response.data.success, ' +++');

        response.data.success
          ? setRegistros(response.data.data)
          : setRegistros([]);
        ;
        setIsLoading(false);

      } catch (error) {
        setRegistros(false);
        console.log(error);
        ToastAndroid.show('⛔ Error en Solicitud de Datos a API', ToastAndroid.LONG);
        console.log(registros)
      }
    }

    obtenerDatos();
  }, []);
  // console.log('>>> ', registros)

  return (
    <>
      {isLoading
        ? <Loading />
        : (
          <SafeAreaView style={styles.container}>
            <View style={styles.container_title}>
              <Text style={styles.title_page}>Registros Producción</Text>
            </View>


            <ScrollView style={styles.scrollView} >
              {
                registros && registros.length > 0 ?
                  registros.map(r => (
                    <CardRegistroExpandible
                      key={r.id_inv_produccion + 'card'}
                      title={`${r.id_inv_produccion} - ${r.fk_tipo_producto} ${r.id_precios}`}
                      id={r.id_inv_produccion}
                    >
                      <Text
                        style={styles.info_label}
                        key={r.id_inv_produccion + 'info_label'}
                      >
                        N° Lote: {'\n'}
                        Medida: {'\n'}
                        Peso: {'\n'}
                        Color: {'\n'}
                        Precio: {'\n'}
                        F. Registro:
                      </Text>

                      <Text
                        style={styles.info_data}
                        key={r.id_inv_produccion + 'info_data'}
                      >
                        {r.id_rollo_jumbo + '\n'}
                        {r.unidad_medida + '\n'}
                        {r.peso_producto + ' kg' + '\n'}
                        {r.fk_color + '\n'}
                        $ {r.precio + '\n'}
                        {r.fecha_registro.split('T')[0]}
                      </Text>
                    </CardRegistroExpandible>
                  )) : <Text style={styles.mensaje_vacio}> No hay registros disponibles ✖️</Text>
              }
            </ScrollView>
          </SafeAreaView>
        )
      }
    </>
  )
}

export default InvProduccion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: StatusBar.currentHeight,
    // borderWidth: 1
  },
  container_title: {
    height: '6%',
    justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 5,
    marginBottom: '3%',

    backgroundColor: '#0174BE',
    // backgroundColor: 'rgba(4, 140, 186, 0.85)',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    // borderBottomWidth: 2,
    // borderBottomColor: 'rgb(4, 140, 186)',
    // borderWidth: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 5,
  },
  title_page: {
    fontSize: 21,
    color: 'white',
    fontWeight: '600'
  },
  text: {
    color: '#fefefe',
    fontSize: 42,
  },

  info_label: {
    fontSize: 15,
    color: '#435585',
    fontWeight: '500',
    lineHeight: 28,
    marginBottom: 7
  },
  info_data: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 28,
    marginBottom: 7
  },
  mensaje_vacio: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: '5%'
  }
});
