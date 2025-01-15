import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, ScrollView, ToastAndroid, Alert } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list'
import axios from 'axios';
import { URI } from '../../config';

const transparent = 'rgba(0,0,0,0.5)';

// API 🌐
const ENDPOINT = `${URI}/createprovider`;

const AddProvider = ({ reload }) => {
  //🔸 Manejo de apertura para Modal
  const [modalVisible, setModalVisible] = useState(false);

  //🔸 Manejo de Informacion de Inputs en Formulario
  const datos_iniciales = {
    tipo_id: '',
    identificacion: '',
    nombres: 'Victor Manuelle',
    apellidos: 'Lopez Orjuela',
    telefono: '3113256452',
    direccion: 'direccion prueba',
    email: 'email@gmail.com',
    nit: '800',
    empresa: 'Empresa S.A.S',
    descEmpresa: 'Empresa Proveedora',
  }

  const [data, setData] = useState(datos_iniciales);
  const dataInto = (key, value) => {
    setData({
      ...data,
      [key]: value.trim()
    });
  };

  //🔸 Seleccion de Tipo de Documento
  const tipodoc = [
    //🔹 Array que se pasa como argumento al SelectList
    { key: 'CC', value: 'Cédula de Ciudadania' },
    { key: 'CE', value: 'Cédula de Extranjeria' },
    { key: 'Otro', value: 'Otro' }
  ];

  //🔹 función que almacena el valor seleccionado 
  const [selected, setSelected] = useState('');
  useEffect(() => {
    setData({
      ...data,
      tipo_id: selected
    });
  }, [selected])

   //🔸 Validación Datos
   const validacion_data = () => {
    const regex_validation = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ0-9\s.@-]+$/;
    let success = true;
    const errores = ['✖️ Datos no válidos:', ''];

    Object.entries(data).forEach(([key, value]) => {
      // console.log(value);

      if (!regex_validation.test(value)) {
        console.log(`✖️ Dato no válido: ${value == '' ? 'Vacío' : value} en ${key}`);
        success = false;
        errores.push(`" ${value == '' ? 'Vacío' : value} " en ${key}`);
      }
    });

    return { success, errores };
  }

  const hadleValidation = () => {
    const resp_validacion = validacion_data();
    console.log('>>> ', resp_validacion)
    
    if (!resp_validacion.success) return Alert.alert('Errores de validación', resp_validacion.errores.join('\n'));
    handleSubmit();
  }

  //🔸 Envio de Datos API
  const handleSubmit = async () => {
    try {
    // console.log(data)
    // console.log(selected) //CC

      const response = await axios.post(`${ENDPOINT}`, data, {
        validateStatus: function (status) {
          return status < 500; // Resuelve solo si el código de estado es menor que 500
        }});
      // console.log(response);

      if (response.data.success) {
        ToastAndroid.show('Proveedor Creado ✅', ToastAndroid.LONG);
        setModalVisible(false);
        setData(datos_iniciales)
        reload();
      } else {
        // ToastAndroid.show(`No se ha podido añadir al proveedor ${response.data.message}`, ToastAndroid.LONG);
        Alert.alert(`❌ ${response.data.message}`);
        console.log(response.data);
        setModalVisible(false);
      }
    } catch (error) {
      ToastAndroid.show('Ha ocurrido un error al enviar los datos ❌', ToastAndroid.LONG);
      console.log(error)
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          position: "absolute",
          right: 10,
          // bottom: 4,
          backgroundColor: '#EEF5FF',
          borderRadius: 50,
          padding: 4
        }}
      >
        <AntDesign name="adduser" size={24} color="#0766AD" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.modalView}>

            <Text style={styles.tituloModal}>Crear Proveedor</Text>

            <View style={styles.container}>
              <View style={{ maxHeight: 210, paddingBottom: 12 }}>
                <Text style={styles.inputLabel}>Tipo de Identificacion</Text>
                <SelectList
                  search={false}
                  boxStyles={{ width: 300, height: 30, paddingVertical: 3, borderRadius: 5, marginBottom: 0 }}
                  data={tipodoc}
                  setSelected={setSelected}
                  placeholder='Tipo de documento'
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>N° Identificacion</Text>
                <TextInput
                  style={styles.input}
                  value={data.identificacion}
                  keyboardType="numeric"
                  onChangeText={(value) => dataInto("identificacion", value)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Nombres</Text>
                <TextInput
                  style={styles.input}
                  value={data.nombres}
                  onChangeText={(value) => dataInto("nombres", value)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Apellidos</Text>
                <TextInput
                  style={styles.input}
                  value={data.apellidos}
                  onChangeText={(value) => dataInto("apellidos", value)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Telefono</Text>
                <TextInput
                  style={styles.input}
                  value={data.telefono}
                  keyboardType="numeric"
                  onChangeText={(value) => dataInto("telefono", value)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={data.email}
                  onChangeText={(value) => dataInto("email", value)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Direccion</Text>
                <TextInput
                  style={styles.input}
                  value={data.direccion}
                  onChangeText={(value) => dataInto("direccion", value)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>NIT</Text>
                <TextInput style={styles.input}
                  keyboardType="numeric"
                  value={data.nit}
                  onChangeText={(value) => dataInto("nit", value)}
                />

              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Empresa</Text>
                <TextInput style={styles.input}
                  value={data.empresa}
                  onChangeText={(value) => dataInto("empresa", value)}
                />

              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Descripcion</Text>
                <TextInput style={styles.input}
                  value={data.descEmpresa}
                  onChangeText={(value) => dataInto("descEmpresa", value)}
                />
              </View>
            </View>

            {/* Modal Footer ---------------------------------------------------- */}
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
                    color: "#F4EEE0",
                    fontWeight: "bold",
                  }}
                  onPress={() => {
                    hadleValidation();
                    setModalVisible(false);
                  }}
                >
                  Añadir
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: transparent,
  },
  modalView: {
    backgroundColor: '#fefefe',
    padding: 15,
    width: '90%',
    borderRadius: 10,
    minHeight: 700,
    marginBottom: 15,
    alignSelf: 'center'
  },
  tituloModal: {
    fontSize: 26,
    marginBottom: '5%',
    color: '#378CE7',
    marginLeft: 8
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputLabel: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    width: 300,
    height: 28,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  cerrar: {
    borderColor: 'blue',
    backgroundColor: '#D21312',
    fontSize: 10,
    borderRadius: 5,
    padding: 2,
    paddingHorizontal: 9,
    paddingVertical: 5
  },
  eliminar: {
    // borderColor: 'red',
    backgroundColor: '#2F58CD',
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
  },
});

export default AddProvider;
