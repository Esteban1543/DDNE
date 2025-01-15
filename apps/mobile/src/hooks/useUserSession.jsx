import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useUserSession = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {

    //🔸 Función Anónima y AutoInvocada
    (async () => {
      try {
        const session = await AsyncStorage.getItem('user_session');
        session != null && setUser(JSON.parse(session));
        console.log('datos session >>> ', session)
      } catch (error) {
        console.log(`Error al Obtener Datos de Session ${error}`);
      }
    })()

  }, []);

  return user;
};

export default useUserSession;
