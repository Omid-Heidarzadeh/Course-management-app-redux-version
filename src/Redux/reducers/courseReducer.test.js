import courseReducer from './courseReducer.js';
import * as courseActions from '../actions/courseActions.js';

it('should add new course to the store', () => {
  const initialState = [{ title: 'A' }, { title: 'B' }];

  const course = { title: 'C' };

  const newState = courseReducer(
    initialState,
    courseActions.createCourseSuccess(course)
  );

  expect(newState.length).toBe(3);
  expect(newState[0].title).toBe('A');
  expect(newState[1].title).toBe('B');
  expect(newState[2].title).toBe('C');
});

it('should update current course in the store', () => {
  const initialState = [
    { id: 1, title: 'A' },
    { id: 2, title: 'B' },
    { id: 3, title: 'C' },
  ];

  const course = { id: 3, title: 'New Course' };

  const newState = courseReducer(
    initialState,
    courseActions.updateCourseSuccess(course)
  );

  const updatedCourse = newState.find((course) => course.id === 3);
  const untouchedCourse = newState.find((course) => course.id === 1);

  expect(newState.length).toBe(3);
  expect(updatedCourse.title).toBe('New Course');
  expect(untouchedCourse.title).toBe('A');
});

it('should delete current course in the store', () => {
  const initialState = [
    { id: 1, title: 'A' },
    { id: 2, title: 'B' },
    { id: 3, title: 'C' },
  ];

  const courseId = 3;

  const newState = courseReducer(
    initialState,
    courseActions.deleteCourseOptimistic(courseId)
  );

  const deletedCourse = newState.find((course) => course.id === courseId);

  expect(newState.length).toBe(2);
  expect(deletedCourse).toBe(undefined);
});

it('should load courses into the store', () => {
  const initialState = [];

  const courses = [
    { id: 1, title: 'A' },
    { id: 2, title: 'B' },
    { id: 3, title: 'C' },
  ];

  const newState1 = courseReducer(
    initialState,
    courseActions.loadCoursesOptimistic(courses)
  );

  expect(newState1.length).toBe(3);
  expect(newState1).toEqual(courses);

  const newState2 = courseReducer(
    initialState,
    courseActions.loadCoursesSuccess(courses)
  );

  expect(newState2.length).toBe(3);
  expect(newState2).toEqual(courses);
});
