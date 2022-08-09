import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { CoursesPage } from './CoursesPage.jsx';
import { courses, authors } from '../../../tools/mockData.js';
// import { Provider } from 'react-redux';
// import createMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

// const createStore = createMockStore();

afterEach(cleanup);

const defaultProps = {
  courses: courses.slice(0, 3).map((course) => ({
    ...course,
    authorName: authors.find((author) => author.id === course.authorId).name,
  })),
  authors,
  loading: false,
  loadCourses: jest.fn(),
  deleteCourse: jest.fn(),
  loadAuthors: jest.fn(),
};

function renderCoursePage(args) {
  const props = { ...defaultProps, ...args };
  return render(
    <MemoryRouter>
      <CoursesPage {...props} />
    </MemoryRouter>
  );
}

it('should render add course button', () => {
  const wrapper = renderCoursePage();
  wrapper.getByText('Add Course');
});

it('should render provided courses', () => {
  const wrapper = renderCoursePage();
  defaultProps.courses.forEach((course) => {
    wrapper.getByText(course.title);
    wrapper.getByText(
      authors.find((author) => author.id === course.authorId).name
    );
    wrapper.getByText(course.category);
  });
});
