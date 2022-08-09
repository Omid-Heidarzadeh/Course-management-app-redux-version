import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { shallow } from 'enzyme';
import TextInput from './TextInput.jsx';

afterEach(cleanup);

const defaultProps = {
  id: 'id',
  name: 'name',
  title: 'input',
  value: '',
  onChange: jest.fn(),
  onBlur: jest.fn(),
  error: '',
};

function renderInput(args) {
  const props = { ...defaultProps, ...args };
  return render(<TextInput {...props} />);
}

function shallowRenderInput(args) {
  const props = { ...defaultProps, ...args };
  return shallow(<TextInput {...props} />);
}

it('should render a text input', () => {
  const wrapper = shallowRenderInput();
  expect(wrapper.find('input[type="text"]').length).toBe(1);
});

it('should render provided value in a text input', () => {
  const wrapper = renderInput({ value: 'test' });
  wrapper.getByValue('test');
});

it('should call change handler function on change event', () => {
  const onChange = jest.fn();
  const wrapper = shallowRenderInput({ onChange });
  wrapper
    .find('input[type="text"]')
    .simulate('change', { target: { value: 'new value' } });
  expect(onChange).toBeCalledWith({
    target: { value: 'new value' },
  });
});

it('should call blur handler function on blur event', () => {
  const onBlur = jest.fn();
  const wrapper = shallowRenderInput({ onBlur });
  wrapper.find('input[type="text"]').simulate('blur');
  expect(onBlur).toBeCalled();
});

it('should render provided error message after input field', () => {
  const error = 'Error message';
  const wrapper = shallowRenderInput({ error });
  const errorElements = wrapper.find(`#${defaultProps.id}-error`);
  expect(errorElements.length).toBe(1);
  expect(errorElements.text()).toBe(error);
});
