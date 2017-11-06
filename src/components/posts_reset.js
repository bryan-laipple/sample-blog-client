import React, { Component } from 'react';
import { connect } from 'react-redux';

import { resetPosts } from '../actions';

class PostsReset extends Component {
  componentDidMount() {
    const { resetPosts, history } = this.props;
    resetPosts(() => history.push('/'));
  }

  render() {
    return <div>Resetting data...</div>
  }
}

export default connect(null, { resetPosts })(PostsReset);