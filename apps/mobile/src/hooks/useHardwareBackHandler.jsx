import React, { useEffect } from "react";
import { BackHandler } from "react-native";

const useHardwareBackHandler  = ({ Opcion }) => {
    useEffect(() => {
      const backAction = () => {
        // console.log('El usuario ha presionado el botón de retroceso');
        Opcion(null)
        return true;
      }
    
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      )
    
      return () => backHandler.remove();
    })  
}

export default useHardwareBackHandler


