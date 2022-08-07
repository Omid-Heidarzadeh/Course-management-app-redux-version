import React from 'react';
import { cleanup, render } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import CourseForm from './CourseForm.jsx';
import { courses, authors } from '../../../tools/mockData';

afterEach(cleanup);

function renderCourseForm(args) {
  const defaultProps = {
    course: {},
    authors: [],
    errors: {},
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    onBlur: jest.fn(),
    saving: false,
  };

  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props} />);
}

it('labels button as "saving..." when saving is true', () => {
  const { getByText } = renderCourseForm({ saving: true });
  getByText('Saving...');
});
it('labels button as "save" when saving is false', () => {
  const { getByText } = renderCourseForm({ saving: false });
  getByText('Save');
});

it('populate form using received course data', () => {
  const tree = render(
    <MemoryRouter>
      <CourseForm
        course={courses[0]}
        authors={authors}
        errors={{}}
        saving={false}
        onBlur={jest.fn()}
        onChange={jest.fn()}
        onSubmit={jest.fn()}
      />
    </MemoryRouter>
  );

  tree.getByText('Edit Course');

  tree.getByText('Course Title');
  tree.getByText('Author');
  tree.getByText('Category');

  tree.getByValue(courses[0].title);

  const author = authors.find((author) => author.id === courses[0].authorId);
  tree.getByText(author.name);

  tree.getByValue(courses[0].category);
});
