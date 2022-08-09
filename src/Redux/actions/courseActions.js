import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function deleteCourseOptimistic(courseId) {
  return { type: types.DELETE_COURSE_OPTIMISTIC, courseId };
}

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function loadCoursesOptimistic(courses) {
  return { type: types.LOAD_COURSES_OPTIMISTIC, courses };
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

export function deleteCourse(courseId) {
  return function (dispatch, getState) {
    const courses = getState().courses;

    dispatch(deleteCourseOptimistic(courseId));

    return courseApi.deleteCourse(courseId).catch((err) => {
      dispatch(loadCoursesOptimistic(courses));
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
