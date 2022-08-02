import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadCourses, saveCourse } from '../../Redux/actions/courseActions';
import { loadAuthors } from '../../Redux/actions/authorActions';
import CourseForm from './CourseForm.jsx';
import { newCourse } from '../../../tools/mockData';

function CourseManagementPage({
  courses,
  authors,
  loadCourses,
  saveCourse,
  loadAuthors,
  match,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const slug = match.params.slug;
  // If courses are loaded but there is no matching course with current slug, go to Add Course page and clear slug
  if (slug && courses.length > 0 && props.course === newCourse)
    history.push('/course');

  useEffect(() => {
    if (slug) {
      if (!courses.length) {
        loadCourses().catch((err) => {
          alert('Failed to load courses', err);
        });
      } else setCourse({ ...props.course });
    }

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
    <main>
      <CourseForm
        course={course}
        authors={authors}
        errors={errors}
        onChange={useCallback(handleChange)}
        onSubmit={useCallback(handleSubmit)}
      />
    </main>
  );
}

CourseManagementPage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
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
