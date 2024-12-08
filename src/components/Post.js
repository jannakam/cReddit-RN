import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../constants/colors'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { getPostById } from '../api/posts'

const Post = ({ postId }) => {
  const { data: post } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId),
  })
  const [votes, setVotes] = useState(Math.floor(Math.random() * 1000))
  const [userVote, setUserVote] = useState(0)
  const navigation = useNavigation()

  const handleVote = (dir) => {
    if (userVote === dir) {
      setVotes(prev => prev - dir)
      setUserVote(0)
    } else {
      setVotes(prev => prev + dir - userVote)
      setUserVote(dir)
    }
  }

  const handlePostPress = () => {
    navigation.navigate('PostDetail', { post: post, votes })
  }

  return (
    <Pressable style={styles.container} onPress={handlePostPress}>
      <View style={styles.voteContainer}>
        <TouchableOpacity onPress={() => handleVote(1)}>
          <Text style={[styles.voteButton, userVote === 1 && styles.voteButtonActive]}>▲</Text>
        </TouchableOpacity>
        <Text style={styles.voteCount}>{votes}</Text>
        <TouchableOpacity onPress={() => handleVote(-1)}>
          <Text style={[styles.voteButton, userVote === -1 && styles.voteButtonActive]}>▼</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{post?.title}</Text>
        {post?.description ? <Text style={styles.content}>{post?.description}</Text> : null}
        <Text style={styles.commentsCount}>{post?.comments?.length || 0} comments</Text>
      </View>
    </Pressable>
  )
}

export default Post

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.black + '20',
    gap: 10,
    paddingVertical: 35,
    alignItems: 'center',
  },
  voteContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
    gap: 5,
  },
  voteButton: {
    fontSize: 20,
    color: colors.black,
    marginVertical: 5,
  },
  voteButtonActive: {
    color: colors.primary,
  },
  voteCount: {
    fontWeight: 'bold',
    color: colors.primary,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  content: {
    fontSize: 14,
    color: colors.black,
  },
  commentsCount: {
    fontSize: 12,
    color: colors.black + '80',
    marginTop: 5,
  },
})