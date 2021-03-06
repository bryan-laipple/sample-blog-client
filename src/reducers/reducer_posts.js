import _ from 'lodash';
import { FETCH_POSTS, FETCH_SINGLE_POST, DELETE_POST, RESET_POSTS } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      // const newState = {};
      // action.payload.forEach(p => {
      //   newState[p.id] = p;
      // });
      // return newState;
      return _.mapKeys(action.payload, 'id');

    case FETCH_SINGLE_POST:
      const post = action.payload;
      // const newState = { ...state }
      // newState[post.id] = post;
      // return newState;
      return { ...state, [post.id]: post };

    case DELETE_POST:
      return _.omit(state, action.payload);

    case RESET_POSTS:
      return {};

    default:
      return state;
  }
}
