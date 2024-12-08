import { StyleSheet, View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../constants/colors'
import { submitComment } from '../services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const CommentInput = ({ postId }) => {
  const [comment, setComment] = useState('')
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (text) => submitComment(postId, {
      username: 'meshal', // TODO: Replace with actual user management
      comment: text
    }),
    onSuccess: () => {
      // Invalidate and refetch comments
      queryClient.invalidateQueries(['comments', postId])
      setComment('')
      
      // Update post data to increment comment count
      queryClient.setQueryData(['posts'], (oldPosts) => {
        if (!oldPosts) return oldPosts
        return oldPosts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [...(post.comments || []), {}] // Just for count
            }
          }
          return post
        })
      })
    },
    onError: (error) => {
      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Failed to post comment. Please try again.'
      )
      console.error('Error posting comment:', error)
    }
  })

  const handleSubmit = () => {
    if (comment.trim() && !mutation.isLoading) {
      mutation.mutate(comment.trim())
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={styles.keyboardAvoid}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          value={comment}
          onChangeText={setComment}
          multiline
          maxLength={1000}
          editable={!mutation.isLoading}
        />
        <TouchableOpacity 
          style={[
            styles.submitButton,
            (!comment.trim() || mutation.isLoading) && styles.submitButtonDisabled
          ]}
          onPress={handleSubmit}
          disabled={!comment.trim() || mutation.isLoading}
        >
          <Text style={[
            styles.submitButtonText,
            (!comment.trim() || mutation.isLoading) && styles.submitButtonTextDisabled
          ]}>{mutation.isLoading ? 'Posting...' : 'Post'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default CommentInput

const styles = StyleSheet.create({
  keyboardAvoid: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.black + '20',
  },
  container: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'flex-end',
    gap: 10,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    backgroundColor: colors.black + '05',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 14,
  },
  submitButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: colors.primary + '50',
  },
  submitButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  submitButtonTextDisabled: {
    color: colors.white + '80',
  },
}) 