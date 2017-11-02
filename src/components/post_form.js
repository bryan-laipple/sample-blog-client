import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

const TITLE_FIELD = 'title';
const CATEGORIES_FIELD = 'categories';
const CONTENT_FIELD = 'content';

const PostForm = props => {
  const { handleSubmit, cancelTo } = props;
  return (
    <form onSubmit={handleSubmit}>
      {reduxFormField(TITLE_FIELD, "Title of Post")}
      {reduxFormField(CATEGORIES_FIELD, "Categories")}
      {reduxFormField(CONTENT_FIELD, "Post Content")}
      <button className="btn btn-primary" type="submit">Submit</button>
      <Link className="btn btn-danger cancel" to={cancelTo}>
        Cancel
      </Link>
    </form>
  );
};

const reduxFormField = (name, label, component = textField) => {
  return (
    <Field
      name={name}
      label={label}
      component={component}
    />
  );
};

const textField = field => {
  const { touched, error } = field.meta;
  const errorText = touched ? error : '';
  const formGroupClass = `form-group ${errorText ? 'has-danger' : ''}`;
  return (
    <div className={formGroupClass}>
      <label>{field.label}</label>
      <input
        className="form-control"
        type="text"
        {...field.input}
      />
      <div className="text-help">
        {errorText}
      </div>
    </div>
  )
};

const validate = values => {
  const errors = {};

  if (!values[TITLE_FIELD]) {
    errors[TITLE_FIELD] = 'Enter a title';
  }
  if (!values[CATEGORIES_FIELD]) {
    errors[CATEGORIES_FIELD] = 'Enter some categories';
  }
  if (!values[CONTENT_FIELD]) {
    errors[CONTENT_FIELD] = 'Enter some content';
  }

  // if errors is empty, the form is fine to submit
  // if errors has *any* properties, redux form assumes form is invalid
  return errors;
};

export default reduxForm({
  validate,
  form: 'PostForm'
})(PostForm);
