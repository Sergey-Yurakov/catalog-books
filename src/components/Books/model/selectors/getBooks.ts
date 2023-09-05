import { StateSchema } from '../../../../store/StateSchema';

export const getBooks = (state: StateSchema) => state.books.data.items;
export const getBooksTotalItems = (state: StateSchema) => state.books.data.totalItems;
export const getBooksIsLoading = (state: StateSchema) => state.books.isLoading;
export const getBooksError = (state: StateSchema) => state.books.error;
export const getBooksSearch = (state: StateSchema) => state.books.search || 'node js';
export const getBooksSorting = (state: StateSchema) => state.books.sorting;
export const getBooksCategories = (state: StateSchema) => state.books.categories;
export const getBooksStartIndex = (state: StateSchema) => state.books.startIndex;
export const getBooksMaxResults = (state: StateSchema) => state.books.maxResult;
export const getBooksIsLoadMore = (state: StateSchema) => state.books.isLoadMore;
