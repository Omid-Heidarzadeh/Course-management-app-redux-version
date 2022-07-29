import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as courseActions from '../../Redux/actions/courseActions';
import { bindActionCreators } from 'redux';

function CoursesPage(props) {
  const initialCourse = { title: '' };
  const [course, setCourse] = useState(initialCourse);

  function handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    setCourse((course) => {
      return { ...course, [name]: value };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.actions.createCourse(course);
    setCourse(initialCourse);
  }

  return (
    <main>
      <h1>Courses</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {props.courses.map((course, index) => (
            <tr key={index}>
              <td>{course.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            className="form-control"
            type="text"
            value={course.title}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
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
