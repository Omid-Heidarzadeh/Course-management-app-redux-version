import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as courseActions from '../../Redux/actions/courseActions';
import * as authorActions from '../../Redux/actions/authorActions';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList.jsx';

function CoursesPage(props) {
  const { actions, authors, courses } = props;

  useEffect(() => {
    if (!courses.length)
      actions.loadCourses().catch((err) => {
        console.error(err);
        alert('Error loading courses, refresh the page to try again.');
      });
    if (!authors.length)
      actions.loadAuthors().catch((err) => {
        console.error(err);
        alert('Error loading authors, refresh the page to try again.');
      });
  }, []);

  return (
    <main>
      <h1>Courses</h1>
      <CourseList courses={courses} />
    </main>
  );
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  courses:
    state.authors.length === 0
      ? []
      : state.courses.map((course) => ({
          ...course,
          authorName: state.authors.find(
            (author) => author.id === course.authorId
          ).name,
        })),
  authors: state.authors,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
    loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
