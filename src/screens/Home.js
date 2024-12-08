import { StyleSheet, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import PostList from '../components/PostList'
import { colors } from '../constants/colors'

const Home = () => {
  return (
    <View style={styles.container}>
        <Header />
      <PostList />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  }
})