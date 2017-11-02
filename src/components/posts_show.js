import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPostById, deletePost } from '../actions';

class PostsShow extends Component {
  componentDidMount() {
    const { fetchPostById, id } = this.props;
    fetchPostById(id);
  }

  render() {
    const { post } = this.props;
    if (!post) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Link to="/">Back to Posts</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }

  onDeleteClick() {
    const { deletePost, history, id } = this.props;
    deletePost(id, () => {
      history.push('/');
    });
  }
}

const mapStateToProps = ({posts}, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    id: id,
    post: posts[id]
  };
};

export default connect(mapStateToProps, {fetchPostById, deletePost})(PostsShow);
