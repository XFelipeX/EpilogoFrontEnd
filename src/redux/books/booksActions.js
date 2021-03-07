import {GET_BOOKS} from './booksTypes';

export const getBooks = payload => {
  return{
    type: GET_BOOKS,
    payload: payload
  }
}