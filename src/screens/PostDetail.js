import { StyleSheet, View } from "react-native";
import React from "react";
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentInput from "../components/CommentInput";
import { colors } from "../constants/colors";

const PostDetail = ({ route }) => {
  const { post } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.postContainer}>
          <Post postId={post.id} />
        </View>
        <CommentList postId={post.id} />
      </View>
      <CommentInput postId={post.id} />
    </View>
  );
};

export default PostDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
  },
  postContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.black + "20",
  },
});
