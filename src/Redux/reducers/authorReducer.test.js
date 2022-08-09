import authorReducer from './authorReducer';
import * as authorActions from '../actions/authorActions.js';

it("should update authors' store with received authors", () => {
  const authors = [
    { name: 'author1' },
    { name: 'author2' },
    { name: 'author3' },
  ];
  const state = [];

  const newState = authorReducer(
    state,
    authorActions.loadAuthorsSuccess(authors)
  );

  expect(newState).toEqual(authors);
});
