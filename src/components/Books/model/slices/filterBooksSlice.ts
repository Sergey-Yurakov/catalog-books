import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterBooksSchema } from '../types/filterBooksSchema';

const initialState: FilterBooksSchema = {
    search: '',
    categories: 'all',
    maxResult: 30,
    startIndex: 0,
    sorting: 'relevance',
    isLoadMore: false,
    isInitialFetch: false,
};

export const filterBooksSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
        },
        setCategories(state, action: PayloadAction<string>) {
            state.categories = action.payload;
        },
        setSorting(state, action: PayloadAction<string>) {
            state.sorting = action.payload;
        },
        setStartIndex(state, action: PayloadAction<number>) {
            state.startIndex = action.payload;
        },
        setIsLoadMore(state, action: PayloadAction<boolean>) {
            state.isLoadMore = action.payload;
        },
        setIsInitialFetch(state, action: PayloadAction<boolean>) {
            state.isInitialFetch = action.payload;
        },
    },
});

export const { reducer: filterBooksReducer } = filterBooksSlice;
export const { actions: filterBooksActions } = filterBooksSlice;
