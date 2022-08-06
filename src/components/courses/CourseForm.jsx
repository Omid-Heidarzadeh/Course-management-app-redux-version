import React, { useMemo } from 'react';
import TextInput from '../common/Inputs/TextInput.jsx';
import SelectInput from './../common/Inputs/SelectInput.jsx';
import PropTypes from 'prop-types';

function CourseForm({
  course,
  authors,
  onChange,
  onSubmit,
  onBlur,
  saving = false,
  errors = {},
}) {
  return (
    <>
      {errors.onSave ? (
        <div role="alert" className="text-danger">
          <p>Fix following error and try again:</p>
          <p>{errors.onSave}</p>
        </div>
      ) : null}

      <h1>{course.id ? 'Edit' : 'Add'} Course</h1>

      <form onSubmit={onSubmit}>
        <TextInput
          title="Course Title"
          id="title"
          name="title"
          value={course.title}
          onChange={onChange}
          onBlur={onBlur}
          error={errors.title}
        />

        <SelectInput
          title="Author"
          id="author"
          name="authorId"
          value={String(course.authorId)}
          options={useMemo(
            () =>
              authors.map((author) => ({
                value: String(author.id),
                name: author.name,
              })),
            [authors]
          )}
          defaultOption={'select author'}
          onChange={onChange}
          onBlur={onBlur}
          error={errors.authorId}
        />

        <TextInput
          title="Category"
          id="category"
          name="category"
          value={course.category}
          onChange={onChange}
          onBlur={onBlur}
          error={errors.category}
        />

        <button
          className="btn btn-primary btn-m"
          disabled={saving}
          type="submit"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </form>
    </>
  );
}

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  saving: PropTypes.bool,
  errors: PropTypes.object,
};

export default CourseForm;
