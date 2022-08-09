import React from 'react';
import { shallow } from 'enzyme';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header.jsx';

it('should render nav links', () => {
  const wrapper = shallow(<Header />);
  const rendered = render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  expect(wrapper.find('NavLink').length).toBe(3);
  rendered.getByText('Home');
  rendered.getByText('Courses');
  rendered.getByText('About');
});
