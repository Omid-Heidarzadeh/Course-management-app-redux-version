import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function saveCourse(course) {
  return function (dispatch) {
    dispatch(beginApiCall());

    return courseApi
      .saveCourse(course)
      .then((savedCourse) => {
        course.id
          ? dispatch(updateCourseSuccess(course))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch((err) => {
        dispatch(apiCallError());
        throw err;
      });
  };
}
        throw err;
      });
  };
}

export function loadCourses() {
  return function (dispatch) {
    dispatch(beginApiCall());

    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((err) => {
        dispatch(apiCallError());
        throw err;
      });
  };
}
