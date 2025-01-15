import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import loadingGif from '../../assets/Loading3.gif'

const Loading = () => {
  return (
    <View style={styles.container_loading}>
      <Image source={loadingGif} style={styles.loading_gif}/>
      <Text>{'\n'} Cargando...</Text>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
  container_loading: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1
  },
  loading_gif: {
    width: 80,
    height: 80
  }
})