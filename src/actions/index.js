import axios from 'axios';

// from env.json loaded by webpack
const API_KEY = ENV['BLOG_API_KEY'];
const BASE_URL = 'http://reduxblog.herokuapp.com/api/posts';
const CONFIG = { params: { key: API_KEY } };

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_SINGLE_POST = 'FETCH_SINGLE_POST';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const RESET_POSTS = 'RESET_POSTS';

// Promise that resolves with empty object that is used to help against throttling
const waitFor = (timeout) => new Promise((resolve) => setTimeout(resolve({}), timeout));

const canned = [
  {
    title: 'First blog',
    categories: 'one 1st',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam justo mi, malesuada dictum porta nec, \
feugiat at massa. Nunc imperdiet sapien nec elementum auctor. Sed laoreet suscipit tellus, ut placerat arcu \
consequat sed. Curabitur eget feugiat lectus, eget porttitor urna. Suspendisse dictum eleifend vestibulum. Vivamus \
tincidunt eu tellus eget maximus. Sed id turpis at dolor interdum dictum. Suspendisse eget ultricies metus. Cras et \
mauris id nunc consectetur tincidunt at at erat. Sed imperdiet pellentesque sapien nec sagittis. Mauris id felis ut \
diam ultrices maximus. Vestibulum sed lectus mollis, efficitur tortor luctus, volutpat lectus. In maximus purus sem, \
id scelerisque nisl tincidunt nec. Donec sit amet suscipit elit. Nam finibus, augue at sagittis tristique, purus \
ante rutrum magna, non fringilla tortor erat vitae felis. Donec condimentum vehicula imperdiet.`
  },
  {
    title: '2nd Blog',
    categories: 'two 2nd',
    content: `Donec nisl ligula, posuere quis laoreet facilisis, volutpat hendrerit lacus. Ut consectetur neque \
pharetra diam auctor commodo. Cras justo diam, dictum vel vestibulum quis, auctor ac nibh. Aliquam lacus lacus, \
tincidunt nec libero eu, dictum semper velit. Suspendisse tincidunt mi iaculis augue finibus fringilla. Quisque \
vitae dignissim est. Vivamus sed augue suscipit, auctor nunc ut, consequat quam. Mauris facilisis elementum dui non \
finibus. Sed pulvinar gravida consequat. Aliquam diam mauris, vulputate ut bibendum sit amet, fermentum interdum \
nunc. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum accumsan \
feugiat arcu a iaculis. Phasellus dui erat, ullamcorper ut justo eu, dapibus malesuada dui. Cras laoreet turpis in \
placerat mattis. Praesent sed sodales est.`
  },
  {
    title: 'Third',
    categories: 'three 3rd',
    content: `Nunc nec eleifend ligula. Duis nulla libero, lobortis sit amet tortor ac, hendrerit ultrices turpis. \
Suspendisse semper blandit rhoncus. Nulla iaculis nisl eget eleifend lobortis. Pellentesque eget neque sit amet \
neque egestas auctor sit amet eu sem. Pellentesque condimentum sollicitudin tellus non imperdiet. Nunc scelerisque \
odio eu pulvinar tempor. Morbi non nulla in neque fringilla semper. In a bibendum sem. Vivamus vel augue venenatis \
quam finibus luctus quis non sem. Nulla vehicula dictum turpis sed mollis.`
  }
];

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
    .then(({data}) => action.payload = action.payload || data) // don't override if set
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

export const resetPosts = (callback) => {
  // clear all blogs and re-populate with a few with canned data
  const requestChain = Promise.resolve()
    .then(() => axios.get(BASE_URL, CONFIG))
    .then(({data}) => {
      // sending requests one at a time to avoid throttling
      let deletes = Promise.resolve();
      data.forEach(p => {
        deletes = deletes.then(() => axios.delete(`${BASE_URL}/${p.id}`, CONFIG).then(() => waitFor(500)));
      });
      return deletes;
    })
    .then(() => {
      let uploads = Promise.resolve();
      canned.forEach(p => {
        uploads = uploads.then(() => axios.post(BASE_URL, p, CONFIG).then(() => waitFor(500)));
      });
      return uploads;
    });
  const action = actionOfType(RESET_POSTS).withPayload({});
  return (dispatch) => sendRequest(dispatch, requestChain, action, callback);
};
