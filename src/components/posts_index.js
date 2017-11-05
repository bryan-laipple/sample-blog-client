import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPosts } from '../actions/index';

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row pull-right">
          <Link className="btn btn-primary" to="/posts/new">
          Add a Post
          </Link>
        </div>
        <div className="row">
          <h3>Posts</h3>
        </div>
        <div className="row list-group">
          {this.renderPosts()}
        </div>
      </div>
    )
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <Link className="list-group-item"
            key={post.id}
            to={`/posts/${post.id}`}>
          {post.title}
        </Link>
      );
    });
  }
}

function mapStateToProps({ posts }) {
  return { posts };
}

export default connect(mapStateToProps, {fetchPosts})(PostsIndex);
