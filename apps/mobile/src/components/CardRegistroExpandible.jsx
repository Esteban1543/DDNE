import { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import { Entypo } from '@expo/vector-icons';

const CardRegistroExpandible = ({ title, id, children }) => {
  const [expandir, setExpandir] = useState(false);

  return (
    <View style={styles.card_registro}>

      <TouchableOpacity
        key={id + 'info_title'}
        onPress={() => setExpandir(!expandir)}
      >
        <Text style={styles.card_title}>         
          {title} 
        </Text>
        
        <Entypo name={!expandir ? "chevron-down" : "chevron-up"} size={16} color="#1B1A55" style={styles.flecha_down}/>

      </TouchableOpacity>

      {
        expandir && (
          <View
            style={styles.card_data}
            key={id + 'info'}
          >
            {children}
          </View>
        )
      }

    </View>
  );
};

export default CardRegistroExpandible;

const styles = StyleSheet.create({
  card_registro: {
    // borderBottomWidth: 1,
    // borderBottomColor: '#000',
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  card_title: {
    // Estilos con border Radius 🔸
    // backgroundColor: 'rgba(219, 208, 208, 0.21)',
    // borderWidth: 1,
    // borderColor: '#ccc',
    // borderRadius: 8,

    color: '#008DDA',
    fontSize: 18,
    fontWeight: '700',
    paddingVertical: 7,
    paddingHorizontal: 15,
    // paddingLeft: 20,
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
    paddingLeft: 25,
    backgroundColor: 'rgba(101, 189, 215, 0.08)'
  },
})