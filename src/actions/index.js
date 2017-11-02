import axios from 'axios';

// from env.json loaded by webpack
const BLOG_API_KEY = ENV['API_KEY'];;
const BASE_URL = 'http://reduxblog.herokuapp.com/api/posts';
const CONFIG = { params: { key: BLOG_API_KEY } };

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_SINGLE_POST = 'FETCH_SINGLE_POST';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';

export const fetchPosts = () => {
  const request = axios.get(BASE_URL, CONFIG);
  return {
    type: FETCH_POSTS,
    payload: request
  };
};

export const fetchPostById = (postId) => {
  const request = axios.get(`${BASE_URL}/${postId}`, CONFIG);
  return {
    type: FETCH_SINGLE_POST,
    payload: request
  };
};

export const createPost = (postData, callback) => {
  const request = axios.post(BASE_URL, postData, CONFIG)
    .then(() => callback());
  return {
    type: CREATE_POST,
    payload: request
  };
};

export const deletePost = (postId, callback) => {
  const request = axios.delete(`${BASE_URL}/${postId}`, CONFIG)
    .then(() => callback());
  return {
    type: DELETE_POST,
    payload: postId
  };
};
