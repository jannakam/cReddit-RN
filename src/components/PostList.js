import { StyleSheet, FlatList, View, ActivityIndicator, Text } from 'react-native'
import React from 'react'
import Post from './Post'
import { getPosts } from '../services/api'
import { colors } from '../constants/colors'
import { useQuery } from '@tanstack/react-query'

const PostList = () => {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching
  } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  })

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  if (isError) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Failed to load posts</Text>
        <Text style={styles.errorDetail}>
          {error?.message || 'Unknown error occurred'}
        </Text>
      </View>
    )
  }

  if (!posts?.length) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>No posts found</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <Post postId={item.id} />}
      keyExtractor={item => item.id}
      style={styles.container}
      onRefresh={refetch}
      refreshing={isRefetching}
    />
  )
}

export default PostList

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: colors.black,
    fontSize: 16,
    marginBottom: 8,
  },
  errorDetail: {
    color: colors.black + '80',
    fontSize: 14,
    textAlign: 'center',
  }
})