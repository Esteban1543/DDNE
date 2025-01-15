import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity,
   ToastAndroid 
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { URI } from '../../config';

const transparent = 'rgba(0,0,0,0.5)';

const DeleteClient = ({nombre, id, reload}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const url = `${URI}/deleteClient`;

    const handleSubmit = async () => {
      console.log(id)

      try {
        // console.log('Entro al try')
        const data = await axios.put(`${url}/${id}`);


        if (data.data.success){
          ToastAndroid.show('Cliente Eliminado ✅', ToastAndroid.LONG);
          reload()
          setModalVisible(false);
        } else {
          ToastAndroid.show('Error al eliminar Cliente ❌', ToastAndroid.LONG);
          setModalVisible(false);
        }
      } catch (error) {
        ToastAndroid.show('Error al enviar datos ✖️', ToastAndroid.LONG)
        console.log(error);
      }
    };


    return (
      <>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <AntDesign name="delete" size={30} color="red" />
        </TouchableOpacity>

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View
            style={styles.centeredView}
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.modalView}>

            <Text
                style={{
                  marginTop: 15,
                  marginBottom: 10,
                  fontSize: 16
                }}
              >
                ¿ Seguro que desea eliminar a {nombre} ?
            </Text>

              <View style={styles.modaltop}>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.cerrar}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Cancelar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.eliminar}>
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                    onPress={() => {
                      handleSubmit();
                      setModalVisible(false);
                    }}
                  >
                    Eliminar
                  </Text>
                </TouchableOpacity>
              </View>             
            </View>
          </View>
        </Modal>
      </>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: transparent,
    },
    modalView: {
        backgroundColor: 'white',
        padding: 15,
        width: '90%',
        borderRadius: 10,
        alignItems: 'center'
    },
    cerrar: {
      borderColor: 'blue',
      backgroundColor: '#2F58CD',
      fontSize: 10,
      borderRadius: 5,
      padding: 2,
      paddingHorizontal: 9,
      paddingVertical: 5
    },
    eliminar: {
      borderColor: 'red',
      backgroundColor: '#D21312',
      borderRadius: 5,
      padding: 2,
      paddingHorizontal: 9,
      paddingVertical: 5
    },
    modaltop: {
      // position: 'absolute',
      top: 1,
      alignItems: 'center',
      flexDirection: 'row',
      gap: 10,
      paddingLeft: 15,
      paddingTop: 10,
      marginBottom: 10
    }
});

export default DeleteClient;
