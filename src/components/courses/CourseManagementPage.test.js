import React from 'react';
import { CourseManagementPage } from './CourseManagementPage.jsx';
import { mount } from 'enzyme';
import { authors, courses, newCourse } from '../../../tools/mockData.js';

function render(args) {
  const defaultProps = {
    courses,
    authors,
    loading: false,
    loadCourses: jest.fn(),
    saveCourse: jest.fn(),
    loadAuthors: jest.fn(),
    match: {
      params: {
        slug: '',
      },
    },
    history: {},
    course: newCourse,
  };

  const props = { ...defaultProps, ...args };
  return mount(<CourseManagementPage {...props} />);
}

it('should show errors when empty form sumbitted', () => {
  const wrapper = render();
  wrapper.find('form').simulate('submit');
  const formGroups = wrapper.find('.form-group');

  formGroups.forEach((group, i) => {
    if (i === 0) expect(group.childAt(2).text()).toBe('Title can not be empty');

    if (i === 1)
      expect(group.childAt(2).text()).toBe('Please select an author');

    if (i === 2)
      expect(group.childAt(2).text()).toBe('Category can not be empty');
  });
});

it('should show errors when form has sumbitted with invalid values', () => {
  const wrapper = render();

  wrapper
    .find('input[name="title"]')
    .simulate('change', { target: { name: 'title', value: '!' } });

  wrapper
    .find('input[name="category"]')
    .simulate('change', { target: { name: 'category', value: '!' } });

  wrapper.find('form').simulate('submit');

  const formGroups = wrapper.find('.form-group');

  formGroups.forEach((group, i) => {
    if (i === 0)
      expect(group.childAt(2).text()).toBe(
        'Allowed characters are alphabetics, numbers, space and (#+-)'
      );

    if (i === 1) {
      expect(group.childAt(2).text()).toBe('Please select an author');
    }

    if (i === 2)
      expect(group.childAt(2).text()).toBe(
        'Allowed characters are alphabetics, numbers, space and (#+-)'
      );
  });
});
