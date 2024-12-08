import { StyleSheet, Text, View, TouchableOpacity, Animated, Alert } from 'react-native'
import React, { useRef } from 'react'
import { colors } from '../constants/colors'
import { deleteComment } from '../services/api'
import { Swipeable } from 'react-native-gesture-handler'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const Comment = ({ id, username, comment, postId, onDelete }) => {
  const swipeableRef = useRef(null)
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: () => deleteComment(id),
    onSuccess: () => {
      // Invalidate comments query
      queryClient.invalidateQueries(['comments', postId])
      if (onDelete) onDelete(id)

      // Update post data to decrement comment count
      queryClient.setQueryData(['posts'], (oldPosts) => {
        if (!oldPosts) return oldPosts
        return oldPosts.map(post => {
          if (post.id === postId) {
            const comments = post.comments || []
            return {
              ...post,
              comments: comments.filter(c => c.id !== id)
            }
          }
          return post
        })
      })
    },
    onError: (error) => {
      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Failed to delete comment. Please try again.'
      )
      console.error('Error deleting comment:', error)
    }
  })

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
    })

    return (
      <View style={styles.deleteContainer}>
        <Animated.View
          style={[
            styles.deleteButton,
            {
              transform: [{ translateX: trans }],
            },
          ]}>
          <TouchableOpacity
            onPress={() => {
              swipeableRef.current?.close()
              Alert.alert(
                'Delete Comment',
                'Are you sure you want to delete this comment?',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => deleteMutation.mutate()
                  },
                ]
              )
            }}
            style={styles.deleteButtonInner}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      rightThreshold={40}
    >
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.author}>u/{username}</Text>
          </View>
          <Text style={styles.content}>{comment}</Text>
        </View>
      </View>
    </Swipeable>
  )
}

export default Comment

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.black + '20',
    padding: 35,
    alignItems: 'flex-start',
  },
  contentContainer: {
    flex: 1,
    gap: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  author: {
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.black,
  },
  content: {
    fontSize: 14,
    color: colors.black,
  },
  deleteContainer: {
    width: 100,
    height: '100%',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: colors.primary + '20',
  },
  deleteButtonInner: {
    flex: 1,
    backgroundColor: '#ff4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: colors.white,
    fontWeight: 'bold',
    padding: 20,
  }
})