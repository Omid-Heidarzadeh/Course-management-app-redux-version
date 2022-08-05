import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadCourses, saveCourse } from '../../Redux/actions/courseActions.js';
import { loadAuthors } from '../../Redux/actions/authorActions';
import CourseForm from './CourseForm.jsx';
import { newCourse } from '../../../tools/mockData';
import Spinner from '../common/Spinner.jsx';

const STATUS = {
  IDLE: 'IDLE',
  SUBMITTING: 'SUBMITTING',
  SUBMITTED: 'SUBMITTED',
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
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(STATUS.IDLE);
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
    setCourse((course) => ({
      ...course,
      [name]: name.toLowerCase().endsWith('id') ? parseInt(value, 10) : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    saveCourse(course).then(() => {
      history.push('/courses');
    });
  }

  return (
    <main className="flex-grow-1">
      {loading && status !== STATUS.SUBMITTING ? (
        <Spinner />
      ) : (
        <CourseForm
          course={course}
          authors={authors}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
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
