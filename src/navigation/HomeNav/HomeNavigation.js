import { StyleSheet, Platform } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../../screens/Home'
import PostDetail from '../../screens/PostDetail'
import { colors } from '../../constants/colors'

const Stack = createNativeStackNavigator()

const HomeNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.white,
        },
        headerTintColor: colors.black,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: colors.white,
        },
        headerShadowVisible: false,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen 
        name='Home' 
        component={Home}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name='PostDetail' 
        component={PostDetail}
        options={{
          title: 'Post',
          headerTitle: 'Comments',
        }}
      />
    </Stack.Navigator>
  )
}

export default HomeNavigation 