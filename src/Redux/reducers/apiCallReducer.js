import * as types from '../actions/actionTypes';
import initialState from './initialState';

const { apiCallsInProgress } = initialState;

export default function apiCallReducer(state = apiCallsInProgress, action) {
  if (action.type === types.BEGIN_API_CALL) {
    return state + 1;
  }

  if (
    action.type.endsWith('_SUCCESS') ||
    action.type === types.API_CALL_ERROR
  ) {
    return state - 1;
  }

  return state;
}
