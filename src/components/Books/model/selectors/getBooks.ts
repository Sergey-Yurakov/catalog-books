import { RootState } from '../../../../store/store';

export const getBooks = (state: RootState) => state.books.data.items;
export const getBooksTotalItems = (state: RootState) => state.books.data.totalItems;
export const getBooksIsLoading = (state: RootState) => state.books.isLoading;
export const getBooksError = (state: RootState) => state.books.error;
