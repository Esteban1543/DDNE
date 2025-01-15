import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView } from 'react-native'
import axios from 'axios'

import { URI } from '../../config'

function Productos() {
  const [productos, setProductos] = useState([])
  const [tipo_producto, setTipo_producto] = useState([])

  const getProductos = async () => {
    try{
      const producto = await axios.get(`${URI}/productos`);
      const tipo_producto = await axios.get(`${URI}/tipo_productos`)
      
      console.log(tipo_producto.data.data);
      setProductos(producto.data.data);
      setTipo_producto(tipo_producto.data.data);
    }catch(err){
      console.error(`Error: ${err}`);
    }
  }

  useEffect(() => {
    getProductos()
  }, [])

  const productosAgrupados = productos.reduce((producto_tipo, producto) => {
    const tipoProducto = producto.fk_tipo_producto;

    if (!producto_tipo[tipoProducto]) {
        producto_tipo[tipoProducto] = {
            productos: [],
            existencias: 0
        };
    }

    producto_tipo[tipoProducto].productos.push(producto);
    producto_tipo[tipoProducto].existencias++;

    // console.log(producto_tipo);

    return producto_tipo;
  }, {})

  const productosExistencias = Object.values(productosAgrupados);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container_title}>
        <Text style={styles.title_page}>Productos</Text>
      </View>

      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.contenido}>
          {
            productosExistencias.map((producto, index) => (
              <View style={styles.card_producto} key={index}>
                <View style={styles.imagen_producto} key={producto.productos[0].id_producto}>
                  {
                    producto.productos[0].fk_tipo_producto === 'Jumbo' ? (
                      <Image style={styles.imagen} source={require('../assets/img/rollo.png')}/>
                    ) : producto.productos[0].fk_tipo_producto === 'Resma' ? (
                      <Image style={styles.imagen} source={require('../assets/img/resmas.png')}/>
                    ) : producto.productos[0].fk_tipo_producto === 'Rollito' ? (
                      <Image style={styles.imagen} source={require('../assets/img/rollito.png')}/>
                    ) : producto.productos[0].fk_tipo_producto === 'Vinipel' ? (
                      <Image style={styles.imagen} source={require('../assets/img/vinipel.png')}/>
                    ) : (null)
                  }
                </View>
                <View style={styles.texto}>
                  <Text style={styles.indices}>
                    Producto: {'\n'}
                    Existencias: {'\n'}
                    Comentario:
                </Text>
                <Text style={styles.indices_texto}>
                  {producto.productos[0].fk_tipo_producto} {'\n'}
                  {producto.existencias} {'\n'}
                  {producto.productos[0].comentario == undefined ? 'N/A' : producto.productos[0].comentario}
                </Text>
                </View>
              </View>
            ))
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Productos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_title: {
      height: '6%',
      justifyContent: 'center',
      paddingHorizontal: 10,
      paddingTop: 5,
      marginBottom: '3%',

      backgroundColor: 'rgba(4, 140, 186, 0.85)',
      borderTopWidth: 1,
      borderTopColor: '#ccc',
  },
  title_page: {
      fontSize: 21,
      color: 'white',
      fontWeight: '600'
  },
  scrollViewContainer: {
    // flex: 1,
    paddingHorizontal: 5,
  },
  contenido: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card_producto: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: 'blue',
    width: '90%',
    marginBottom: 10,

    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#0174BE'
  },
  imagen_producto: {
    width: '30%',
    height: 100,
    
    justifyContent: 'center',
    alignItems: 'center'
  },
  imagen: {
    width: 80,
    height: 80,
    borderRadius: 50,
    // backgroundColor: 'red',
  },
  texto: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  indices: {
    // marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 17
  },
  indices_texto: {
    fontSize: 17
  }
})