import React from 'react';
import CourseForm from './CourseForm.jsx';
import { shallow, mount } from 'enzyme';
import { courses, authors } from '../../../tools/mockData.js';
import { MemoryRouter } from 'react-router-dom';

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
  return shallow(<CourseForm {...props} />);
}

it('labels button as "saving..." when saving is true', () => {
  const wrapper = renderCourseForm({ saving: true });
  expect(wrapper.find('button').text()).toBe('Saving...');
});
it('labels button as "save" when saving is false', () => {
  const wrapper = renderCourseForm({ saving: false });
  expect(wrapper.find('button').text()).toBe('Save');
});

it('populate form using received course data', () => {
  const tree = mount(
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

  expect(tree.find('form').length).toBe(1);

  expect(tree.find('input[type="text"]').length).toBe(2);

  expect(tree.find('select').length).toBe(1);

  expect(tree.find('input[name="title"]').render().val()).toBe(
    courses[0].title
  );

  const author = authors.find((author) => author.id === courses[0].authorId);
  expect(
    tree
      .find('select[name="authorId"]')
      .find(`option[value="${author.id}"]`)
      .text()
  ).toBe(author.name);

  expect(tree.find('input[name="category"]').render().val()).toBe(
    courses[0].category
  );
});
