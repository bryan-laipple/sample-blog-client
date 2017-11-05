import axios from 'axios';

// from env.json loaded by webpack
const API_KEY = ENV['BLOG_API_KEY'];
const BASE_URL = 'http://reduxblog.herokuapp.com/api/posts';
const CONFIG = { params: { key: API_KEY } };

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_SINGLE_POST = 'FETCH_SINGLE_POST';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';

const actionOfType = (type) => {
  return {
    type: type,
    payload: null,
    withPayload: function(payload) {
      this.payload = payload;
      return this;
    }
  }
};

const sendRequest = (dispatch, request, action, callback = () => {}) => {
  request
    .then(({data}) => action.payload = data)
    .then(() => dispatch(action))
    .then(() => callback())
    .catch(err => console.log(err))
};

export const fetchPosts = () => {
  const request = axios.get(BASE_URL, CONFIG);
  const action = actionOfType(FETCH_POSTS);
  return (dispatch) => sendRequest(dispatch, request, action)
};

export const fetchPostById = (postId) => {
  const request = axios.get(`${BASE_URL}/${postId}`, CONFIG);
  const action = actionOfType(FETCH_SINGLE_POST);
  return (dispatch) => sendRequest(dispatch, request, action)
};

export const createPost = (postData, callback) => {
  const request = axios.post(BASE_URL, postData, CONFIG);
  const action = actionOfType(CREATE_POST);
  return (dispatch) => sendRequest(dispatch, request, action, callback)
};

export const deletePost = (postId, callback) => {
  const request = axios.delete(`${BASE_URL}/${postId}`, CONFIG);
  const action = actionOfType(DELETE_POST).withPayload(postId);
  return (dispatch) => sendRequest(dispatch, request, action, callback)
};
