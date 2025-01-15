import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import useUserSession from '../hooks/useUserSession';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

import transaccionImg from '../assets/img/transaccion.png';
import productoImg from '../assets/img/producto.png';
import NotAllowed from './NotAllowed';

import Transacciones from '../components/Transacciones';
import Productos from '../components/Productos';

function Contabilidad() {

    const [opcion, setOpcion] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            setOpcion(null);
        }, [])
    );

    //🔸 Permisos del Usuario
    const data_user = useUserSession();
    const permisos_user = data_user ? data_user.allowed : []; 
    // console.log('data_user en Contabilidad', permisos_user)

    return (
        <View style={styles.contenedor}>
            {
                opcion === 'Transacciones' ? (
                    permisos_user.includes('Transacciones') ?
                    <Transacciones Opcion={setOpcion}/> : <NotAllowed Opcion={setOpcion}/>
                ) : opcion === 'Productos' ? (
                    permisos_user.includes('Productos') ?
                    <Productos Opcion={setOpcion}/> : <NotAllowed Opcion={setOpcion}/>
                ) : (
                    <View style={styles.opciones}>
                        {/* <View style={styles.tarjeta}>
                            <TouchableOpacity 
                                style={styles.boton}
                                onPress={() => setOpcion('Informe')}
                            >
                                <Text style={styles.tittle}>Informe Inventario</Text>
                            </TouchableOpacity>
                        </View> */}
                        <View style={styles.tarjeta}>
                            <TouchableOpacity 
                                style={styles.boton}
                                onPress={() => setOpcion('Transacciones')}
                            >
                                <LinearGradient
                                    colors={['rgb(38, 143, 206)', 'rgba(126, 197, 241, 0.7)', 'rgba(26, 164, 247, 0.08)']}
                                    start={{ x: 0, y: 0 }}
                                    // end={{ x: 1, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={StyleSheet.absoluteFill}
                                />
                                <View style={styles.view_image}>
                                    <Image source={transaccionImg} style={{ width: 90, height: 90 }} />
                                </View>
                                <Text style={styles.tittle}>Transacciones</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.tarjeta}>
                            <TouchableOpacity 
                                style={styles.boton}
                                onPress={() => setOpcion('Productos')}
                            >
                                <LinearGradient
                                    colors={['rgb(38, 143, 206)', 'rgba(126, 197, 241, 0.7)', 'rgba(26, 164, 247, 0.08)']}
                                    start={{ x: 0, y: 0 }}
                                    // end={{ x: 1, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={StyleSheet.absoluteFill}
                                />
                                <View style={styles.view_image}>
                                    <Image source={productoImg} style={{ width: 83, height: 83 }} />
                                </View>
                                <Text style={styles.tittle}>Productos</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.logo}>DDNE Inventory</Text>
                    </View>
                )
            }
        </View>
        
    )
}

export default Contabilidad;

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
    },
    opciones: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30
    },
    tarjeta: {
        width: '85%'
    },
    boton: {
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        overflow: 'hidden',
        borderColor: 'rgba(126, 197, 241, 0.7)',
        borderWidth: 1,
        // gap: 10,
        flexDirection: 'row'
    },
    view_image: {
        width: '40%',
        // borderWidth: 1,
        alignItems: 'center'
    },
    tittle: {
        width: '50%',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'rgb(0, 10, 67)',
        // borderWidth: 1
    },
    logo: {
        position: 'absolute',
        bottom: 13,
        fontSize: 18, 
        fontWeight: '500',
        color: '#246391'
    }
})