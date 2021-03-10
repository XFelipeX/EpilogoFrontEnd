import { GET_BOOKS } from './booksTypes';

const initialState = [{}];

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return action.payload;
    default:
      return state;
  }
};

export default booksReducer;
