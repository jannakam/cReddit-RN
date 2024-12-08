import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { colors } from '../constants/colors'
import { SafeAreaView } from 'react-native-safe-area-context'

const Header = () => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.iconContainer}>
        <Icon name='menu' size={30} color={colors.black} />
        <Image source={require('../../assets/reddit-logo.png')} style={styles.logo} />
        <Icon name='search' size={30} color={colors.black} />
        </View>
    </SafeAreaView>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
    },
    logo: {
        width: 60,
        height: 60,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
        width: '100%',
               
    }
})