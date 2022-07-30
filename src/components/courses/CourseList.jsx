import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CourseList(props) {
  const { courses } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course, index) => (
          <tr key={index}>
            <td>
              <Link to={'/course/' + course.slug}>{course.title}</Link>
            </td>
            <td>{course.authorName}</td>
            <td>{course.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
};

export default CourseList;
