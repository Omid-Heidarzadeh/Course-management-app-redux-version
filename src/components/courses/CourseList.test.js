import React from 'react';
import CourseList from './CourseList.jsx';
// import { cleanup, render } from 'react-testing-library';
import { shallow, mount } from 'enzyme';
import { courses, authors } from '../../../tools/mockData.js';
import { MemoryRouter } from 'react-router-dom';

// afterEach(cleanup);

function shallowRenderWithEnzyme({ courses = [], authors = [] }) {
  const defaultProps = getDefaultProps(courses, authors);

  return shallow(<CourseList {...defaultProps} />);
}

function mountWithEnzyme({ courses = [], authors = [] }) {
  const defaultProps = getDefaultProps(courses, authors);

  return mount(
    <MemoryRouter>
      <CourseList {...defaultProps} />
    </MemoryRouter>
  );
}

function getDefaultProps(courses, authors) {
  return {
    courses:
      courses.length === 0 || authors.length === 0
        ? []
        : courses.map((course) => ({
            ...course,
            authorName: authors.find((author) => author.id === course.authorId)
              .name,
          })),
    onDelete: jest.fn(),
  };
}

it('should render provided course list', () => {
  const courseList = getDefaultProps(courses.slice(0, 5), authors).courses;
  const shallowRendered = shallowRenderWithEnzyme({
    courses: courseList,
    authors,
  });
  const mounted = mountWithEnzyme({ courses: courseList, authors });

  expect(shallowRendered.find('tbody').find('tr').length).toBe(
    courseList.length
  );
  mounted
    .find('tbody')
    .find('tr')
    .forEach((tr, i) => {
      expect(tr.find('a').text()).toBe(courseList[i].title);
      expect(tr.find('td').at(1).text()).toBe(courseList[i].authorName);
      expect(tr.find('td').at(2).text()).toBe(courseList[i].category);
      expect(tr.find('button').text()).toBe('Delete');
    });
});
