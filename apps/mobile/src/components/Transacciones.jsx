import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import axios from 'axios'

import { Entypo } from '@expo/vector-icons';
import useHardwareBackHandler from '../hooks/useHardwareBackHandler'
import { URI } from '../../config';

function Transacciones({ Opcion }) {
    useHardwareBackHandler({ Opcion })

    console.log(URI)

    // const [transacciones_V, setTransacciones_V] = useState([])
    // const [transacciones_C, setTransacciones_C] = useState([])
    
    const [transacciones, setTransacciones] = useState([])

    const getDatos = async () => {
        try{
            const transacciones_V = await axios.get(`${URI}/transacciones-ventas`);
            const transacciones_C = await axios.get(`${URI}/transacciones-compras`);
            
            const transacciones = [...transacciones_V.data.data, ...transacciones_C.data.data];

            setTransacciones(transacciones.sort((a, b) => new Date(b.fecha_registro) - new Date(a.fecha_registro)));
            // console.log(transacciones)
        }catch(err){
            console.error(`Error: ${err}`);
        }
    }

    useEffect(() => {
        getDatos()
    }, [])

    const toggleExpandir = (index) => {
        setTransacciones(prevTransacciones => (
            prevTransacciones.map((transaccion, i) => {
                if (i === index) {
                    return { ...transaccion, expandir: !transaccion.expandir };
                }
                return transaccion;
            })
        ));
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container_title}>
                <Text style={styles.title_page}>Transacciones</Text>
            </View>

            <ScrollView style={styles.scrollView}>
                
                {
                    transacciones.map((transaccion, index) => (
                        <View style={styles.card_registro} key={index}>
                            <TouchableOpacity
                                onPress={() => toggleExpandir(index)}
                            >
                                <View>
                                    <Text style={styles.card_title}>
                                        {
                                            !transaccion.expandir ? `${transaccion.id_transacciones} - ${transaccion.tp_transaccion} - ${transaccion.nombre_empresa}` : `${transaccion.id_transacciones} - ${transaccion.tp_transaccion}`
                                        }
                                    </Text>
                                    <Entypo 
                                        style={styles.flecha_down}
                                        name={!transaccion.expandir ? "chevron-down" : "chevron-up"}
                                        size={16} 
                                    />
                                </View>
                            </TouchableOpacity>

                            {
                                transaccion.expandir && (
                                    <View style={styles.card_data}>
                                        <Text style={styles.info_label}>
                                            Empresa: {'\n'}
                                            Documento: {'\n'}
                                            {transaccion.tp_transaccion == 'Venta' ? 'Producto:' : 'Insumo:'} {'\n'}
                                            Precio: {'\n'}
                                            Fecha:
                                        </Text>

                                        <Text style={styles.info_data}>
                                            {transaccion.nombre_empresa} {'\n'}
                                            {transaccion.tp_transaccion} {'\n'}
                                            {transaccion.tp_transaccion == 'Venta' ? transaccion.producto : transaccion.nombre_insumo} {'\n'}
                                            {transaccion.precio} {'\n'}
                                            {transaccion.fecha_registro.split('T')[0]}
                                        </Text>
                                    </View>
                                )
                            }
                        </View>
                    ))
                }
                
            </ScrollView>
        </SafeAreaView>
    )
}

export default Transacciones

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    scrollView: {
        flex: 1,
        paddingHorizontal: 5,
    },
    card_registro: {
        paddingTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    card_title: {
        color: 'rgb(7, 164, 217)',
        fontSize: 18,
        fontWeight: '700',
        paddingVertical: 7,
        paddingHorizontal: 15,
        position: 'relative'
    },
    flecha_down: {
        position: 'absolute',
        right: '4%',
        top: '30%'
    },
    card_data: {
        flex: 1,
        flexDirection: 'row',
        gap: 15,
        paddingTop: 5,
        paddingBottom: 7,
        paddingHorizontal: 15,
        paddingLeft: 25
    }, 
    info_label: {
        fontSize: 15,
        color: 'gray',
        fontWeight: '500',
        lineHeight: 28,
    },
    info_data: {
        fontSize: 15,
        fontWeight: '500',
        lineHeight: 28,
    }
})