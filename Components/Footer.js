import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={{color:'white'}} >Footer</Text>
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
  footer:{
    backgroundColor:'red',
    color:'white',
   zIndex:4
  }
  })