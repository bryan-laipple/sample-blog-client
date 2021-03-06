import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createPost } from '../actions';

import PostForm from './post_form'

class PostsNew extends Component {
  render() {
    return (
      <PostForm
        onSubmit={this.onSubmit.bind(this)}
        cancelTo="/"
      />
    );
  }

  onSubmit(values) {
    const { createPost, history } = this.props;
    createPost(values, () => history.push('/'));
  }
}

export default connect(null, {createPost})(PostsNew)
