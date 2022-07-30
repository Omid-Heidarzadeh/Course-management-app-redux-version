import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as courseActions from '../../Redux/actions/courseActions';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList.jsx';

function CoursesPage(props) {

  return (
    <main>
      <h1>Courses</h1>
      <CourseList courses={courses} />
    </main>
  );
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ courses: state.courses });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(courseActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
