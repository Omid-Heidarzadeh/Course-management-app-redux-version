import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import * as courseActions from './actions/courseActions.js';
import * as authorActions from './actions/authorActions.js';
import initialState from './reducers/initialState';
import thunk from 'redux-thunk';
import mockFetch from 'fetch-mock';

let store;
beforeEach(() => {
  mockFetch.restore();
  store = createStore(rootReducer, initialState, applyMiddleware(thunk));
});

it('should store loaded courses in store', async () => {
  // Arrange
  const courses = [
    { title: 'Course 1' },
    { title: 'Course 2' },
    { title: 'Course 3' },
  ];

  mockFetch.mock('*', {
    body: courses,
    headers: { 'Content-Type': 'application/json' },
  });

  // Act
  await store.dispatch(courseActions.loadCourses());

  // Assert
  expect(store.getState().courses).toEqual(courses);
});

it('should store loaded courses in store', async () => {
  // Arrange
  const authors = [
    { name: 'author1' },
    { name: 'author2' },
    { name: 'author3' },
  ];

  mockFetch.mock('*', {
    body: authors,
    headers: { 'Content-Type': 'application/json' },
  });

  // Act
  await store.dispatch(authorActions.loadAuthors());

  // Assert
  expect(store.getState().authors).toEqual(authors);
});

it('should add new course to the store', async () => {
  // Arrange
  const course = {
    title: 'A',
  };

  mockFetch.mock('*', {
    body: course,
    headers: { 'Content-Type': 'application/json' },
  });

  // Act
  await store.dispatch(courseActions.saveCourse(course));

  // Assert
  expect(store.getState().courses.length).toBe(1);
});

it('should update current course in the store', async () => {
  // Arrange
  const state = {
    courses: [
      { id: 1, title: 'A' },
      { id: 2, title: 'B' },
    ],
  };

  const course = {
    id: 1,
    title: 'New Course',
  };

  mockFetch.mock('*', {
    body: course,
    headers: { 'Content-Type': 'application/json' },
  });

  store = createStore(rootReducer, state, applyMiddleware(thunk));

  // Act
  await store.dispatch(courseActions.saveCourse(course));

  const updatedCourse = store
    .getState()
    .courses.find((course) => course.id === 1);
  const untouchedCourse = store
    .getState()
    .courses.find((course) => course.id === 2);

  // Assert
  expect(store.getState().courses.length).toBe(2);
  expect(updatedCourse.title).toBe('New Course');
  expect(untouchedCourse.title).toBe('B');
});
