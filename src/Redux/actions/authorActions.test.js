import { authors } from '../../../tools/mockData';
import * as types from './actionTypes.js';
import * as authorActions from './authorActions.js';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

afterEach(() => {
  fetchMock.restore();
});

it('should create BEGIN_API_CALL and LOAD_AUTHORS_SUCCESS actions', async () => {
  const expectedActions = [
    { type: types.BEGIN_API_CALL },
    { type: types.LOAD_AUTHORS_SUCCESS, authors },
  ];

  fetchMock.mock('*', {
    body: authors,
    headers: { 'content-type': 'application/json' },
  });

  const store = mockStore([]);
  await store.dispatch(authorActions.loadAuthors());
  expect(store.getActions()).toEqual(expectedActions);
});
