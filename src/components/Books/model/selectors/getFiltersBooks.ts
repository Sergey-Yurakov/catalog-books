import { StateSchema } from '../../../../store/StateSchema';

export const getBooksSearch = (state: StateSchema) => state.filters.search || 'node js';
export const getBooksSorting = (state: StateSchema) => state.filters.sorting;
export const getBooksCategories = (state: StateSchema) => state.filters.categories;
export const getBooksStartIndex = (state: StateSchema) => state.filters.startIndex;
export const getBooksMaxResults = (state: StateSchema) => state.filters.maxResult;
export const getBooksIsLoadMore = (state: StateSchema) => state.filters.isLoadMore;
export const getBooksIsInitialFetch = (state: StateSchema) => state.filters.isInitialFetch;
