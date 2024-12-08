import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import PostDetail from '../screens/PostDetail'
import { colors } from '../constants/colors'

const Stack = createNativeStackNavigator()

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: colors.black,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="PostDetail" 
          component={PostDetail}
          options={{
            title: 'Post'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator 