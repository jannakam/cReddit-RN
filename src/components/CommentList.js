import { StyleSheet, FlatList, View, Text, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Comment from './Comment'
import { colors } from '../constants/colors'
import { useQuery } from '@tanstack/react-query'
import { getPostById } from '../api/posts'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const CommentList = ({ postId }) => {
  const [deletedComments, setDeletedComments] = useState(new Set())

  const {
    data: post,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching
  } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getPostById(postId),
    // enabled: !!postId,
    // retry: false, // Don't retry on 404
    // onError: (error) => {
    //   // Log the full error for debugging
    //   console.log('Full error details:', {
    //     status: error?.response?.status,
    //     data: error?.response?.data,
    //     message: error?.message
    //   })
    // }
  })



  const handleCommentDelete = (commentId) => {
    setDeletedComments(prev => new Set([...prev, commentId]))
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  // Show empty state for both 404 errors and when there are no comments
  if (isError || !post?.comments || post?.comments.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Comments</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {isError && error?.response?.status === 404
              ? 'No comments available for this post yet'
              : isError
                ? 'Failed to load comments. Please try again.'
                : 'No comments yet. Be the first to comment!'}
          </Text>
        </View>
      </View>
    )
  }

  const filteredComments = post?.comments.filter(comment => !deletedComments.has(comment.id))

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Comments ({filteredComments.length})</Text>
      </View>
      <FlatList
        data={filteredComments}
        renderItem={({ item }) => (
          <Comment 
            {...item} 
            postId={postId}
            onDelete={handleCommentDelete}
          />
        )}
        keyExtractor={item => item.id}
        style={styles.list}
        onRefresh={refetch}
        refreshing={isRefetching}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No comments yet. Be the first to comment!</Text>
          </View>
        }
      />
    </GestureHandlerRootView>
  )
}

export default CommentList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.black + '20',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  list: {
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
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    color: colors.black + '80',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  }
})