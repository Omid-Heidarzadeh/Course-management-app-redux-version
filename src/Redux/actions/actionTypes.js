export const CREATE_COURSE_SUCCESS = 'CREATE_COURSE_SUCCESS';
export const UPDATE_COURSE_SUCCESS = 'UPDATE_COURSE_SUCCESS';
export const LOAD_COURSES_SUCCESS = 'LOAD_COURSES_SUCCESS';
export const LOAD_AUTHORS_SUCCESS = 'LOAD_AUTHORS_SUCCESS';
export const BEGIN_API_CALL = 'BEGIN_API_CALL';
export const API_CALL_ERROR = 'API_CALL_ERROR';

// These actions are intended to be used for optimistic operations.
// Current apiCallReducer implementation uses the '_SUCCESS' suffix as an
// alternative way to indicate successful api call and decerement the
// 'apiCallsInProgress' cournter.
export const DELETE_COURSE_OPTIMISTIC = 'DELETE_COURSE_OPTIMISTIC';
export const LOAD_COURSES_OPTIMISTIC = 'LOAD_COURSES_OPTIMISTIC';
