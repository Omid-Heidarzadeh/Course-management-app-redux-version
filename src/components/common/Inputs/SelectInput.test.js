import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { shallow } from 'enzyme';
import SelectInput from './SelectInput.jsx';

afterEach(cleanup);

const defaultProps = {
  id: 'id',
  name: 'name',
  title: 'input',
  value: '',
  options: {},
  defaultOption: '',
  onChange: jest.fn(),
  onBlur: jest.fn(),
  error: '',
};

function renderInput(args) {
  const props = { ...defaultProps, ...args };
  return render(<SelectInput {...props} />);
}

function shallowRenderInput(args) {
  const props = { ...defaultProps, ...args };
  return shallow(<SelectInput {...props} />);
}

it('should render a select input', () => {
  const wrapper = shallowRenderInput();
  expect(wrapper.find('select').length).toBe(1);
});

it('should select an option that is related to the provided value', () => {
  const options = [
    { value: '1', name: 'name1' },
    { value: '2', name: 'name2' },
  ];
  const { value, name } = options[1];
  const wrapper = shallowRenderInput({ value, options });
  expect(wrapper.find('select').render().val()).toBe(value);
  expect(wrapper.find(`option[value="${value}"]`).text()).toBe(name);
});

it('should call change handler function on change event', () => {
  const onChange = jest.fn();
  const value = '1';

  const wrapper = shallowRenderInput({ onChange });
  wrapper.find('select').simulate('change', { target: { value } });
  expect(onChange).toBeCalledWith({
    target: { value },
  });
});

it('should call blur handler function on blur event', () => {
  const onBlur = jest.fn();
  const wrapper = shallowRenderInput({ onBlur });
  wrapper.find('select').simulate('blur');
  expect(onBlur).toBeCalled();
});

it('should render provided error message after input field', () => {
  const error = 'Error message';
  const wrapper = shallowRenderInput({ error });
  const errorElements = wrapper.find(`#${defaultProps.id}-error`);
  expect(errorElements.length).toBe(1);
  expect(errorElements.text()).toBe(error);
});
