import * as types from '../actions/actionTypes';
import initalState from './initialState';

export default function courseReducer(state = initalState.courses, action) {
  switch (action.type) {
    case types.CREATE_COURSE_SUCCESS: {
      return [...state, { ...action.course }];
    }

    case types.UPDATE_COURSE_SUCCESS: {
      return state.map((course) =>
        course.id === action.course.id ? action.course : course
      );
    }

    case types.DELETE_COURSE_OPTIMISTIC: {
      return state.filter((course) => course.id !== action.courseId);
    }

    case types.LOAD_COURSES_SUCCESS: {
      return action.courses;
    }

    case types.LOAD_COURSES_OPTIMISTIC: {
      return action.courses;
    }

    default:
      return state;
  }
}
