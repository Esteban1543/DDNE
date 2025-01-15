import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import DeleteClient from './DeleteClient'
import EditClient from './EditCLient'
import Editprovider from './EditProvider'
import DeleteProvider from './Deleteprovider'

const CardPerson = ({ icon, nombre, apellido, telefono, correo, empresa, id, reload, direccion, nit, desc_empresa, nombreswitch, permisos, alias }) => {

  const [modalrender, setModal] = useState(null);

  useEffect(() => {
    switch (nombreswitch) {
      case "clientes":
        setModal(
          <View style={styles.opciones}>
            <EditClient
              id={id}
              nombres={nombre}
              apellidos={apellido}
              telefono={telefono}
              email={correo}
              empresa={empresa}
              reload={reload}
              direccion={direccion}
              nit={nit}
              desc_empresa={desc_empresa}
            />
            <DeleteClient nombre={nombre} id={id} reload={reload} />
          </View>
        );
        break;

      case "proveedores":
        setModal(
          <View style={styles.opciones}>
            <Editprovider
              id={id}
              nombres={nombre}
              apellidos={apellido}
              telefono={telefono}
              email={correo}
              empresa={empresa}
              reload={reload}
              direccion={direccion}
              nit={nit}
              desc_empresa={desc_empresa}
            />
            <DeleteProvider nombre={nombre} id={id} reload={reload} />
          </View>
        );
        break;

      case "usuarios":
        setModal(
          <View style={styles.opciones}></View>
        );
        break;


      default:
        setModal(null);
        break;
    }
  }, [nombreswitch])

  return (
    <View style={styles.card}>
      <Image source={icon} style={styles.icon} />
      <View style={styles.info}>
        <Text style={styles.llaves}>Nombre:    <Text style={styles.llavesInfo}>{nombre}</Text></Text>
        <Text style={styles.llaves}>Apellido:   <Text style={styles.llavesInfo}>{apellido}</Text></Text>
        <Text style={styles.llaves}>Telefono:  <Text style={styles.llavesInfo}>{telefono}</Text></Text>
        <Text style={styles.llaves}>Email:         <Text style={styles.llavesInfo}>{correo}</Text></Text>
        {nombreswitch !== 'usuarios'
          ? <Text style={styles.llaves}>Empresa:   <Text style={styles.llavesInfo}>{empresa}</Text></Text>
          : (<View style={{ borderTopWidth: 1, marginTop: 7, paddingTop: 5, borderColor: '#ccc' }}>
            <Text style={styles.llaves}>Usuario:     <Text style={styles.llavesInfo}>{alias}</Text></Text>
            <Text style={styles.llaves}>Permisos:
              <Text style={styles.llavesInfo}>
                {permisos.split(',').map((p, index) => (
                  <Text key={index}>  +{p} </Text>
                ))}
              </Text>
            </Text>
          </View>)
        }
      </View>

      {modalrender}

    </View>
  )
}

export default CardPerson

const styles = StyleSheet.create({
  card: {
    borderColor: '#0174BE',
    borderWidth: 2,
    width: '90%',
    // height: 130,
    borderRadius: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '3%',
    position: 'relative'
  },
  icon: {
    position: 'absolute',
    width: 90,
    height: 90,
    opacity: 0.1,
    marginTop: 10,
  },
  info: {
    marginLeft: 12,
    marginRight: 25

  },
  llaves: {
    fontWeight: 'bold',
    fontSize: 16
  },
  llavesInfo: {
    fontWeight: '400',
    lineHeight: 24
  },
  opciones: {
    // borderBlockColor: 'black',
    // borderWidth: 4,
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 25,
    position: 'absolute',
    right: 15,
    // top: '5%'
  }
})