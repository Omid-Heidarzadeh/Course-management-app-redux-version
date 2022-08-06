import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadCourses, saveCourse } from '../../Redux/actions/courseActions.js';
import { loadAuthors } from '../../Redux/actions/authorActions';
import CourseForm from './CourseForm.jsx';
import { newCourse } from '../../../tools/mockData';
import Spinner from '../common/Spinner.jsx';
import { toast } from 'react-toastify';

const STATUS = {
  IDLE: 'IDLE',
  SUBMITTING: 'SUBMITTING',
  SUBMITTED: 'SUBMITTED',
};

const patterns = {
  title: /^[a-zA-Z0-9 ()#+-]{3,30}$/,
  authorId: /^([1-9]\d*)$/,
  category: /^[a-zA-Z0-9 ()#+-]{1,30}$/,
};

function CourseManagementPage({
  courses,
  authors,
  loading,
  loadCourses,
  saveCourse,
  loadAuthors,
  match,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState(getErrors(course));
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState(STATUS.IDLE);

  const messages = getErrorMessages(errors);
  const slug = match.params.slug;
  // If courses are loaded but there is no matching course with current slug,
  // go to Add Course page and clear slug
  if (slug && courses.length > 0 && props.course === newCourse)
    history.push('/course');

  useEffect(() => {
    if (!courses.length) {
      loadCourses().catch((err) => {
        alert('Failed to load courses', err);
      });
    } else setCourse({ ...props.course });

    if (!authors.length) {
      loadAuthors().catch((err) => {
        alert('Failed to load authors', err);
      });
    }
  }, [props.course]);

  function handleChange(event) {
    const { name, value } = event.target;

    const newCourse = {
      ...course,
      [name]: Number(value) || value,
    };
    setCourse(newCourse);

    const newErrors = getErrors(newCourse);
    setErrors((errors) => {
      const onSave = errors.onSave;
      const result = { ...newErrors };
      if (Object.keys(newErrors).length && onSave) result.onSave = onSave;
      return result;
    });
  }

  function handleBlur(event) {
    const { name } = event.target;
    setTouched((touched) => ({ ...touched, [name]: true }));
    setErrors((errors) => {
      const onSave = errors.onSave;
      const result = { ...getErrors(course) };
      if (onSave) result.onSave = onSave;
      return result;
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (Object.keys(errors).length > 0) return setStatus(STATUS.SUBMITTED);

    setStatus(STATUS.SUBMITTING);

    saveCourse(course)
      .then(() => {
        history.push('/courses');
        toast.success('Course successfully saved');
      })
      .catch((err) => {
        console.error('Failed to save course: "%s"', err.message);
        toast.error('Failed saving course: ' + err.message, {
          autoClose: false,
        });
        setStatus(STATUS.SUBMITTED);
        setErrors((errors) => ({ ...errors, onSave: err.message }));
      });
  }

  // Utility functions

  function getErrors(course) {
    const result = {};
    for (let [key, pattern] of Object.entries(patterns)) {
      if (!pattern.test(course[key])) result[key] = 'invalid';
      if (!course[key]) result[key] = 'empty';
    }
    return result;
  }

  function getErrorMessages({ title, authorId, category, onSave }) {
    const result = {};

    if (title === 'invalid')
      result.title =
        'Allowed characters are alphabetics, numbers, space and (#+-)';
    if (title === 'empty') result.title = 'Title can not be empty.';

    if (authorId === 'invalid') result.authorId = 'invalid author';
    if (authorId === 'empty') result.authorId = 'Please select an author.';

    if (category === 'invalid')
      result.category =
        'Allowed characters are alphabetics, numbers, space and (#+-)';
    if (category === 'empty') result.category = 'Category can not be empty.';

    if (onSave) result.onSave = onSave;

    return result;
  }

  function getTouchedInput(errorMessages) {
    if (status === STATUS.SUBMITTED) return errorMessages;

    return Object.entries(errorMessages).reduce((result, [input, error]) => {
      if (touched[input] && error) result[input] = error;
      return result;
    }, {});
  }

  return (
    <main className="flex-grow-1">
      {loading && status !== STATUS.SUBMITTING ? (
        <Spinner />
      ) : (
        <CourseForm
          course={course}
          authors={authors}
          errors={getTouchedInput(messages)}
          touched={touched}
          saving={status === STATUS.SUBMITTING}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onBlur={handleBlur}
        />
      )}
    </main>
  );
}

CourseManagementPage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadCourses: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug);
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;

  return {
    course: (slug && getCourseBySlug(state.courses, slug)) || newCourse,
    courses: state.courses,
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  loadCourses,
  saveCourse,
  loadAuthors,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseManagementPage);
