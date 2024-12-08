import instance from '.';

export const getPosts = async () => {
  const response = await instance.get('/posts');
  return response.data;
};

export const getFilteredPosts = async (title) => {
  const response = await instance.get(`/posts?title=${title}`);
  return response.data;
};

export const getPostById = async (id) => {
  const response = await instance.get(`/posts/${id}`);
  return response.data;
};

export const createPost = async (postData) => {
  const response = await instance.post('/posts', postData);
  return response.data;
};

export const deletePost = async (id) => {
  const response = await instance.delete(`/posts/${id}`);
  return response.data;
};
