import React, { useEffect } from 'react'
import { Text, View, Image } from 'react-native'

import useHardwareBackHandler from '../hooks/useHardwareBackHandler'
import UnauthorizedImg from '../assets/error_401s.png'


const NotAllowed = ({Opcion}) => {
  
  useHardwareBackHandler({ Opcion })

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#fefefe', height: '100%'}}>
      <Image source={UnauthorizedImg} style={{width: '100%'}}/>
      <Text style={{ fontSize: 20, margin: '5%', textAlign: 'justify', fontWeight: '500'}}>Lo sentimos, no tiene los permisos necesarios para esta sección 😞.</Text>
    </View>
  )
}

export default NotAllowed