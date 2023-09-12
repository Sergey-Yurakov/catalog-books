import { StateSchema } from '../../../../store/StateSchema';

export const getBooks = (state: StateSchema) => state.books.data.items;
export const getBooksTotalItems = (state: StateSchema) => state.books.data.totalItems;
export const getBooksIsLoading = (state: StateSchema) => state.books.isLoading;
export const getBooksError = (state: StateSchema) => state.books.error;
export const getBooksIsErrorData = (state: StateSchema) => state.books.isErrorData;
