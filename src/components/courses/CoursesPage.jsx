import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadCourses, deleteCourse } from '../../Redux/actions/courseActions';
import { loadAuthors } from '../../Redux/actions/authorActions';
import CourseList from './CourseList.jsx';
import { Link } from 'react-router-dom';
import Spinner from './../common/Spinner.jsx';
import { toast } from 'react-toastify';

function CoursesPage(props) {
  const { authors, courses, loadCourses, deleteCourse, loadAuthors, loading } =
    props;

  useEffect(() => {
    if (!courses.length)
      loadCourses().catch((err) => {
        console.error(err);
        alert('Error loading courses, refresh the page to try again.');
      });

    if (!authors.length)
      loadAuthors().catch((err) => {
        console.error(err);
        alert('Error loading authors, refresh the page to try again.');
      });
  }, []);

  function handleDelete(courseId) {
    toast.success('Course deleted successfully.');
    deleteCourse(courseId).catch((err) => {
      toast.error('Failed to delete the course: ' + err.message, {
        autoClose: false,
      });
    });
  }

  return loading ? (
    <Spinner />
  ) : (
    <main>
      <h1>Courses</h1>
      <Link to="/course" className="btn btn-primary">
        Add Course
      </Link>
      <CourseList courses={courses} onDelete={handleDelete} />
    </main>
  );
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadCourses: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
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
    loading: state.apiCallsInProgress > 0,
  };
};

const mapDispatchToProps = {
  loadCourses,
  deleteCourse,
  loadAuthors,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
