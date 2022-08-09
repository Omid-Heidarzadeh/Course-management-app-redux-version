import React from 'react';
import renderer from 'react-test-renderer';
import CourseForm from './CourseForm.jsx';
import { courses, authors } from '../../../tools/mockData.js';

it('should render "saving..." label for the save button when saving is true', () => {
  const tree = renderer.create(
    <CourseForm
      course={courses[0]}
      authors={authors}
      onChange={jest.fn()}
      onSubmit={jest.fn()}
      onBlur={jest.fn()}
      saving
    />
  );

  expect(tree).toMatchSnapshot();
});

it('should render "save" label for the save button when saving is false', () => {
  const tree = renderer.create(
    <CourseForm
      course={courses[0]}
      authors={authors}
      onChange={jest.fn()}
      onSubmit={jest.fn()}
      onBlur={jest.fn()}
    />
  );

  expect(tree).toMatchSnapshot();
});
