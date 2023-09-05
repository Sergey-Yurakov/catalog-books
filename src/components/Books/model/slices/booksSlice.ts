import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchBooks } from '../services/fetchBooks';
import { BooksSchema } from '../types/booksSchema';

const booksData = {
    totalItems: 0,
    items: null,
};

const initialState: BooksSchema = {
    isLoading: false,
    error: '',
    data: booksData,
    search: '',
    categories: 'all',
    maxResult: 30,
    startIndex: 0,
    sorting: 'relevance',
    isLoadMore: false,
};

export const booksSlice = createSlice({
    name: 'books',
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
    },

    extraReducers: builder => {
        builder
            .addCase(fetchBooks.pending, (state, { meta }) => {
                state.isLoading = true;
                state.error = undefined;

                if (meta.arg.replace) {
                    state.data.items = [];
                }
            })
            .addCase(fetchBooks.fulfilled, (state, { payload, meta }) => {
                state.isLoading = false;
                state.data.totalItems = payload.totalItems;

                if (meta.arg.replace) {
                    state.data.items = payload.items;
                } else {
                    payload.items && state.data.items?.push(...payload.items);
                }
            })
            .addCase(fetchBooks.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            });
    },
});

export const { reducer: booksReducer } = booksSlice;
export const { actions: booksActions } = booksSlice;
