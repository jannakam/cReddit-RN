import instance from '.';

export const addComment = async (postId, commentData) => {
  const response = await instance.post(`/posts/${postId}/comments`, commentData);
  return response.data;
};

export const deleteComment = async (commentId) => {
  const response = await instance.delete(`/posts/comments/${commentId}`);
  return response.data;
};
