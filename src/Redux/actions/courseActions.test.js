import { courses } from '../../../tools/mockData';
import * as types from './actionTypes.js';
import * as courseActions from './courseActions.js';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('test async thunks', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should create BEGIN_API_CALL and LOAD_COURSES_SUCCESS actions', () => {
    fetchMock.mock('*', {
      body: courses,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.LOAD_COURSES_SUCCESS, courses },
    ];

    const store = mockStore({ courses: [] });
    return store.dispatch(courseActions.loadCourses()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create DELETE_COURSE_OPTIMISTIC action', () => {
    const course = courses[0];
    fetchMock.mock('*', {
      body: course,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: types.DELETE_COURSE_OPTIMISTIC, courseId: course.id },
    ];

    const store = mockStore({ courses });
    return store.dispatch(courseActions.deleteCourse(course.id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create BEGIN_API_CALL and CREATE_COURSE_SUCCESS action', () => {
    const course = {
      title: 'new course',
    };

    fetchMock.mock('*', {
      body: course,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.CREATE_COURSE_SUCCESS, course },
    ];

    const store = mockStore({ courses });
    return store.dispatch(courseActions.saveCourse(course)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create BEGIN_API_CALL and UPDATE_COURSE_SUCCESS action', () => {
    const course = {
      id: '1',
      title: 'new course',
    };

    fetchMock.mock('*', {
      body: course,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.UPDATE_COURSE_SUCCESS, course },
    ];

    const store = mockStore({ courses });
    return store.dispatch(courseActions.saveCourse(course)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('createCourseSuccess', () => {
  it('should create CREATE_COURSE_SUCCESS action', () => {
    const course = courses[0];
    const expectedAction = {
      type: types.CREATE_COURSE_SUCCESS,
      course,
    };

    const action = courseActions.createCourseSuccess(course);

    expect(action).toEqual(expectedAction);
  });
});
