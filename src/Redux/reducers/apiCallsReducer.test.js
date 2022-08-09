import * as apiStatusActions from '../actions/apiStatusActions';
import apiCallReducer from './apiCallReducer';

it('should increment apiCallsInProgress by one when beginApiCall is dispatched', () => {
  const initialState = 0;

  const newState = apiCallReducer(
    initialState,
    apiStatusActions.beginApiCall()
  );

  expect(newState).toBe(1);
});

it('should decrement apiCallsInProgress by one when a successful action (_SUCCESS) is dispatched', () => {
  const initialState = 1;
  const successfulAction = { type: 'ANY_ACTION_SUCCESS' };

  const newState = apiCallReducer(initialState, successfulAction);

  expect(newState).toBe(0);
});

it('should decrement apiCallsInProgress by one', () => {
  const initialState = 1;

  const newState = apiCallReducer(
    initialState,
    apiStatusActions.apiCallError()
  );

  expect(newState).toBe(0);
});
